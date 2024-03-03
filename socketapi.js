const option = {
    allowEIO3: true,
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        transports: ["websocket", "polling"],
        credentials: true,
    },
}

const MeasureData = require("./models/HN80_thapThuyCanhMeasureData.js");
const SettingData = require("./models/HN80_thapThuyCanhSettingData.js");

const io = require("socket.io")(option);

const socketapi = {
    io: io
}

const messageID = [];

io.on("connection", (socket) => {
    console.log("[INFO] new connection: [" + socket.id + "]",
        socket.request.connection.remoteAddress);
    socket.on("/esp/envir", (data) => {
        console.log(`[/esp/envir] from ${data.clientID} via socket id: ${socket.id}`);

    });

    socket.on("/esp/measure", async (data) => {
        console.log(`[/esp/measure] from ${data.clientID} via socket id: ${socket.id}`);
        console.log(data.data);
        //update time for newMeasureData
        // data.data.time = new Date();
        // const newMeasureData = new MeasureData(data.data);
        // let res = await newMeasureData.save();
        // console.log(res);
        socket.broadcast.emit("/web/measure", data.data);
    })

    socket.on("/esp/other", (data) => {
        console.log(`[esp/other] from ${data.clientID} via socket id: ${socket.id}`);
        socket.broadcast.emit("/web/other", data);
    });

    socket.on("/web/control", async (data) => {
        console.log(`[/web/control] from ${data.clientID} via socket id: ${socket.id}`);
        console.log(data);
        try {
            let res;
            for (key in data) {
                res = await SettingData.findOneAndUpdate({}, { [key]: data[key] }, { new: true })
                // console.log(res)
            }
            let dataSentEsp = {}
            //random messageID
            dataSentEsp.messageID = Math.random().toString(36).substring(7);
            dataSentEsp.control = {};
            dataSentEsp.control.manualMode = res.manualMode;
            dataSentEsp.control.isLightControl = res.isLightControl;
            dataSentEsp.control.isInsectLightControl = res.isInsectLightControl;
            dataSentEsp.control.isPump1Control = res.isPump1Control;
            dataSentEsp.control.isPump2Control = res.isPump2Control;
            dataSentEsp.control.isPump3Control = res.isPump3Control;
            dataSentEsp.control.timeOnPumpTower = res.timeOnPumpTower;
            dataSentEsp.control.timeOffPumpTower = res.timeOffPumpTower;
            dataSentEsp.control.timeStartBtsTower = res.timeRangeBtsTower.split("-")[0];
            dataSentEsp.control.timeEndBtsTower = res.timeRangeBtsTower.split("-")[1];
            dataSentEsp.control.timeStartPumpTower = res.timeRangePumpTower.split("-")[0];
            dataSentEsp.control.timeEndPumpTower = res.timeRangePumpTower.split("-")[1];
            dataSentEsp.control.timeStartBtsHeater = res.timeRangeBtsHeater.split("-")[0];
            dataSentEsp.control.timeEndBtsHeater = res.timeRangeBtsHeater.split("-")[1];
            // console.log(dataSentEsp);
            console.log("send control data to esp");
            socket.broadcast.emit("/esp/control", dataSentEsp);
        } catch (e) {
            console.log(e)
        }
    })

    socket.on("message", (data) => {
        console.log(`[message] from ${data.clientID} via socket id: ${socket.id}`);
        socket.broadcast.emit("message", data);
    })
    /**************************** */
    //xu ly chung
    socket.on("reconnect", function () {
        console.log("[" + socket.id + "] reconnect.");
    });
    socket.on("disconnect", () => {
        console.log("[" + socket.id + "] disconnect.");
    });
    socket.on("connect_error", (err) => {
        console.log(err.stack);
    });
})

module.exports = socketapi;
