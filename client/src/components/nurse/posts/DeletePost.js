import React, {Component} from 'react';
import axios from 'axios';
import './CreatePost.css';

export default class DeleteUser extends Component {

    constructor(props){
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);

        this.state = {
            email: '',
            first_name: '',
            last_name: '',
            role: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        console.log("why");
        axios.get('http://localhost:5000/posts/getPostById/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    title: res.data.post.title,
                    content:res.data.post.content,
                });
            })
            .catch(function(err){
                console.log(err);
            })
    }
    onSubmit(e) {
        e.preventDefault();
        console.log("onSubmit call");
        
        axios.delete('http://localhost:5000/posts/' 
            + this.props.match.params.id
        )
            .then(res => {
                console.log(res.data);
                this.props.history.push('/');
            });

    }
    onCancel(e) {
        e.preventDefault();
        this.props.history.push('/');
    }


    onChangeTitle(e) {
        this.setState({
            title:e.target.value
        });
    }
    onChangeContent(e) {
        this.setState({
            content:e.target.value
        });
    }
    render(){
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="FormFix">
                            <br />
                            <h3>Delete Post</h3>
                            <hr></hr>
                            <form onSubmit={this.onSubmit}>
                            <div className="col">
                                    <label htmlFor="title" className="labelRight">Title:</label>
                                </div>
                                <div className="col-sm-12">
                                    <input type="text"
                                    className="form-control"
                                    name="title"
                                    disabled="disabled"
                                    placeholder="Enter a title"
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}/>
                                </div>
                                <div className="col">
                                    <label htmlFor="content" className="labelRight">Content:</label>
                                </div>
                                <div className="col-12">
                                    <textarea
                                    rows="4" 
                                    cols="50"
                                    disabled="disabled"
                                    className="form-control"
                                    name="content"
                                    placeholder="Enter content"
                                    value={this.state.content}
                                    onChange={this.onChangeContent}/>
                                </div>
                                <br />
                                <div>
                                    <button type="submit" className="btn btn-lg btn-primary btn-block">
                                        Confirm to Delete
                                    </button>
                                    <button type="cancel" onClick={this.onCancel} className="btn btn-lg btn-primary btn-block">
                                        Canclel
                                    </button>
                                </div>
                            </form>
                        </div>
                     </div>
                </div>
            </div>
        )
    }
}