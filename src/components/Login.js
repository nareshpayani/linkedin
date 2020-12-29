import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import "../css/Login.css";
import { login } from '../features/userSlice';
import { auth } from '../firebase';



function Login() {

const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [profilePic, setProfilePic] = useState("");

const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoURL: userAuth.user.photoURL
            }))
        }).catch((error) => alert(error));
    };

    const register = () => {
        if (!name) {
            return alert ("Please Enter Full Name");
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then((userAuth) => {
            userAuth.user.updateProfile({
                displayName: name,
                photoURL: profilePic
            })
            .then (() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic
                }));
            });
        }).catch((error) => alert(error.message));
    };
    return (
        <div className="login">
            <img src="https://www.logo.wine/a/logo/LinkedIn/LinkedIn-Logo.wine.svg" alt="" />

            <form>
                <input value= {name} onChange= { e => setName(e.target.value)} type="text" placeholder="Full Name" />
                <input value= {profilePic} onChange= { e => setProfilePic(e.target.value)}  type="text" placeholder="Photo URL" />
                <input value= {email} onChange= { e => setEmail(e.target.value)} type="email" placeholder="Email ID" />
                <input value= {password} onChange= { e => setPassword(e.target.value)} type="password" placeholder="Password" />

                <button type= "submit" onClick={loginToApp}>Sign In</button>
            </form>

            <p>Not A Member ? <span className="login__register" onClick={register}>Register Now</span></p>
        </div>
    )
}

export default Login;
