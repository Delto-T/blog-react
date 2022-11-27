//Library
import React, {useState} from "react";
import { checkValidity } from "../../../Shared/utility";
import styles from "./Authentification.module.css";
import { useNavigate } from "react-router-dom";
import routes from "../../../config/routes";
import fire from "../../../config/firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

//composent
import Input from "../../../Components/UI/Input/Input";


function Authentification () {

    
    const navigate = useNavigate(); //React-DOM
    const auth = getAuth(fire); //Firebase

    //States
        //Enregistre les inputs du formulaire
    const  [inputs, setInputs] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: "Email"
            },
            value: "",
            label:"adresse email",
            valid: false,
            validation: {
                required: true,
                email: true
            },
            msgError: "L'adresse n'est pas valide",
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: "Mot de passe"
            },
            value: "",
            label:"Mot de pasee",
            valid: false,
            validation: {
                required: true,
                minLength: 6
            },
            msgError: "Le mot de passe doit faire au minimum 6 charactères",
            touched: false
        }
    });
        //Permet de savoir si le formulaire remplis toutes les conditions ou non
    const[valid, setValid] = useState(false);

    const[emailError, setEmailError] = useState(false);

    const[loginError, setLoginError] = useState(false);



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

    const registerClickedHandler = () => {
        

        const user ={
            email: inputs.email.value,
            password: inputs.password.value
        }

        createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(response => {
            navigate(routes.HOME);
        })
        .catch((error) => {
            //console.log(error);
            switch(error.code){
                case 'auth/email-already-in-use':
                    setEmailError(true);
                break;
            }
        });

    };

    const loginClickedHandler = () => {
        
        const user ={
            email: inputs.email.value,
            password: inputs.password.value
        }

        signInWithEmailAndPassword(auth, user.email, user.password)
        .then(response => {
            navigate(routes.HOME);
        })
        .catch(error => {
            switch(error.code){
                case "auth/invalide-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    setLoginError(true);
                break;
            }
        });

        
        
    };

    const formHandler = event => {
        event.preventDefault();
    };

    //Variables

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
            <form onSubmit={(e) => formHandler(e)}>
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
                <div className={styles.buttons}>
                    <button disabled={!valid} onClick={registerClickedHandler} className={styles.button}>Inscription</button>
                    <button disabled={!valid} onClick={loginClickedHandler} className={styles.button}>Connexion</button>
                </div>
            </form>
        );

    //JSX
    return (
        <>
        <h1>Authentification</h1>
        <div className={styles.form}>
            {loginError && <div className={styles.alert}>Impossible de vous identifier</div>}
            {emailError && <div className={styles.alert}>Cette addresse email est déjà utilisée</div>}
            {form}
        </div>
        
        </>
    )
};

export default Authentification;