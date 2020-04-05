var express = require('express');
var cors = require('cors');
var bodyPaser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var port = process.env.PORT || 5000

app.use(bodyPaser.json());
app.use(cors());
app.use(
    bodyPaser.urlencoded({
        extended:false
    })
)

const mongooseURI = 'mongodb://localhost:27017/proj';

mongoose
    .connect(mongooseURI, {useNewUrlParser:true})
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err));

    var Users = require('./routes/UsersR');

    app.use('/users', Users)

    var Reports = require('./routes/ReportR');

    app.use('/reports', Reports);

    var ChosenCourses = require('./routes/ChosenCoursesR');

    app.use('/chosenCourses', ChosenCourses);

    app.listen(port, () => {
        console.log("Servr is running on port: " + port);
    })