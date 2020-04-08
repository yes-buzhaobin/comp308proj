const express = require('express');
const reports = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Report = require('../models/Report');
reports.use(cors());

process.env.SECRET_KEY = 'password';

reports.post('/createReport', (req, res) => {
    console.log("try to save a report....");
    console.log(req.body);
    const reportData = {
        nurse_email: req.body.nurse_email,
        reporter_email:req.body.reporter_email,
        body_temperature:req.body.body_temperature,
        heart_rate:req.body.heart_rate,
        respiratory_rate:req.body.respiratory_rate,
        high_blood_pressure:req.body.high_blood_pressure,
        low_blood_pressure:req.body.low_blood_pressure,
        weight:req.body.weight,
        report_time:req.body.report_time,
        status:req.body.status
    };


    Report.create(reportData)
    .then(report => {
        res.json({ status: 'A report added!'});
    })
    .catch(err => {
        res.send('Adding report error: ' + err);
    })
})

reports.get('/patientReports/:email', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    console.log("patient getting own reports");
    Report.find({
        reporter_email:req.params.email
    })
        .then( documents => {
            console.log(documents);
            res.status(200).json({
                reports: documents
            })
        });
})
reports.get('/:id', (req, res) => {
    console.log("get report by id.....");
    
    let id = req.params.id;
    Report.findById(id, function(err,report){
        res.json(report);
    });
})

reports.get('/reportsByUserId/:id', (req, res) => {
    console.log("get courses by student id.....");
    
    let id = req.params.id;
    Report.findById(id, function(err, report){
        res.json(course);
    }.sort({report_time: -1}));
})

reports.delete("/:id", (req, res, next) => {
    console.log("Delete ...: " + req.params.id);
    
    Report.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Report deleted!"});
    });
})


module.exports = reports
