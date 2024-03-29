//Library
import React, {useState, useEffect} from "react";
import {useParams, useLocation, useNavigate, Link } from "react-router-dom";
import axios from "../../../config/axios-firebase";
import styles from "./article.module.css";
import routes from '../../../config/routes';
import moment from 'moment';
import 'moment/locale/fr';


function Article(props) {

    let param = useParams();
    let navigate = useNavigate();

    //State
    const[article, setArticle] = useState({});

    

    //ComponentDidMount
    useEffect(() => {

        
        axios
        .get('/blogArticles.json?orderBy="slug"&equalTo="'+ param.slug + '"')
        .then(response =>{
        //console.log(response)

        if(Object.keys(response.data).length === 0){
            navigate(routes.HOME)
        }

        for(let key in response.data){
            setArticle({
                ...response.data[key],
                id: key
            });
        };
        })
        .catch(error => {
        console.log(error)
        });

    },[]);

    // ComponentDidUpdate - Mettre le titre de l'artcile que l'onglet
    useEffect(() => {
        document.title = article.title;
    });

    //Méthodes

    const deleteClickedHandler= () => {
        //console.log(article.id)

        props.user.getIdToken()
            .then(token => {
                axios
                .delete('/blogArticles/' + article.id + '.json?auth=' +token)
                .then( response => {
                 // console.log(response);
                  navigate(routes.HOME)
                })
                .catch(error => {
                    console.log(error)
                });
            })
            .catch(error => {
                console.log("error")
            }); 
    };

    // Variable
    //let date = new Date(article.date).toLocaleDateString('fr-FR');

    // Avec Moment JS
    moment.locale('fr'); // Définir le moment en Francais
    let date = moment.unix(article.date / 1000).calendar();

    //JSX
    return (
        <div className="container">
            <h1>{article.title}</h1>  
            <div className={styles.content} >  
                <div className={styles.lead}>
                    {article.accrohce}
                </div>
                {article.contenue}
                {props.user && <div className={styles.button}>
                    <Link to={routes.MANAGE_ARTICLE} state={{article:article}}>
                        <button>Modifier</button>
                    </Link>
                    <button onClick={deleteClickedHandler}>Supprimer</button>
                </div>}
                
            </div>   
            <div className={styles.author}>
                <b>{article.auteur}</b>
                <span>
                    Publié {date}.
                </span>
                {article.etatBrouillon == "true" ? <span className={styles.badge}> Brouillon</span> : null}
            </div>
        </div>
    ) 
};

export default Article;