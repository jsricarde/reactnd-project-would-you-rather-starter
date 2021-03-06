import React, {Fragment} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {Avatar, Card, Progress, Tag, Row, Col} from 'antd'
import './ResultQuestion.css'

const ResultQuestion = props => {

  const {question, author, user, fromHome} = props
  const title = (author) ? `Asked by ${author.name}:` : ''
  let totalPercent = 0
  let optionOnePercent = 0
  let optionTwoPercent = 0
  let answer = ''
  if (question) {
    totalPercent = question.optionOne.votes.length + question.optionTwo.votes.length
    optionOnePercent = (question.optionOne.votes.length * 100) / totalPercent
    optionTwoPercent = (question.optionTwo.votes.length * 100) / totalPercent
    answer = user.answers[question.id]
  }
  return (
    <Fragment>
      {(question && fromHome) ? (
        <Card style={{width: 500}} title={title}>
          <Row>
            <Col span={5}>
              <Avatar className="avatar-result" size={64} src={author.avatarURL} />
            </Col>
            <Col span={19}>
              <Card
                type="inner"
                title={`${question.optionOne.text}?`}>
                {answer === 'optionOne' && <Tag color="gold">Your vote</Tag>}
                <Progress percent={optionOnePercent} showInfo={true} />
                <p>Votes: {question.optionOne.votes.length}</p>
              </Card>
              <Card
                style={{marginTop: 16}}
                type="inner"
                title={`${question.optionTwo.text}?`}>
                {answer === 'optionTwo' && <Tag color="gold">Your vote</Tag>}
                <Progress percent={optionTwoPercent} showInfo={true} />
                <p>Votes: {question.optionTwo.votes.length}</p>
              </Card>
            </Col>
          </Row>
        </Card>
      ) : <Redirect to="notfound" />}
    </Fragment>

  );
}



function mapStateToProps({authedUser, questions, users}, props) {
  const {id} = props.match.params
  const {state} = props.location
  const fromHome = (state && 'fromHome' in state && state.fromHome) ? state.fromHome : null
  const question = questions[id]
  const author = (question && 'author' in question) ? users[question.author] : null
  const user = users[authedUser]
  return {
    question,
    author,
    user,
    fromHome
  }
}


export default connect(mapStateToProps)(ResultQuestion);