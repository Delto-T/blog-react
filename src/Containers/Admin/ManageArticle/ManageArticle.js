//Library
import React, { useState, useEffect } from "react";
import styles from "./ManageArticle.module.css";
import axios from '../../../config/axios-firebase';
import { useNavigate, useLocation } from "react-router-dom";
import routes from '../../../config/routes';
import { checkValidity } from "../../../Shared/utility";
import fire from "../../../config/firebase";
import { getAuth } from "firebase/auth";

//Components
import Input from "../../../Components/UI/Input/Input";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";


function ManageArticle(props) {


    //React Router DOM
    const stateArticle = useLocation(props);
    const navigate = useNavigate();
    // Firebase
    const auth = getAuth(fire); 

    //States
    
        //contenant les Inputs (1)
    const  [inputs, setInputs] = useState({
        titre: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: "Titre de l'article"
            },
            value: stateArticle.state && stateArticle.state.article ? stateArticle.state.article.title : "",
            label:"Titre",
            valid: stateArticle.state && stateArticle.state.article ? true : false,
            validation: {
                required: true,
                minLength: 5,
                maxLength: 85
            },
            msgError: "Vous devez écrire minimum 5 caractères et maximum 85.",
            touched: false
        },
        accroche: {
            elementType: 'textarea',
            elementConfig: {},
            value: stateArticle.state && stateArticle.state.article ? stateArticle.state.article.accrohce : "",
            label: "Accroche de l'article",
            valid: stateArticle.state && stateArticle.state.article ? true : false,
            validation: {
                required: true,
                minLength: 10,
                maxLength: 140
            },
            msgError: "Le champs est vide",
            touched: false
        },
        contenu: {
            elementType: 'textarea',
            elementConfig: {},
            value:  stateArticle.state && stateArticle.state.article ? stateArticle.state.article.contenue : "",
            label: "Contenu de l'article",
            valid: stateArticle.state && stateArticle.state.article ? true : false,
            validation: {
                required: true
            },
            msgError: "Le champs est vide",
            touched: false
        },
        auteur: {
            elementType: "input",
            elementConfig: {
                type: "texte",
                placeholder: "Auter de l'article"
            },
            value:  stateArticle.state && stateArticle.state.article ? stateArticle.state.article.auteur : "",
            label: "Auteur",
            valid: stateArticle.state && stateArticle.state.article ? true : false,
            validation: {
                required: true
            },
            msgError: "Le champs est vide",
            touched: false
        },
        etat: {
            elementType: "select",
            elementConfig: {
                options: [
                    {value: true, displayValue: 'Broullion'},
                    {value: false, displayValue: 'Publié'}
                ]
            },
            value: stateArticle.state && stateArticle.state.article ? stateArticle.state.article.etatBrouillon : true,
            label: "Etat" ,
            valid: true,
            validation: {},
            touched: false
        }
    });

    const[valid, setValid] = useState(stateArticle.state && stateArticle.state.article ? true : false);

    // ComponentDidUpdate - Mettre le titre del'onglet
    useEffect(() => {
        document.title = 'Gérer un article';
    });

    //Méthodes
        
    const inputChangedHandler = (event, id) => {

        // Mets à jours la propriété Etat dans le State
        const newInputs = {...inputs};
        newInputs[id].value = event.target.value;
        newInputs[id].touched = true;
         

        //Vérification de la valeur
        newInputs[id].valid = checkValidity(event.target.value, newInputs[id].validation);

        setInputs(newInputs);

        //Vérification du formulaire
        let formIsValid = true;
        for(let input in newInputs){
            formIsValid = newInputs[input].valid && formIsValid;
        }
        setValid(formIsValid);
    };

        //Slug
    const generateSlug = str => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n, etc
        var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaeeeeiiiioooouuuunc------";
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
    
        return str;
    }



        //Permet de faire les controles dans le formulaire
    const formHandler = event => {
        event.preventDefault();

        const slug = generateSlug(inputs.titre.value);
        
        const article = {
            title: inputs.titre.value,
            accrohce: inputs.accroche.value,
            contenue: inputs.contenu.value,
            auteur: inputs.auteur.value,
            etatBrouillon: inputs.etat.value,
            date: Date.now(),
            slug: slug
        };

        const token = auth.currentUser.getIdToken()
            .then(token => {
            if(stateArticle.state && stateArticle.state.article){
                axios.put('/blogArticles/' + stateArticle.state.article.id + '.json?auth=' + token, article)
                        .then(response =>{
                        //console.log(response)
                        navigate(routes.ARTICLES + '/' + article.slug)
                        })
                        .catch(error => {
                        //console.log(error)
                        });
            } else {
                axios.post("/blogArticles.json?auth=" + token, article)
                    .then(response => {
                        //console.log(response)
                        navigate(routes.ARTICLES);
                    })
                    .catch(error => {
                        //console.log(error)
                    });
            }
            })
            .catch( error => {
                console.log(error);
            });     
    };

    
    //Variable
        // Transformation de l'objet en array (2)
    const formElementArray = [];
    for (let key in inputs){
        formElementArray.push({
            id: key,
            config: inputs[key]
        });
    }
        // Génération de l'ensemble des inputs avec l'envois des infomations en props d'un component Input (3)
    let form = (
        <form className={styles.Add} onSubmit={(e) => formHandler(e)}>
            {formElementArray.map( formElement => (
                <Input
                    key= {formElement.id}
                    id={formElement.id}
                    value= {formElement.config.value}
                    label= {formElement.config.label}
                    type={formElement.config.elementType}
                    config={formElement.config.elementConfig}
                    valid={formElement.config.valid}
                    error={formElement.config.msgError}
                    touched={formElement.config.touched}
                    changed={(e) => inputChangedHandler(e, formElement.id)}
                />
            ))}
            <div className={styles.submit}>
                <input type="submit" value={stateArticle.state && stateArticle.state.article ? "Modifier un article": "Ajouter un article"} disabled={!valid}/>
            </div>
        </form>
    );

    //JSX
    return (
        <div className="container"> 
            {stateArticle.state && stateArticle.state.article ?
                <h1>Modifier</h1>
            :
                <h1>Ajouter</h1>    
            }
            {form}
        </div>       
    )

};

export default ManageArticle;