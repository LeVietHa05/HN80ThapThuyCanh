var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const MeasureData = require("../models/HN80_thapThuyCanhMeasureData");
const SettingData = require("../models/HN80_thapThuyCanhSettingData");
const AccData = require("../models/HN80_thapThuyCanhAccData");

/* GET home page. */
router.get('/',async function (req, res, next) {
  const userid = req.query.id;
  if (!userid) res.redirect('/login');
  let user = await AccData.findById(userid);
  if (!user) {
    res.redirect('/login');
  }
  
  res.render('index', { title: 'Express', id: userid });
});

module.exports = router;
