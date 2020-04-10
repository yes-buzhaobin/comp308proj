import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class CreateReport extends Component {
    constructor(props){
        super(props);
        this.onChangeBodyTemperature = this.onChangeBodyTemperature.bind(this);
        this.onChangeHeartRate = this.onChangeHeartRate.bind(this);
        this.onChangeRespiratoryRate = this.onChangeRespiratoryRate.bind(this);
        this.onChangeHighBloodPressure = this.onChangeHighBloodPressure.bind(this);
        this.onChangeLowBloodPressure = this.onChangeLowBloodPressure.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            body_temperature: '',
            heart_rate: '',
            respiratory_rate: '',
            high_blood_pressure: '',
            low_blood_pressure: '',
            weight: ''
        }
    }
    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`body_temperature:${this.state.body_temperature}`);
        console.log(`heart_rate:${this.state.heart_rate}`);
        console.log(`respiratory_rate:${this.state.respiratory_rate}`);
        console.log(`high_blood_pressure:${this.state.high_blood_pressure}`);
        console.log(`low_blood_pressure:${this.state.low_blood_pressure}`);
        console.log(`weight:${this.state.weight}`);

        const newReport = {
            nurse_email:localStorage.nurse,
            reporter_email:localStorage.email,
            body_temperature: this.state.body_temperature,
            heart_rate:this.state.heart_rate,
            respiratory_rate:this.state.respiratory_rate,
            high_blood_pressure:this.state.high_blood_pressure,
            low_blood_pressure:this.state.low_blood_pressure,
            weight:this.state.weight
        };
        console.log(newReport);
        this.setState = {
            body_temperature: '',
            heart_rate: '',
            respiratory_rate: '',
            high_blood_pressure: '',
            low_blood_pressure: '',
            weight: ''
        };

        axios.post('http://localhost:5000/reports/createReport', newReport)
            .then(res => {
                console.log(res.data);
                this.props.history.push('/');
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
                                    <label htmlFor="body_temperature" className="labelRight">Body Temperature:</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text"
                                    className="form-control"
                                    name="body_temperature"
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
                                    placeholder="Enter weight"
                                    value={this.state.weight}
                                    onChange={this.onChangeWeight}/>
                                </div>
                            </div>
                            
                            
                            <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Send Report
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}