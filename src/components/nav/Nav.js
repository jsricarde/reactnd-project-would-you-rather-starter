import React from 'react';
import {connect} from 'react-redux'
import {handleSetAuthedUser} from '../../actions/authedUser';
import {Button, Menu, Avatar} from 'antd';
import {NavLink} from 'react-router-dom'
import './Nav.css'

const Nav = props => {
  const handleOnClick = () => {
    const {dispatch} = props
    dispatch(handleSetAuthedUser(null))
  }
  const {user} = props
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{lineHeight: '64px'}}>
      <Menu.Item key="1">
        <NavLink to='/' exact activeClassName='active'>
          Home
          </NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to='/add' activeClassName='active'>
          New Question
          </NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to='/leaderboard' activeClassName='active'>
          Leader Board
          </NavLink>
      </Menu.Item>
      <Menu.Item key="4" className="user-nav" disabled={true}>
        {user &&
          (<div>Hello, {user.name}
            <Avatar className="avatar-nav" size="small" src={user.avatarURL} />
            <Button onClick={handleOnClick} className="btn-logout-nav" ghost>Logout</Button>
          </div>)
        }
      </Menu.Item>
    </Menu>
  );
}

function mapStateToProps({authedUser, users}) {
  const user = users[authedUser]
  return {
    user
  }
}

export default connect(mapStateToProps)(Nav);