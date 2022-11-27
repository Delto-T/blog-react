// Library
import React from "react";
import styles from './NavBar.module.css';
import routes from '../../../config/routes';
import fire from "../../../config/firebase";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Components
import ItemNavBar from "./ItemNavBar/ItemNavBar";



function NavBar (props){

    //Firebase
    const auth = getAuth(fire);

    //React Router
    const navigate = useNavigate();

    //Méthodes
    const logOutClickedHandler = () => {
        signOut(auth);
        navigate(routes.HOME);
    };

    //JSX
    return (
        <ul className={styles.NavBar}>
            <ItemNavBar exact={true} to={routes.HOME}>Accueil</ItemNavBar>
            <ItemNavBar exact={false} to={routes.ARTICLES}>Articles</ItemNavBar>
            <ItemNavBar exact={false} to={routes.CONTACT}>Contacts</ItemNavBar>
            {props.user && <ItemNavBar exact={true} to={routes.MANAGE_ARTICLE}>Ajouter</ItemNavBar>}
            {!props.user && <ItemNavBar exact={true} to={routes.AUTHENTIFICATION}>Authentification</ItemNavBar>}
            {props.user && <button onClick={logOutClickedHandler} className={styles.logOut} >Déconnexion</button>}
        </ul>
    );
};

export default NavBar;