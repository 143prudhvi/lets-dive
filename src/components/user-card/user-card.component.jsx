import React from 'react';
import './user-card.styles.scss';

const UserCard = ({displayName}) => (
  <div className="name">
    {displayName}
  </div>
);

export default UserCard;
