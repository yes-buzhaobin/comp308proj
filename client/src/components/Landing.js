import React, {Component} from 'react';
//import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Post = props => (
    <tr>
        <td>{props.post.title}</td>
        <td>{props.post.post_time}</td>
        <td>{props.post.authorEmail}</td>
        <td>
             <Link to={"/readPost/"+props.post._id}>Read</Link> 
        </td>
        { localStorage.usertoken && localStorage.email === props.post.authorEmail ?
            [ 
                <td>
                    <Link to={"/edttPost/"+props.post._id}>Edit</Link> 
                </td>,
                <td>
                    <Link to={"/deletePost/"+props.post._id}>Delete</Link> 
                </td>
            ]
        : null};
    </tr>
)

class DisplayPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        console.log("DisplayPosts");
        axios.get('http://localhost:5000/posts/getPosts/')
            .then(res => {
                console.log(res.data);
                this.setState({posts: res.data});
            }).catch(function (error) {
                console.log(error);
            })
    }
    postList() {
        return this.state.posts.map(function(currentPost, i) {
            return <Post post={currentPost} key={i} />;
        });
    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Posts</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Post Time</th>
                                <th>Author Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.postList() }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default DisplayPosts