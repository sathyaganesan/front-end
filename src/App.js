import React, {useState} from 'react';
import {Route, Switch} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import SampleClasses from './components/SampleClasses';
import LogOutWarning from './components/LogOutWarning';
import './App.css';

import { ClientPage } from './ClientComponents/ClientPage';
import { InstructorPage } from './InstructorComponents/InstructorPage';
import { PrivateRoute } from './components/PrivateRoute';

function App() {

  // state to hold current logged in user, initial user object values
  const [currentUser, setCurrentUser] = useState({
      username: '',
      role: '',
      token: '' 
    });

  // function to get the current logged in user, passed as props to signup and login forms
  const getUser = (user) => {
    const loggedInUser = {...currentUser,
      username: user.username,
      role: user.role,
      tolen: user.token
    }
    setCurrentUser(loggedInUser);
  }
 

  return (
    <div className="App">
      
      <Header currentUser={currentUser}/>

      {/* Routes */}
      <Switch>
        <Route path='/logout' render={() => <LogOutWarning currentUser={currentUser} />}/>
        <Route path='/signup' render={()=> <SignUp />}/>
        <Route path='/login' render={()=> <LogIn currentUser={currentUser} getUser={getUser}/>}/>
        <Route path='/sampleclasses' component={SampleClasses} />

        <PrivateRoute path='/clientPage' component={ClientPage}/>
        <PrivateRoute path='/instructorPage' component={InstructorPage}/>
      </Switch>

      <Footer />
    </div>
  );
}

export default App;
