const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const HN80_thapThuyCanhMeasureData = new Schema({
    temp: Number,
    humi: Number,
    phVal: Number,
    tdsVal: Number,
    waterTemp: Number,
    lux: Number,
    isRain: Boolean,
    isWater1low: Boolean,
    isWater2low: Boolean,
    isWater3low: Boolean,
    isUmbrellaOpen: Boolean,
    isBtsHeaterOn: Boolean,
    time: Date,
}); 

module.exports = mongoose.model('HN80_TTC_MeasureData', HN80_thapThuyCanhMeasureData);