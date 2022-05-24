import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';

function Result(props) {
  return (
    <Row>
      <Col>
        <Card className="text-center">
          <Card.Header>
            <h3>
              Great! Test completed!{' '}
              <FontAwesomeIcon className="text-info" icon={faSmile} />
            </h3>
          </Card.Header>
          <Card.Body>
            <Card.Text as="div" className="mb-3">
              <Row>
                <Col>
                  You scored {props.result} out of {props.noOfQuestions}
                </Col>
              </Row>
            </Card.Text>
            <Button onClick={props.retakeTest}>Retake Test</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

Result.propTypes = {
  result: PropTypes.number.isRequired,
  noOfQuestions: PropTypes.number.isRequired,
  retakeTest: PropTypes.func.isRequired,
};

export default Result;
