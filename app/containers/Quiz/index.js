import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Loader from 'components/Loader';
import SanitizeHtml from 'components/SanitizeHtml';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { decode } from 'html-entities';
import {
  fetchQuizQuestions,
  setAnswerStatus,
  moveToNextQuestion,
  computeResults,
  resetAll,
} from './actions';
import {
  makeSelectQuestions,
  makeSelectCurrentQuestion,
  makeSelectResult,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import Result from './Result';

const key = 'quiz';
const ANSWER_TIME = 10; // IN SECONDS
let timeoutRef;

export function Quiz(props) {
  const { questions, currentQuestion, result } = props;
  const noOfQuestions = questions.length;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [remainingTime, setRemainingTime] = useState(ANSWER_TIME);

  useEffect(() => {
    props.fetchQuizQuestions();

    return props.resetAll;
  }, []);

  function initiateTimer(counter = ANSWER_TIME) {
    setRemainingTime(counter);

    timeoutRef = setTimeout(() => {
      if (counter > 0) {
        initiateTimer(counter - 1);
      } else if (currentQuestion < noOfQuestions) {
        props.moveToNextQuestion();
      } else if (currentQuestion === noOfQuestions) {
        props.computeResults();
      }
    }, 1000);
  }

  function cleanTimer() {
    if (timeoutRef) clearTimeout(timeoutRef);
  }

  useEffect(() => {
    if (noOfQuestions) initiateTimer();

    return cleanTimer;
  }, [noOfQuestions]);

  useEffect(() => {
    if (currentQuestion <= noOfQuestions) {
      initiateTimer();
    }

    return cleanTimer;
  }, [currentQuestion]);

  function onAnswerQuestion(question, answer) {
    const isCorrectAnswer = question.correct_answer === answer;
    props.setAnswerStatus(question.id, isCorrectAnswer);
  }

  function goToNextQuestion() {
    cleanTimer();
    props.moveToNextQuestion();
  }

  function onRetakeTest() {
    props.resetAll();
  }

  function viewResults() {
    cleanTimer();
    props.computeResults();
  }

  const question = questions && questions[currentQuestion - 1];
  const isAnswered =
    question &&
    Object.prototype.hasOwnProperty.call(question, 'isCorrectlyAnswered');
  const isQuizOver = currentQuestion === noOfQuestions && result !== null;

  if (!noOfQuestions) return <Loader />;

  if (!isQuizOver && question) {
    return (
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row>
                <Col>
                  Question {currentQuestion} of {questions.length}
                </Col>
                <Col className="text-end">
                  Remaining Time: <span>{remainingTime} second(s)</span>
                </Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <Card.Text as="div" className="mb-3">
                <Row>
                  <Col>
                    <Form.Group controlId="exampleForm.ControlSelect2">
                      <Form.Label>
                        <SanitizeHtml html={question.question} />
                      </Form.Label>
                      {question.answers.map(({ id, value }) => {
                        const decodedValue = decode(value);
                        return (
                          <Form.Check
                            key={id}
                            type="radio"
                            disabled={isAnswered}
                            id={`answer-${id}`}
                            name={`question-${question.id}`}
                            label={decodedValue}
                            value={decodedValue}
                            onChange={event =>
                              onAnswerQuestion(question, event.target.value)
                            }
                          />
                        );
                      })}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
            {isAnswered && (
              <Card.Footer>
                {question.isCorrectlyAnswered ? (
                  <div>
                    <FontAwesomeIcon
                      className="text-success"
                      icon={faCheckCircle}
                    />{' '}
                    Correct Answer
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon
                      className="text-danger"
                      icon={faCheckCircle}
                    />{' '}
                    Wrong Answer
                    <br />
                    <br />
                    <strong>Correct Answer:</strong>{' '}
                    <SanitizeHtml html={question.correct_answer} />
                  </div>
                )}
                {currentQuestion < noOfQuestions && (
                  <>
                    <br />
                    <Button variant="primary" onClick={goToNextQuestion}>
                      Next Question
                    </Button>
                  </>
                )}
                {currentQuestion === noOfQuestions && isAnswered && (
                  <>
                    <br />
                    <Button variant="primary" onClick={viewResults}>
                      View Results
                    </Button>
                  </>
                )}
              </Card.Footer>
            )}
          </Card>
        </Col>
      </Row>
    );
  }

  return (
    result !== null && (
      <Result
        result={result}
        noOfQuestions={noOfQuestions}
        retakeTest={onRetakeTest}
      />
    )
  );
}

Quiz.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  result: PropTypes.number,
  fetchQuizQuestions: PropTypes.func.isRequired,
  setAnswerStatus: PropTypes.func.isRequired,
  moveToNextQuestion: PropTypes.func.isRequired,
  computeResults: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  questions: makeSelectQuestions(),
  currentQuestion: makeSelectCurrentQuestion(),
  result: makeSelectResult(),
});

export function mapDispatchToProps(dispatch) {
  return {
    fetchQuizQuestions: () => dispatch(fetchQuizQuestions()),
    setAnswerStatus: (questionNo, isCorrectlyAnswered) =>
      dispatch(setAnswerStatus(questionNo, isCorrectlyAnswered)),
    moveToNextQuestion: () => dispatch(moveToNextQuestion()),
    computeResults: () => dispatch(computeResults()),
    resetAll: () => dispatch(resetAll()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Quiz);
