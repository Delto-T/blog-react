//Library
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "../../config/axios-firebase";
import routes from '../../config/routes';
import styles from "./Home.module.css";

// Components
import DisplayedArticles from "../../Components/DisplayedArticles/DisplayedArticles";


function Home(props) {

    //State
    const[articles, setArticles] = useState([]);

    //ComponentDidMount
    useEffect(() => {

        axios.get('/blogArticles.json')
             .then(response =>{
                //console.log(response)

                const articlesArray = [];

                for(let key in response.data){
                    articlesArray.push({
                        ...response.data[key],
                        id: key
                    });
                };

                //Chronologie
                articlesArray.reverse();

                setArticles(articlesArray.filter(articleFilter => articleFilter.etatBrouillon == "false").slice(0,3));

             })
             .catch(error => {
                //console.log(error)
             });
    },[]);

    // ComponentDidUpdate - Mettre le titre del'onglet
    useEffect(() => {
        document.title = 'Accueil';
    });

    //JSX
    return (
        <>
            <h1>Accueil</h1>
            <div className="container">
                <DisplayedArticles articles={articles}/>
                <div className={styles.mainLink}>
                    <Link to={routes.ARTICLES}>
                        Vers tous les articles &nbsp;
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>      
                    </Link>
                </div>
            </div>
        </>
    );    

};

export default Home;