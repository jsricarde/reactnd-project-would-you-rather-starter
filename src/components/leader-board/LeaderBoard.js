import React from 'react';
import {connect} from 'react-redux'
import Player from '../player/Player'

const LeaderBoard = props => {
  return (
    <div>
      {props.userIds.map((id) => (
        <Player key={id} id={id} />
      ))}
    </div>
  );
}


function mapStateToProps({users}) {
  const userIds = Object.keys(users)
    .sort((a, b) => {
      const countB = Object.keys(users[b].answers).length + users[b].questions.length
      const countA = Object.keys(users[a].answers).length + users[a].questions.length
      return countB - countA
    })
  return {
    userIds
  }
}

export default connect(mapStateToProps)(LeaderBoard);