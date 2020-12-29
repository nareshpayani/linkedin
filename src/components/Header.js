import React from 'react'
import "../css/Header.css";
import SearchIcon from '@material-ui/icons/Search';
import HeaderOptions from './HeaderOptions';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {useDispatch} from "react-redux";
import { logout } from '../features/userSlice';
import { auth } from '../firebase';


function Header() {

    const dispatch = useDispatch();

    const logoutOfApp = () => {
        dispatch(logout());
        auth.signOut();
    }

    return (
        <div className="header">
            <div className="header__left">
                <img src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt="" />
                <div className="header__search">
                    <SearchIcon />
                    <input type="text" />
                </div>
            </div>
            <div className="header__right">
                <HeaderOptions Icon= {HomeIcon} title="Home"/>
                <HeaderOptions Icon= {SupervisorAccountIcon} title="My Network"/>
                <HeaderOptions Icon= {BusinessCenterIcon} title="Jobs" />
                <HeaderOptions Icon= {MessageIcon} title="Messaging" />
                <HeaderOptions Icon= {NotificationsIcon} title="Notifications" />
                <HeaderOptions avatar= {true} onClick={logoutOfApp} title="Me" />
            </div>
        </div>
    )
}

export default Header;
