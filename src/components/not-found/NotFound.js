import React from 'react';
import {Link} from 'react-router-dom'
import {Button} from 'antd'
import './NotFound.css'

const NotFound = props => {
  return (
    <div className="section-not-found">
      <div className="not-found-links">
        <Link to="/" ><Button>Return to Home</Button></Link>
        <p>Or</p>
        <Link to="/signin" > <Button>Sign In again</Button></Link>
      </div>
    </div>
  );
}


export default NotFound;