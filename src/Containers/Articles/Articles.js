//Library
import {React, useState, useEffect } from "react";
import axios from "../../config/axios-firebase";

//Components
import DisplayedArticles from "../../Components/DisplayedArticles/DisplayedArticles";

function Articles(props) {

    
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

                articlesArray.reverse();

                setArticles(articlesArray.filter(articleFilter => articleFilter.etatBrouillon == "false"));

             })
             .catch(error => {
                //console.log(error)
             });
    },[]);

    //DisplayedArticles



    //JSX
    return (
    <>
        <h1>Articles</h1>
        <DisplayedArticles articles={articles}/>
    </>
    );    

};

export default Articles;