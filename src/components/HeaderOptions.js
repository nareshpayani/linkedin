import React from 'react';
import "../css/HeaderOptions.css"
import {Avatar} from "@material-ui/core";
import { selectUser } from '../features/userSlice';
import {useSelector} from "react-redux";

function HeaderOptions({avatar, Icon, title, onClick}) {

    const user = useSelector(selectUser);
    return (
        <div className="header__Options">
            {Icon && <Icon className="headerOptions_Icon" />}
            {avatar && (<Avatar onClick= {onClick} className="headerOptions_Icon" src={user?.photoUrl}>{user?.email[0]}</Avatar>)}
            <h3 className="headerOptions_title">{title}</h3>
        </div>
    )
}

export default HeaderOptions;