import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom'
import {handleSetAuthedUser} from '../../actions/authedUser';
import {
  Form, Button, Select
} from 'antd';
import './SingIn.css'

const Option = Select.Option;

class SingIn extends Component {

  state = {
    toHome: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      toHome: false
    })
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {dispatch} = this.props
        dispatch(handleSetAuthedUser(values.userId))
        this.setState({
          toHome: true
        })
      }
    });
  }

  render() {
    const {usersArray, form} = this.props
    const {getFieldDecorator} = form;
    const {toHome} = this.state

    if (toHome === true) {
      return (<Redirect to='/' />)
    }

    return (
      <Form onSubmit={this.handleSubmit} className="signin-form">
        <h1>Welcome to the Would you rather app!</h1>
        <h2>Please sign in to continue</h2>
        <hr />
        <h1>Sign In</h1>
        <Form.Item>
          {getFieldDecorator('userId', {
            rules: [{required: true, message: 'Please choose an user'}],
          })(
            <Select className="signin-form-select" placeholder="Select an user" style={{width: 200}}>
              {usersArray.map((user) => (<Option key={user.id} value={user.id}>{user.name}</Option>))}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="signin-form-button">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

function mapStateToProps({authedUser, users}) {
  const usersArray = Object.values(users)
  return {
    usersArray,
    authedUser
  }
}
const WrappedSingIn = Form.create({name: 'signin'})(SingIn);

export default withRouter(connect(mapStateToProps)(WrappedSingIn));