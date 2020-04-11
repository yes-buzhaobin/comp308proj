import React, {Component} from 'react';
import axios from 'axios';
import '../Register.css';

export default class EditUser extends Component {

    constructor(props){
        super(props);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            role: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        console.log("why");
        axios.get('http://localhost:5000/users/user/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    email:res.data.email,
                    first_name:res.data.first_name,
                    last_name:res.data.last_name,
                    role: res.data.role
                });
            })
            .catch(function(err){
                console.log(err);
            })
    }
    onSubmit(e) {
        e.preventDefault();

        const currentUser = {
            email: this.state.email,
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            role:this.state.role
        };

        axios.post('http://localhost:5000/users/update/' 
            + this.props.match.params.id, currentUser
        )
            .then(res => {
                console.log(res.data);
                this.props.history.push('/displayUsers');
            });
            
    }

    onChangeRole(e) {
        this.setState({
            role:e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email:e.target.value
        });
    }
    onChangeFirstName(e) {
        this.setState({
            first_name:e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            last_name:e.target.value
        });
    }
    
    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="FormFix">
                            <br />
                            <h3>Modify Role</h3>
                            <hr></hr>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Email:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>first Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        value={this.state.first_name}
                                        onChange={this.onChangeFirstName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Last Name:</label>
                                    <input type="text"
                                        className="form-control"
                                        disabled="disabled"
                                        value={this.state.last_name}
                                        onChange={this.onChangeLastName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Role:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.role}
                                        onChange={this.onChangeRole}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Update users
                            </button>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}