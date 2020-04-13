var express = require('express');
var cors = require('cors');
var bodyPaser = require('body-parser');
var app = express();
const compress = require('compression');
const methodOverride = require('method-override');
var mongoose = require('mongoose');
var port = process.env.PORT || 5000

//module.exports = require('./env/' + process.env.NODE_ENV + '.js');

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
}

app.use(bodyPaser.json());
app.use(methodOverride());

app.use(cors());
app.use(
    bodyPaser.urlencoded({
        extended:true
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

    var Posts = require('./routes/PostR');

    app.use('/posts', Posts);

    //require('./routes/index.server.routes.js');
    var Iriss = require('./routes/IrisR');

    app.use('/iriss', Iriss);

    app.listen(port, () => {
        console.log("Servr is running on port: " + port);
    })