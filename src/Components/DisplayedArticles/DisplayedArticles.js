//Library
import React from "react";
import styles from "./DisplayedArticules.module.css";

//Components
import DisplayedArticle from "./DisplayedArticle/DisplayArticle";


function DisplayedArticles (props) {

    let articles= props.articles.map( article => (
        <DisplayedArticle key={article.id} article={article}/>
    ));
    
    //JSX
    return (
        <section className={[styles.DisplayedArticles, 'container'].join(" ")}>
            {articles}
        </section>
    );
};

export default DisplayedArticles;