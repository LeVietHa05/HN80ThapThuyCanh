
const mongoose = require("mongoose");
const MeasureData = require("./models/HN80_thapThuyCanhMeasureData.js");
const SettingData = require("./models/HN80_thapThuyCanhSettingData.js");
// require('dotenv').config()

const mongouri = "mongodb+srv://webchihien.xqkjk7e.mongodb.net/HuuNghi80?retryWrites=true&w=majority";
const mongo_username =  "HuuNghi80_thapThuyCanh";
const mongo_password = "exsPZkGdKPcrqRg9";

if (!mongouri) {
    console.log("MONGO_URI is empty");
    console.log("Check .env file");
    process.exit(1);
}


mongoose.connect(mongouri, {
    user: mongo_username,
    pass: mongo_password,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error when connecting to mongodb: " + err);
});

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function randomBoolean() {
    return Math.random() < 0.5;
}

//add data to database
async function addData(num) {
    for (let i = 0; i < num; i++) {
        let data = {
            temp: randomFloat(20, 30),
            humi: randomFloat(50, 90),
            phVal: randomFloat(5, 7),
            tdsVal: randomFloat(100, 500),
            waterTemp: randomFloat(20, 30),
            lux: randomInt(100, 1000),
            isWater1low: randomBoolean(),
            isWater2low: randomBoolean(),
            isWater3low: randomBoolean(),
            isUmbrellaOpen: randomBoolean(),
            isUmbrellaClose: randomBoolean(),
            time: new Date()
        }
        await MeasureData.create(data);
    }
}

async function addSetting() {
    let data = {
        manualMode: false,
        isLightControl: true,
        isInsectLightControl: true,
        isPump1Control: true,
        isPump2Control: true,
        isPump3Control: true,
        timeRangeBtsHeater: "09:00-18:00",
        timeRangePumpTower: "09:00-18:00",
        timeRangeBtsTower: "09:00-18:00",
        timeOnPumpTower:  15,
        timeOffPumpTower: 45,
    }
    await SettingData.create(data);
}

async function deleteData() {
    await MeasureData.deleteMany({});
}

// addSetting().then(() => {
//     console.log("Done");
//     process.exit(0);
// }).catch((err) => {
//     console.log("Error: " + err);
//     process.exit(1);
// })

addData(30).then(() => {
    console.log("Done");
    process.exit(0);
}).catch((err) => {
    console.log("Error: " + err);
    process.exit(1);
})

// deleteData().then(() => {
//     console.log("Done");
//     process.exit(0);
// }
// ).catch((err) => {
//     console.log("Error: " + err);
//     process.exit(1);
// })