/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Quiz from 'containers/Quiz/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Container from 'react-bootstrap/Container';
import TopNavBar from 'components/TopNavBar';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <>
      <TopNavBar />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/quiz" component={Quiz} />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </Container>
    </>
  );
}
