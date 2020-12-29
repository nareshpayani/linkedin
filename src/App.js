import React,{useEffect} from 'react';
import './App.css';
import {useSelector, useDispatch} from "react-redux";
import Feed from './components/Feed';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { login, logout, selectUser } from './features/userSlice';
import Login from './components/Login';
import { auth } from './firebase';
import Widgets from './components/Widgets';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();


  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if(userAuth) {
        //user logged In
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoURL: userAuth.profilePic
        }));
      }else {
        //user logged out

        dispatch(logout());
      }
    })
  }, []);


  return (
    <div className="app">
      <Header/>

      {!user ? (
        <Login/>
      ) : (
        <div className="app__body">
        <Sidebar/>
        <Feed/>
        <Widgets/>
      </div>
  
      )}
     </div>  
  );
}

export default App;
