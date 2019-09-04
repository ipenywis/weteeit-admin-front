import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PageContainer from 'components/pageContainer';
import { FormGroup } from 'components/formGroup';
import { InputGroup } from 'components/inputGroup';
import FinalFormSpy from 'finalFormSpy';
import { Button, Intent } from '@blueprintjs/core';
import { Form } from 'components/form';
import { theme } from 'styles/styled-components';
import { FormRenderProps } from 'react-final-form';
import { Checkbox } from 'components/checkbox';
import { createSelector } from 'reselect';
import { Dispatch } from 'redux';
import { makeSelectLoginError } from './selectors';
import { setLoginError, clearLoginErrors } from './actions';
import { AppToaster } from 'components/toaster';
import { ROUTES } from 'routes';
import { Link } from 'components/link';
import axios from 'axios';
import { makeSelectApiUrl } from 'containers/App/selectors';
import { FormState } from 'final-form';
import { authenticated } from 'containers/App/actions';
import { withRouter } from 'react-router';
import { IWithRouter } from 'types/router';
import * as cookies from 'js-cookie';
import { AUTH_COOKIE_KEY } from 'common';

interface ILoginDispatchProps {
  setLoginError: (error: string) => void;
  clearLoginErrors: () => void;
  authenticated: () => void;
}

export interface ILoginProps extends ILoginDispatchProps, IWithRouter {
  error: string;
  apiUrl: string;
  loginForm: FormState;
}

const CustomPageContainer = styled(PageContainer)`
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  min-width: 21em;
  min-height: 32em;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 15px 2px rgba(15, 15, 15, 0.2);
  border-radius: 4px;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  height: 100%;
  display: flex;
  flex: 3;
  justify-content: center;
`;

const FormHeader = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 2em;
  justify-content: center;
  align-items: center;
`;

const FormTitle = styled.div`
  font-size: 22px;
  color: ${theme.default.darkText};
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  align-items: center;
`;

const FormFooter = styled.div`
  display: flex;
  flex: 0;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  font-size: 14px;
`;

class LoginPage extends React.Component<ILoginProps> {
  private validate(values: any): Object {
    const errors: any = {};
    if (!values.username || (values.username && values.username.trim() === ''))
      errors.username = 'Username is Required!';
    if (!values.password || (values.password && values.password.trim() === ''))
      errors.password = 'Password is Required!';

    return errors;
  }

  private login(values: any): Promise<any> {
    console.log('Login in...');
    return new Promise(async (rs, rj) => {
      const { apiUrl } = this.props;
      const username = values.username;
      const password = values.password;
      const response = await axios
        .post<{ jwtToken: string }>(apiUrl + '/admin/login', {
          username,
          password,
        })
        .catch(err => {
          this.props.setLoginError('Username or Password is incorret');
          rj();
        });
      if (!response) {
        return rj();
      }

      AppToaster.show({
        message: `Welcome Back ${username}`,
        intent: Intent.SUCCESS,
      });

      //Save token for 7days if staySignedIn
      const expiresIn = values.staySignedIn ? 7 : undefined;
      this.saveTokenInSession(response.data.jwtToken, expiresIn);
      //Authenticate
      this.authenticate();
      //Redirect to dashboard
      this.redirectToDashboard();
      //Resolve
      rs();
    });
  }

  /**
   * save JWT Token in session cookie
   * where `expiresIn` Number of days
   * @param expiresIn
   */
  private saveTokenInSession(token: string, expiresIn?: number) {
    cookies.set(AUTH_COOKIE_KEY, 'JWT ' + token, { expires: expiresIn });
  }

  private authenticate() {
    this.props.authenticated();
  }

  private redirectToDashboard() {
    this.props.history.push(ROUTES.dashboard);
  }

  render() {
    const { error } = this.props;

    //Show errors if any
    if (error) AppToaster.show({ message: error, intent: Intent.DANGER });

    return (
      <CustomPageContainer>
        <LoginContainer>
          <StyledForm
            onSubmit={this.login.bind(this)}
            validate={this.validate.bind(this)}
          >
            {({
              handleSubmit,
              form,
              submitting,
              pristine,
              hasValidationErrors,
            }: FormRenderProps) => (
              <InnerContainer>
                <FormHeader>
                  <FormTitle>Login</FormTitle>
                  {/*<ErrorCallout show={error !== null}>{error}</ErrorCallout>*/}
                </FormHeader>
                <FinalFormSpy form="loginForm" />
                <FormContainer>
                  <FormGroup label="Username" name="username">
                    <InputGroup
                      name="username"
                      placeholder="Username"
                      leftIcon="user"
                      disabled={submitting}
                    />
                  </FormGroup>
                  <FormGroup label="Password" name="password">
                    <InputGroup
                      name="password"
                      type="password"
                      placeholder="Password"
                      leftIcon="lock"
                      disabled={submitting}
                    />
                  </FormGroup>
                  <Checkbox
                    label="Keep me signed in"
                    name="staySignedIn"
                    disabled={submitting}
                  />
                  <StyledLink to={ROUTES.resetPassword}>
                    Forgot Password?
                  </StyledLink>
                </FormContainer>
                <FormFooter>
                  <Button
                    type="submit"
                    icon="log-in"
                    intent={Intent.PRIMARY}
                    disabled={hasValidationErrors || pristine || submitting}
                    loading={submitting}
                    onClick={() => {
                      handleSubmit();
                      form.reset();
                    }}
                  >
                    Login
                  </Button>
                </FormFooter>
              </InnerContainer>
            )}
          </StyledForm>
        </LoginContainer>
      </CustomPageContainer>
    );
  }
}

const mapStateToProps = createSelector(
  makeSelectLoginError(),
  makeSelectApiUrl(),
  (error, apiUrl) => ({ error, apiUrl }),
);

const mapDispatchToProps = (dispatch: Dispatch): ILoginDispatchProps => ({
  setLoginError: (error: string) => dispatch(setLoginError(error)),
  clearLoginErrors: () => dispatch(clearLoginErrors()),
  authenticated: () => dispatch(authenticated()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginPage as any) as any);
