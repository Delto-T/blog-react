//Library
import React from "react";
import styles from './Input.module.css';

//Component


function Input(props) {

    let inputElement = null;

    const inputClasses = [];

    if(!props.valid && props.touched) {
        inputClasses.push(styles.invalid);
    };

    // Switch avec l'ensemble des cas pour chaque type d'input
    switch(props.type){
        case("input"):
            inputElement = (
            <>
            <input 
            {...props.config}
            value={props.value}
            id= {props.id}
            className={inputClasses}
            onChange= {props.changed}/>
            {!props.valid && props.touched ? <span> {props.error}</span> :  null }
            </>
            );
        break;
        case('textarea'):
            inputElement = (
            <>
            <textarea className={inputClasses} id= {props.id} value={props.value} onChange= {props.changed}/>
            {!props.valid && props.touched ? <span> {props.error}</span> :  null }
            </>);
            break;
        
        case("select"):
        inputElement = (
            <select className={inputClasses} id= {props.id} value= {props.value} onChange= {props.changed}>
                {props.config.options.map( option => (
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        );
        break;
    }    
        

    //JSX
    return (
        <div className= {styles.Input}>
            <label htmlFor={props.id}> {props.label} </label>
            {inputElement}
        </div>
    );
};

export default Input;