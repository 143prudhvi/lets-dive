import React from 'react';
import UserCard from '../../components/user-card/user-card.component';
import { firestore } from '../../firebase/firebase.utils';
import './homepage.styles.scss';

class HomePage extends React.Component{
  constructor(){
    super();

    this.state = {
      activeUsers : [],
      inactiveUsers : []
    }
  }

  appUsers = async (currentUser) => {
    const querySnap =  await firestore.collection('users').get();
    const activeUsers = querySnap.docs.filter(user => {
      if(user.data().status === "online" && user.data().uid !== currentUser.uid){
        return true;
      }
    else{
      return false;
    }}).map(user => user.data());
    const inactiveUsers = querySnap.docs.filter(user => user.data().status === "offline").map(user => user.data());
    this.setState({activeUsers : activeUsers , inactiveUsers : inactiveUsers} );
    }

  componentDidMount(){
    const {currentUser } = this.props;
    this.appUsers(currentUser);
  }

  render(){
    return(
        <div className="homepage">
          <div className="activeUsers">
            <h1 className="active">Active Users</h1>
            {
              this.state.activeUsers.map(({uid , ...allParams}) => (
                <UserCard key={uid} uid={uid} {...allParams} />
              ))
            }
          </div>
          <div className="inactiveUsers">
            <h1 className="inactive">Inactive Users</h1>
            {
              this.state.inactiveUsers.map(({ uid, ...allParams }) => (
                <UserCard key={uid} uid={uid} {...allParams} />
              ))
            }
          </div>
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
