import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Quiz from 'images/quiz.png';
import { Link } from 'react-router-dom';

function TopNavBar() {
  return (
    <>
      <Navbar bg="primary" variant="light" sticky="top" className="px-5 mb-5">
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src={Quiz}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          Quiz
        </Navbar.Brand>
      </Navbar>
    </>
  );
}

export default TopNavBar;
