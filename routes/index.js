var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const MeasureData = require("../models/HN80_thapThuyCanhMeasureData");
const SettingData = require("../models/HN80_thapThuyCanhSettingData");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//API Section
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get("/api/v1/test", async (req, res) => {
  try {
    let result = await MeasureData.find().limit(10);
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
})


//get measure data by query
router.get("/api/v1/measure", async (req, res) => {
  const { limit = 10, field, sort } = req.query;
  console.log(field, sort, limit)
  try {
    let result = await MeasureData.find({}, `${field} time`).limit(parseInt(limit)).sort({ time: parseInt(sort) });
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
})

//get setting data
router.get("/api/v1/control", async (req, res) => {
  try {
    let result = await SettingData.find();
    res.json(result[0]);
  } catch (err) {
    res.json({ message: err });
  }
})

module.exports = router;
