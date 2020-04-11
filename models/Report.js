const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    nurse_email:{
        type:String,
        required:true
    },
    reporter_email:{
        type:String,
        required:true
    },
    body_temperature:{
        type:String
    },
    heart_rate:{
        type:String
    },
    respiratory_rate:{
        type:String
    },
    high_blood_pressure:{
        type:String
    },
    low_blood_pressure:{
        type:String
    },
    weight:{
        type:String
    },
    report_time:{
        type: Date,
        // Create a default 'report_time' value
        default: Date.now
    },
    status:{
        type: Number,
        // Create a default 'status' value
        default: '1' // 1 for unread, 2 for read
    },
    reply_time:{
        type: Date,
    },
    reply:{
        type:String
    }
})

module.exports = Report = mongoose.model('reports', ReportSchema)