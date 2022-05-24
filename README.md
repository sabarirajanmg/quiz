# Quiz App

A simple computer science quiz React application.

## Github Pages Hosted Link
https://sabarirajanmg.github.io/


## Installation

```bash
yarn install
```

## Run Dev Server
```bash
yarn start
```

Visit `http://localhost:3000` to see the app

## Tools used
* React, Redux
* Redux Saga, Reselect, immer
* React Bootstrap
* html-entities for decoding HTML to display HTML encoded answers

## Requirements:
* The quiz will have 10 questions and its respective options and for each question the user will be given
10 seconds. Once the time is over the user will be directed to next question.
* At the beginning of the Quiz, user should also be given the option to select difficulty level of the
questions. (user should be given three options ‘EASY’, ’MEDIUM’, ’DIFFICULT’). All the questions then
should be of selected level.
* If the user clicks on one of the options, the user should be shown whether the answer was correct
or wrong.
* If the answer is wrong then the correct answer should also be displayed, so that the user knows
which answer is correct.
* At the end of the Quiz user should be shown the total score and the option to start the quiz again.

## Questions List:-
You have to get the Questions list from the https://opentdb.com/ open source API. You can manually configure
the API from API helper.