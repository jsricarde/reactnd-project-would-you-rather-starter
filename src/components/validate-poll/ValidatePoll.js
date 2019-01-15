import React, {Component, Fragment} from 'react';
import AnswerQuestion from '../answer-question/AnswerQuestion'
import ResultQuestion from '../result-question/ResultQuestion'

class ValidatePoll extends Component {
  render() {
    const {type} = this.props
    return (
      <Fragment>
        {type === 'answered' ? (<AnswerQuestion />) : (<ResultQuestion />)}
      </Fragment>
    );
  }
}

export default ValidatePoll;