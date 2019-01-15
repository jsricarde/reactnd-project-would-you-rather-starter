import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import {Avatar, Card, Button} from 'antd';
import {connect} from 'react-redux'
import './Question.css'

const {Meta} = Card

class Question extends Component {
  render() {
    const {question, author, type} = this.props
    const description = `... ${question.optionOne.text} ...`
    const title = `${author.name} asks:`
    return (
      <Card
        title={title}
        style={{width: 300}}
        actions={[<Button type="primary"><Link to={{
          pathname: `/questions/${question.id}/${type}`,
          state: { fromHome: true }
        }}>View the poll</Link></Button>]}>
        <Meta
          avatar={<Avatar size="large" src={author.avatarURL} />}
          description={description} />
      </Card>
    );
  }
}

function mapStateToProps({authedUser, users, questions}, {id, type}) {
  const question = questions[id]
  const author = users[question.author]

  return {
    authedUser,
    author,
    question,
    type
  }
}

export default connect(mapStateToProps)(Question);