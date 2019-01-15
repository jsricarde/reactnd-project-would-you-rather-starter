import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Form, Input, Button,
} from 'antd';
import { handleAddQuestion } from '../../actions/questions'
import './NewQuestion.css'
import {withRouter} from 'react-router-dom'


class NewQuestion extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props
        dispatch(handleAddQuestion(values.optionOne, values.optionTwo))
        this.props.history.push('/')
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className="new-question-form">
        <h1>Create New Question</h1>
        <hr/>
        <h4>Complete the questions</h4>
        <h2>Would you rather...</h2>
        <Form.Item>
          {getFieldDecorator('optionOne', {
            rules: [{ required: true, message: 'Please input the option one text here' }],
          })(
            <Input placeholder="Enter Option One Text Here" />
          )}
        </Form.Item>
        <p className="separator-new-question-form">Or</p>
        <Form.Item>
          {getFieldDecorator('optionTwo', {
            rules: [{ required: true, message: 'Please input the option two text here' }],
          })(
            <Input placeholder="Enter Option Two Text Here" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="new-question-form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const WrappedNewQuestion = Form.create({ name: 'new_question' })(NewQuestion);

export default withRouter(connect()(WrappedNewQuestion));