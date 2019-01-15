import React from 'react';
import {Avatar, Card, Row, Col} from 'antd';
import {connect} from 'react-redux'
import './Player.css'

const Player = props => {
  const {player} = props
  const countAnswers = Object.keys(player.answers).length
  const countQuestions = player.questions.length
  return (
    <Card
      style={{width: 400}}>
      <Row>
        <Col span={4}>
          <Avatar className="avatar-player" size={64} src={player.avatarURL} />
        </Col>
        <Col span={16}>
          <h2 className="name-player">{player.name}</h2>
          <p className="question-section-player">Answered questions: {countAnswers}</p>
          <p className="question-section-player">Created questions: {countQuestions}</p>
        </Col>
        <Col span={4}>
          <h2 className="title-score-player">Score</h2>
          <h2 className="amount-score-player">{countQuestions + countAnswers}</h2>
        </Col>
      </Row>
    </Card>
  );
}

function mapStateToProps({users}, {id}) {
  const player = users[id]
  return {
    player
  }
}

export default connect(mapStateToProps)(Player);