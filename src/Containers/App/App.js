//Librarary
import React, { useState, useEffect } from 'react';
import '../App/App.css';
import {Route, Routes} from 'react-router-dom';
import routes from '../../config/routes';
import fire from '../../config/firebase';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

//Containers
import Layout from '../../HOC/Layout/Layout';
import Home from '../Home/Home';
import Articles from '../Articles/Articles';
import ManageArticle from '../Admin/ManageArticle/ManageArticle';
import Authentification from '../Security/Authentification/Authentification';

//Components
import Contacts from '../../Components/Contacts/Contacts';
import Article from '../Articles/Article/Article';


function App() {

  //State
  const [user, setUser] = useState('');

  //Etat
    // componentDidMount
  useEffect( () => {
    authLisner();
  },[]);

  //Méthode
  const authLisner = () => {
    const auth = getAuth(fire);
    onAuthStateChanged(auth, user => {
      if(user){
        setUser(user)
      } else {
        setUser('')
      }
    });
  };



  //JSX
  return (
    <div className="App">
      <Layout user={user}>
        <Routes>
          <Route path={routes.HOME} element={<Home />}/>
          <Route path={routes.ARTICLES} element={<Articles />}/>
          <Route path={routes.CONTACT} element={<Contacts />}>
            <Route path='Email' element={<h1>Email toto@gmail.com</h1>}/>
            <Route path='Call' element={<h1>Call 06 06 06 06 06</h1>}/>
            <Route path="*" element={<h1>404</h1>} />
          </Route>
          <Route path={routes.ARTICLES + "/:slug"}  element={<Article user={user}/>}/>
          {user && <Route path={routes.MANAGE_ARTICLE} element={<ManageArticle/>} />}
          {!user && <Route path={routes.AUTHENTIFICATION} element={<Authentification/>}/>}
          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
