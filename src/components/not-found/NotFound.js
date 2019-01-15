import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import './NotFound.css'

class NotFound extends Component {
  render() {
    return (
      <div className="section-not-found">
        <div className="not-found-links">
          <Link to="/" ><Button>Return to Home</Button></Link>
          <p>Or</p>
          <Link to="/singin" > <Button>Sign In again</Button></Link>
        </div>
      </div>
    );
  }
}

export default NotFound;