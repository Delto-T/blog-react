// Library
import React from "react";
import styles from './Layout.module.css'

//Components
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer"

function Layout(props) {
    return (
    <div className={styles.Layout}>  
        <Header user={props.user}/>

        <div className={styles.content}>
            {props.children}
        </div>
        
        <Footer/>
    </div>);
};


/*
    -Header
        - logo
        - NavBar
            - ItemNavBar
*/

export default Layout;