//Library
import React from "react";
import styles from "./DisplayedArticle.module.css";
import { Link} from 'react-router-dom';
import routes from '../../../config/routes';



function DisplayedArticle (props) {

    //Méthodes
    
    //JSX
    return (
        <Link to={routes.ARTICLES + "/" + props.article.slug} article={props} className={styles.link}>
            <div className={styles.DisplayedArticle}>
                <h2> {props.article.title} </h2>
                <p>{props.article.accrohce}</p>
                <small>{props.article.auteur} </small>
            </div>
        </Link>
    );
};

export default DisplayedArticle;