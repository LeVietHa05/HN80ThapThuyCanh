const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const HN80_thapThuyCanhSettingData = new Schema({
    manualMode: Boolean,
    isLightControl: Boolean,
    isInsectLightControl: Boolean,
    isPump1Control: Boolean,
    isPump2Control: Boolean,
    isPump3Control: Boolean, 
    timeRangeBtsHeater: String,
    timeRangePumpTower: String,
    timeRangeBtsTower: String,
    timeOnPumpTower: Number,
    timeOffPumpTower: Number,
    umbrellaControl: Boolean,
});

module.exports = mongoose.model('HN80_TTC_SettingData', HN80_thapThuyCanhSettingData);