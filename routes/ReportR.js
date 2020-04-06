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
        body_temperature:req.body.body_temperature,
        heart_rate:req.body.heart_rate,
        respiratory_rate:req.body.respiratory_rate,
        low_blood_pressure:req.body.low_blood_pressure,
        high_blood_preasure:req.body.high_blood_preasure,
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

reports.post('/update/:id', (req, res) => {
    console.log("try to update a course....");
    console.log(req.body);
    Course.findById(req.params.id, function(err, course) {
        if(!course){
            res.status(404).send('Data is not found');
        } else {
            course.course_code = req.body.course_code;
            course.course_name=req.body.course_name;
            course.section=req.body.section;
            course.semester=req.body.semester;

            course.save().then(course => {
                res.json('A course updated.');
            })
            .catch(err => {
                res.status(400).send("Update not possible.");
            })
        }

    });
})

reports.get('/reports', (req, res) => {
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);
    console.log("getting courses");
    Course.find()
        .then( documents => {
            res.status(200).json({
                courses: documents
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

reports.put('/:id', (req, res, next) => {
    console.log("put req.course " + req.report);
    //var courseIndex = req.body.course_code.indexOf(req.params.course_code);
    const report = new Course({
        _id:req.params.id,
        course_code: req.body.course_code,
        course_name: req.body.course_name,
        section: req.body.section,
        semester: req.body.semester
    });
    console.log('router.put by para id.' + req.params.id);
    Report.updateOne({_id:req.params.id}, report).then(result => {
        if(result){
            res.status(200).json({message: "Upadate successfully!"});
        } else {
            res.status(401).json({message:"Not authorized!"});
        }
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
