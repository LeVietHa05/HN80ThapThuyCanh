const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HN80_thapThuyCanhAccData = new Schema({
    username: String,
    password: String,
    role: String,
    chosenTree: {
        isChosen: {
            type: Boolean,
            default: false
        },
        treeName: String,
    },
});

module.exports = mongoose.model('HN80_TTC_AccData', HN80_thapThuyCanhAccData);