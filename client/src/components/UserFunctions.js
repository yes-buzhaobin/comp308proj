import axios from 'axios';

export const register =  newUser => {
    return axios
    .post('http://localhost:5000/users/register', {
        password:newUser.password,
        first_name:newUser.first_name,
        last_name:newUser.last_name,
        address:newUser.address,
        city:newUser.city,
        phone_number:newUser.phone_number,
        email:newUser.email
    })
    .then(res => {
        console.log(res);
        if(res.data.error){
            return { error: res.data.error };
        } else {
            return { status: 'Registerd! in usersFunctions' };
        }
    });

}
export const login =  user => {
    return axios
    .post('http://localhost:5000/users/login', {
        email: user.email,
        password: user.password
    })
    .then(res => {
        console.log('res.token', res.data.token);
        let name = res.data.user.first_name;
        localStorage.setItem('usertoken', res.data.token);
        localStorage.setItem('userName', name);
        localStorage.setItem('role', res.data.user.role);
        localStorage.setItem('email', res.data.user.email);
        console.log("Res " + res.data.user.email);
        console.log("Res data " + res);
        return res.data;
    })
    .catch(err => {
        //console.log("Error " );
        console.log("Error " + err);
    });
}
