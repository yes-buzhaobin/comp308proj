import React, {Component} from 'react';
//import jwt_decode from 'jwt-decode';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import "./MyReport.css";

const Report = props => (
    <tr>
        <td>{props.report.report_time.substring(0,19)}</td>
        <td>{props.report.nurse_email}</td>
        <td>{props.report.body_temperature}</td>
        <td>{props.report.heart_rate}</td>
        <td>{props.report.respiratory_rate}</td>
        <td>{props.report.high_blood_pressure}</td>
        <td>{props.report.low_blood_pressure}</td>
        <td>{props.report.weight}</td>
    </tr>
)

class MyPatients extends Component {
    constructor(props) {
        super(props);
        this.state = {
           reports: []
        };
    }

    componentDidMount() {
        //console.log("DisplayReports");
        console.log("email = " + localStorage.email);
        axios.get('http://localhost:5000/reports/patientReports/' + localStorage.email)
            .then(res => {
                this.setState({reports: res.data.reports});
                console.log(this.state.reports);
            }).catch(function (error) {
                console.log(error);
            })
    }
    reportList() {
        return this.state.reports.map(function(currentReport, i) {
            return <Report report={currentReport} key={i} />;
        });
    }

    render() {
        return (
            <div className="myContainer">
                <div className="jumbotron">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">MY REPORTS</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <thead>
                            <tr>
                                <th>Report Time</th>
                                <th>Nurse</th>
                                <th>Body Temperature</th>
                                <th>Heart Rate</th>
                                <th>Respiratory Rate</th>
                                <th>High Pressure</th>
                                <th>Low Pressure</th>
                                <th>Weight</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.reportList() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default MyPatients