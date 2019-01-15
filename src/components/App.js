import React, {Component, Fragment} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'
import {handleInitialData} from '../actions/shared'
import Home from './home/Home'
import Nav from './nav/Nav'
import NewQuestion from './new-question/NewQuestion'
import AnswerQuestion from './answer-question/AnswerQuestion'
import ResultQuestion from './result-question/ResultQuestion'
import SingIn from './signin/SingIn'
import NotFound from './not-found/NotFound'
import LeaderBoard from './leader-board/LeaderBoard'
import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <Nav />
          {this.props.loading === true
            ? <div><SingIn /></div>
            : <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/questions/:id/answered' component={ResultQuestion} />
                <Route path='/questions/:id/unanswered' component={AnswerQuestion} />
                <Route path='/add' component={NewQuestion} />
                <Route path='/leaderboard' component={LeaderBoard} />
                <Route path='/singin' component={SingIn} />
                <Route component={NotFound} />
            </Switch>}
        </Fragment>
      </Router>
    );
  }
}
function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}
export default connect(mapStateToProps)(App);
