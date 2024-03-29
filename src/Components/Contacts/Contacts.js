//Library
import {React, useEffect} from "react";
import styles from "./Contacts.module.css"
import { Outlet, Link} from 'react-router-dom';

function Contacts() {

    // ComponentDidUpdate - Mettre le titre de l'onglet
    useEffect(() => {
        document.title = 'Contacts';
    });

    //Méthodes


    //JSX
    return (
    <>
        <h1>Contacts</h1>
        <p>Par quel moyen souhaitez-vous être contacté ?</p>
        <Link to="/contacts/email" className={styles.button}>Email</Link>
        <Link to="/contacts/Call" className={styles.button}>Téléphone</Link>
        <Outlet/>
    </>
    );    

};

export default Contacts;