import React, {Component} from 'react';
import axios from 'axios';
import '../../Register.css';

export default class dropPatient extends Component {

    constructor(props){
        super(props);
        this.onChangeNurse = this.onChangeNurse.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            nurse: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        axios.get('http://localhost:5000/users/user/'+this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    email:res.data.email,
                    first_name:res.data.first_name,
                    last_name:res.data.last_name,
                    nurse: res.data.nurse
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
            nurse:this.state.nurse
        };

        axios.post('http://localhost:5000/users/dropNurse/' 
            + this.props.match.params.id, currentUser
        )
            .then(res => {
                console.log(res.data);
                this.props.history.push('/myPatients');
            });
            
    }

    onChangeNurse(e) {
        this.setState({
            nurse:e.target.value
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
                            <h3>Drop Patient From My Patient List</h3>
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
                                    <label>Nurse:</label>
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.nurse}
                                        disabled="disabled"
                                        onChange={this.onChangeNurse}
                                    />
                                </div>
                                <br />
                                <button type="submit" className="btn btn-lg btn-primary btn-block">
                                Drop
                            </button>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}