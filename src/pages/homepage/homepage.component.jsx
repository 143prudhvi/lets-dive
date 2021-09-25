import React from 'react';
import UserCard from '../../components/user-card/user-card.component';
import { firestore } from '../../firebase/firebase.utils';
import './homepage.styles.scss';

class HomePage extends React.Component{
  constructor(){
    super();

    this.state = {
      users : []
    }
  }

  appUsers = async () => {
    const querySnap =  await firestore.collection('users').get();
    const allUsers = querySnap.docs.map(user => user.data());
    this.setState({users : allUsers} , () => {
      console.log(this.state.users)
    });
    }

  componentDidMount(){
    this.appUsers();
  }

  render(){
    return(
        <div className="homepage">
          {
            this.state.users.map(({uid , displayName}) => (
              <UserCard key={uid} displayName={displayName} />
            ))
          }
        </div>
    )
}
}
// const HomePage = () => (
//     <div className="homepage">
//       Home Page
//     </div>
// );

export default HomePage;
