// Library
import React from "react";
import { NavLink } from 'react-router-dom';
import styles from './ItemNavBar.module.css'

// Components

//Méthodes

function ItemNavBar (props){

    //JSX
    return (
        <li className={styles.ItemNavBar}>
            <NavLink
            to={props.to}
            style={({isActive}) => isActive ? {color: '#fb743e',}: undefined }
            end={props.exact}>
                {props.children}
            </NavLink>
        </li>
    );

};

export default ItemNavBar;