import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
  Form, Button, Radio, Row, Col, Avatar
} from 'antd';
import {handleAddQuestionAnswer} from '../../actions/questions'
import {withRouter} from 'react-router-dom'
import NotFound from '../not-found/NotFound'

import './AnswerQuestion.css'

const RadioGroup = Radio.Group;

class AnswerQuestion extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch, question} = this.props
        dispatch(handleAddQuestionAnswer(question.id, values.answer))
        this.props.history.push('/')
      }
    });
  }
  render() {
    const {getFieldDecorator} = this.props.form;
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const {question, author, fromHome} = this.props
    return (
      <Fragment>
        {(question && fromHome) ? (
          <Form onSubmit={this.handleSubmit} className="answer-question-form">
            <Row>
              <Col span={4}>
                <Avatar className="avatar-answer" src={author.avatarURL} />
              </Col>
              <Col span={20}>
                <h1>{author.name} asks: </h1>
              </Col>
            </Row>
            <hr />
            <h2>Would you rather...</h2>
            <Form.Item>
              {getFieldDecorator('answer', {
                rules: [{required: true, message: 'Please choose an option'}],
              })(
                <RadioGroup>
                  <Radio style={radioStyle} value={'optionOne'}>{question.optionOne.text}</Radio>
                  <Radio style={radioStyle} value={'optionTwo'}>{question.optionTwo.text}</Radio>
                </RadioGroup>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="answer-question-form-button">
                Submit
        </Button>
            </Form.Item>
          </Form>
        ) : <NotFound />}
      </Fragment>
    );
  }
}

function mapStateToProps({questions, users}, props) {
  const {id} = props.match.params
  const {state} = props.location
  const fromHome = (state && 'fromHome' in state && state.fromHome) ? state.fromHome : null
  const question = questions[id]
  const author = (question && 'author' in question) ? users[question.author] : null
  return {
    question,
    author,
    fromHome
  }
}
const WrappedAnswerQuestion = Form.create({name: 'answer_question'})(AnswerQuestion);


export default withRouter(connect(mapStateToProps)(WrappedAnswerQuestion));