/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { changeDifficultyLevel } from './actions';
import {
  makeSelectDifficultyLevel,
  makeSelectDifficultyLevels,
} from './selectors';
import reducer from './reducer';

const key = 'home';

export function HomePage(props) {
  const { difficultyLevels, difficultyLevel } = props;

  function startTest() {
    props.history.push('/quiz');
  }

  useInjectReducer({ key, reducer });

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <h3 className="my-2">Welcome User!</h3>
          </Card.Header>
          <Card.Body>
            {/* <Card.Title>Please select the difficulty level</Card.Title> */}
            <Card.Text as="div" className="mb-3">
              <Row>
                <Col xs={6}>
                  <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Select difficulty level</Form.Label>
                    <Form.Control
                      as="select"
                      value={difficultyLevel}
                      className="text-capitalize"
                      onChange={props.onChangeDifficultyLevel}
                    >
                      {difficultyLevels.map(level => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Card.Text>
            <Button variant="primary" onClick={startTest}>
              Start Test
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

HomePage.propTypes = {
  difficultyLevel: PropTypes.string,
  difficultyLevels: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeDifficultyLevel: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  difficultyLevel: makeSelectDifficultyLevel(),
  difficultyLevels: makeSelectDifficultyLevels(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeDifficultyLevel: evt =>
      dispatch(changeDifficultyLevel(evt.target.value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(HomePage);
