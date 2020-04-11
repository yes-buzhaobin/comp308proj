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
        reply:'',
        reply_time:'',
        status:req.body.status
    };


    Report.create(reportData)
    .then(report => {
        res.json({ status: 'A report added!'});
    })
    .catch(err => {
        res.send('Adding report error: ' + err);
    })
});

reports.post('/updateReport/:id', (req, res) => {
    console.log("req.body= "+ req.body);
    console.log(req.body.reply);
    Report.findById(req.params.id, function(err, report) {
        if(!report){
            res.status(404).send('Data is not found');
        } else {
            report.reply = req.body.reply;
            report.reply_time = Date();
            //console.log(report);

            report.save().then(report => {
                //console.log("saved.");
                res.json('A reply of a report updated.');
            })
            .catch(err => {
                //console.log("save fails.");
                res.status(400).send("Update not possible.");
            })
        }

    });
});

reports.get('/patientReports/:email', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    console.log("patient getting own reports");
    Report.find({
        reporter_email:req.params.email
    }).sort({report_time: -1})
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

reports.get('/reportsByNurse/:nurseEmail', (req, res) => {
    console.log("get reports by nurse email.....");
    
    let id = req.params.id;
    Report.find({
        nurse_email:req.params.nurseEmail
    }).sort({report_time: -1})
        .then( documents => {
            //console.log(documents);
            res.status(200).json({
                reports: documents
            })
        });
})

reports.delete("/:id", (req, res, next) => {
    console.log("Delete ...: " + req.params.id);
    
    Report.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Report deleted!"});
    });
})


module.exports = reports
