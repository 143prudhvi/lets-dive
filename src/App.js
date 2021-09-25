import './App.css';
import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import {Switch ,Route} from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentUser : null
    }
  }

  unSubscribeFromAuth = null

  componentDidMount(){
    this.unSubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({currentUser : {
              id : snapshot.id,
              ...snapshot.data()
            }
          });
        });
      }
      this.setState({currentUser : userAuth});
    });
  }

  componentWillUnmount(){
    this.unSubscribeFromAuth();
  }

  render(){
    return (
      <div >
        <Header currentUser={this.state.currentUser} />
        <Switch>
        {
                this.state.currentUser ?
                <Route exact path='/' component={HomePage} />
                :
                <Route path='/' component={SignInAndSignUpPage} />
              }
        </Switch>
      </div>
    );
  }

}

export default App;
