import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

//import Menu from './components/menu';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

import DisplayUsers from './components/users/DisplayUsers';//admin components
import EditUser from './components/users/EditUser';
import DeleteUser from './components/users/DeleteUser';

import AcceptPatient from './components/nurse/patients/AcceptPatient';//nurse components
import DropPatient from './components/nurse/patients/DropPatient';//nurse components
import MyPatients from './components/nurse/patients/MyPatients';//nurse components
import NoNursePatients from './components/nurse/patients/NoNursePatients';//nurse components

import CreateReport from './components/reports/CreateReport';
import MyReports from './components/reports/MyReports';
import ReadReply from './components/reports/ReadReply';

import CreatePost from './components/nurse/posts/CreatePost';
import EditPost from './components/nurse/posts/EditPost';
import ReadPost from './components/nurse/posts/ReadPost';
import DeletePost from './components/nurse/posts/DeletePost';

import ListReportsToMe from './components/nurse/Replys/ListReportsToMe';
import EditReply from './components/nurse/Replys/EditReply';


class App extends Component {
  render(){
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            
            <Route exact path="/displayUsers" component={DisplayUsers} />
            <Route exact path="/editUser/:id" component={EditUser} />
            <Route exact path="/deleteUser/:id" component={DeleteUser} />

            <Route exact path="/noNursePatients" component={NoNursePatients} />
            <Route exact path="/myPatients" component={MyPatients} />
            <Route exact path="/acceptPatient/:id" component={AcceptPatient} />
            <Route exact path="/dropPatient/:id" component={DropPatient} />

            <Route exact path="/createReport/" component={CreateReport} />
            <Route exact path="/myReports" component={MyReports} />
            <Route exact path="/readReply/:id" component= {ReadReply} />

            <Route exact path="/createPost" component={CreatePost} />
            <Route exact path="/editPost/:id" component={EditPost} />
            <Route exact path="/readPost/:id" component={ReadPost} />
            <Route exact path="/deletePost/:id" component={DeletePost} />

            <Route exact path="/listReportsToMe/" component={ListReportsToMe} />
            <Route exact path="/editReply/:id" component={EditReply} />

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
