import React, {Component} from 'react';
import axios from 'axios';
import "./ListReportsToMe.css";

export default class CreateReport extends Component {
    constructor(props){
        super(props);
        this.onChangeReportTime = this.onChangeReportTime.bind(this);
        this.onChangeReporterEmail = this.onChangeReporterEmail.bind(this);
        this.onChangeBodyTemperature = this.onChangeBodyTemperature.bind(this);
        this.onChangeHeartRate = this.onChangeHeartRate.bind(this);
        this.onChangeRespiratoryRate = this.onChangeRespiratoryRate.bind(this);
        this.onChangeHighBloodPressure = this.onChangeHighBloodPressure.bind(this);
        this.onChangeLowBloodPressure = this.onChangeLowBloodPressure.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeReplyTime = this.onChangeReplyTime.bind(this);
        this.onChangeReply = this.onChangeReply.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            reporter_email:'',
            report_time:'',
            body_temperature: '',
            heart_rate: '',
            respiratory_rate: '',
            high_blood_pressure: '',
            low_blood_pressure: '',
            weight: '',
            reply_time: '',
            reply: ''

        }
    }
    componentDidMount() {
        console.log(this.props.match.params.id)
        console.log("why");
        axios.get('http://localhost:5000/reports/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    reporter_email:res.data.reporter_email,
                    report_time:res.data.report_time,
                    body_temperature: res.data.body_temperature,
                    heart_rate: res.data.heart_rate,
                    respiratory_rate: res.data.respiratory_rate,
                    high_blood_pressure: res.data.high_blood_pressure,
                    low_blood_pressure: res.data.low_blood_pressure,
                    weight: res.data.weight,
                    reply_time: res.data.reply_time,
                    reply: res.data.reply
                });
            })
            .catch(function(err){
                console.log(err);
            })
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state.reply);

        const newReply = {
            nurse_email:localStorage.email,
            reporter_email:localStorage.email,
            body_temperature: this.state.body_temperature,
            heart_rate:this.state.heart_rate,
            respiratory_rate:this.state.respiratory_rate,
            high_blood_pressure:this.state.high_blood_pressure,
            low_blood_pressure:this.state.low_blood_pressure,
            weight:this.state.weight,
            reply:this.state.reply
        };
        console.log(newReply);
        this.setState = {
            body_temperature: '',
            heart_rate: '',
            respiratory_rate: '',
            high_blood_pressure: '',
            low_blood_pressure: '',
            weight: '',
            reply: ''
        };

        axios.post('http://localhost:5000/reports/updateReport/' + this.props.match.params.id, newReply)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/ListReportsToMe');
            });

    }
    onChangeReportTime(e) {
        this.setState({
            report_time:e.target.value
        });
    }
    onChangeReporterEmail(e) {
        this.setState({
            reporter_email:e.target.value
        });
    }
    onChangeBodyTemperature(e) {
        this.setState({
            body_temperature:e.target.value
        });
    }
    onChangeHeartRate(e) {
        this.setState({
            heart_rate:e.target.value
        });
    }
    onChangeRespiratoryRate(e) {
        this.setState({
            respiratory_rate:e.target.value
        });
    }
    onChangeHighBloodPressure(e) {
        this.setState({
            high_blood_pressure:e.target.value
        });
    }
    onChangeLowBloodPressure(e) {
        this.setState({
            low_blood_pressure:e.target.value
        });
    }
    onChangeWeight(e) {
        this.setState({
            weight:e.target.value
        });
    }
    onChangeReplyTime(e) {
        this.setState({
            reply_time:e.target.value
        });
    }
    onChangeReply(e) {
        this.setState({
            reply:e.target.value
        });
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="FormFix">
                        <br /><br />
                        <h3 className="h3 mb-3 font-weight-normal">Compose A Report</h3>
                        <hr></hr>
                        <form className="form-horizontal" noValidate onSubmit={this.onSubmit}>
                        <div className="row">
                                <div className="col">
                                    <label htmlFor="reporter_email" className="labelRight">Reporter Email:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="reporter_email"
                                    disabled="disabled"
                                    placeholder="Enter Reporter Email"
                                    value={this.state.reporter_email}
                                    onChange={this.onChangeReporterEmail}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="report_time" className="labelRight">Report Time:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="report_time"
                                    disabled="disabled"
                                    placeholder="Enter report time"
                                    value={this.state.report_time}
                                    onChange={this.onChangeReportTime}/>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="body_temperature" className="labelRight">Body Temperature:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="body_temperature"
                                    disabled="disabled"
                                    placeholder="Enter body temperature"
                                    value={this.state.body_temperature}
                                    onChange={this.onChangeBodyTemperature}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="heart_rate" className="labelRight">Heart Rate:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name=" heart_rate"
                                    disabled="disabled"
                                    placeholder="Enter heart rate"
                                    value={this.state.heart_rate}
                                    onChange={this.onChangeHeartRate}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="respiratory_rate" className="labelRight">Respiratory Rate:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="respiratory_rate"
                                    disabled="disabled"
                                    placeholder="Enter respiratory rate"
                                    value={this.state.respiratory_rate}
                                    onChange={this.onChangeRespiratoryRate}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="high_blood_pressure" className="labelRight">High Blood Pressure:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    disabled="disabled"
                                    className="form-control"
                                    name="high_blood_pressure"
                                    placeholder="Enter high_blood pressure"
                                    value={this.state.high_blood_pressure}
                                    onChange={this.onChangeHighBloodPressure}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="low_blood_pressure" className="labelRight">Low Blood Pressure:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="low_blood_pressure"
                                    disabled="disabled"
                                    placeholder="Enter low blood pressure"
                                    value={this.state.low_blood_pressure}
                                    onChange={this.onChangeLowBloodPressure}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="weight" className="labelRight">Weight:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="weight"
                                    disabled="disabled"
                                    placeholder="Enter weight"
                                    value={this.state.weight}
                                    onChange={this.onChangeWeight}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="reply_time" className="labelRight">Reply Time:</label>
                                </div>
                                <div className="col-8">
                                    <input type="text"
                                    className="form-control"
                                    name="reply_time"
                                    placeholder="No replay yet."
                                    disabled="disabled"
                                    value={this.state.reply_time}
                                    onChange={this.onChangeReplyTime}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="reply" className="labelRight">Reply:</label>
                                </div>
                                <div className="col-12">
                                    <textarea
                                    rows="4" 
                                    cols="50"
                                    className="form-control"
                                    name="reply"
                                    placeholder="Enter Reply"
                                    value={this.state.reply}
                                    onChange={this.onChangeReply}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Update Reply
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}