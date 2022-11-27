// Library
import React from "react";
import styles from './Header.module.css'

// Components
import NavBar from "./NavBar/NavBar";

function Header (props){
    //JSX
    return (
        <>
        <header className={styles.Header}>
            <div className={["container", styles.flex].join(' ')}>
                <div className={styles.logo}>
                    BLOG
                </div>

                <nav>
                    <NavBar user={props.user}/>
                </nav>
            </div>
        </header>
        </>
    );
};

export default Header;