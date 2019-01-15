import {RECEIVE_QUESTIONS, ADD_QUESTION, ADD_QUESTION_ANSWER} from '../actions/questions'

const arrayToObject = (array, keyField) =>
  array.reduce((obj, item) => {
    obj[item[keyField]] = item
    return obj
  }, {})

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      }
    case ADD_QUESTION:
      const {question} = action
      return {
        ...state,
        [question.id]: question
      }
    case ADD_QUESTION_ANSWER:
      const {response} = action
      const newState = Object.values(state).map(question => {
        if (question.id === response.qid) {
          if (!question[response.answer].votes.includes(response.authedUser)) {
            question[response.answer].votes.push(response.authedUser)
          }
        }
        return question
      })
      return arrayToObject(newState, 'id')
    default:
      return state
  }
}