import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './index.css';

function Loader() {
  return (
    <Row>
      <Col className="text-center">
        <div className="wrapper">
          <div>
            <div className="loader" />
            <br />
            Loading...
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Loader;
