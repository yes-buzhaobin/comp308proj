import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            password:'',
            first_name:'',
            last_name:'',
            address:'',
            city:'',
            phone_number:'',
            email:'',
            nurse:'',
            role:''
        }
    }

    componentDidMount() {
        const token = localStorage.usertoken;
        console.log("token = " + token);
        const decoded = jwt_decode(token);
        this.setState({
            first_name:decoded.first_name,
            last_name:decoded.last_name,
            address:decoded.address,
            city:decoded.city,
            phone_number:decoded.phone_number,
            email:decoded.email,
            nurse:decoded.nurse,
            role:decoded.role
        })
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>
                                    <div>
                                        <label>First Name:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Last Name:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Address:</label>
                                    </div>
                                </td>
                                <td>
                                <div>
                                        <label>City:</label>
                                    </div>
                                </td>
                                <td>
                                <div>
                                        <label>Phone Number:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Email:</label>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <label>Nurse:</label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>{this.state.first_name}</td>
                                <td>{this.state.last_name}</td>
                                <td>{this.state.address}</td>
                                <td>{this.state.city}</td>
                                <td>{this.state.phone_number}</td>
                                <td>{this.state.email}</td>
                                <td>{this.state.nurse}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile