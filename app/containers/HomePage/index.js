/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

// Steps 1: Overview of constants, action, selctors at 21:54 https://www.youtube.com/watch?v=ti8I6zQu8TM
// Steps 2: 29:17, every time the a keystroke is recognized or a submit is detected,
// dispatch the respective action and return the object,
// reducer will will get the state change and update the state accordingly
// Question: how do you debug when something is so built out like this?

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectSuccessCode,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
// import AtPrefix from './AtPrefix'; //DELETE
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos, pushString } from '../App/actions';
import { changeUsername, changeInput } from './actions';
import { makeSelectInput, makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

// Step 6a: update function inputs so it can consume the state
export function HomePage({
  username,
  input,
  loading,
  error,
  repos,
  successCode,
  onSubmitForm,
  onChangeUsername,
  onChangeInput,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    // When initial state username is not null, submit the form to load repos
    if (username && username.trim().length > 0) onSubmitForm();
  }, []);

  const reposListProps = {
    loading,
    error,
    repos,
  };

  // Step 6b: update success code prop with the new success state
  const successCodeProps = {
    loading,
    error,
    successCode,
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <CenteredSection>
          {/* DELETE: Probably don't need */}
          {/* <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p> */}
          <H2>
            <FormattedMessage {...messages.formInstructions} />
          </H2>
          <Form onSubmit={onSubmitForm}>
            <label htmlFor="username">
              {/* DELETE: Probably don't need the prefix part */}
              {/* <FormattedMessage {...messages.trymeMessage} />
              <AtPrefix>
                <FormattedMessage {...messages.trymeAtPrefix} />
              </AtPrefix> */}
              <Input
                id="username"
                type="text"
                placeholder="input your string here"
                value={username}
                onChange={onChangeUsername}
              />
            </label>
            {/* Step7: consume the state in your function return */}
            <label htmlFor="input">
              <Input
                id="input"
                type="text"
                placeholder="input your string here"
                value={input}
                onChange={onChangeInput}
              />
            </label>
          </Form>
        </CenteredSection>
        <Section>
          <ReposList {...reposListProps} />
          {/* <ReposList {...successCodeProps} /> */}
          {/* FIXME & START HERE: line 128 is broken. Yay we know where the error is!!! */}
        </Section>
      </div>
    </article>
  );
}

// Notes: Validators
// Step 4: add props
HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // Question: why use oneOfType instead of saying PropTypes directly?
  successCode: PropTypes.string,
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  input: PropTypes.string,
  onChangeUsername: PropTypes.func,
  onChangeInput: PropTypes.func,
};

// Step 5: update makeStateToProps
// Note: Getting the state so it can be used on this page.
const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  successCode: makeSelectSuccessCode(),
  username: makeSelectUsername(),
  input: makeSelectInput(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Step 7: update dispatch calls
export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onChangeInput: evt => dispatch(changeInput(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
      dispatch(pushString());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// Question: What does compose do in redux?
export default compose(
  withConnect,
  memo,
)(HomePage);
