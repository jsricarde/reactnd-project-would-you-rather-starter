import React from 'react';
import {Tabs} from 'antd';
import {connect} from 'react-redux'
import Question from '../question/Question'
import './Home.css'

const TabPane = Tabs.TabPane;

const unansweredQuestions = (questions, answers) => {
  return questions.filter(id => !answers.includes(id));
}

const Home = props => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="Unanswered" key="1">
        {props.questionIdsUnanswered.map((id) => (
          <Question key={id} id={id} type="unanswered" />
        ))}
      </TabPane>
      <TabPane tab="Answered" key="2">
        {props.questionIdsAnswered.map((id) => (
          <Question key={id} id={id} type="answered" />
        ))}
      </TabPane>
    </Tabs>
  );
}

function mapStateToProps({questions, authedUser, users}) {
  const user = users[authedUser]
  const questionIds = Object.keys(questions)
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
  const questionIdsAnswered = Object.keys(user.answers);
  const questionIdsUnanswered = unansweredQuestions(questionIds, questionIdsAnswered)
  return {
    questionIdsUnanswered,
    questionIdsAnswered
  }
}

export default connect(mapStateToProps)(Home);