// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.
/** @jsx jsx */

import React from 'react'
import { connect } from 'react-redux'
import { doCreateUser, doFacebookSignin } from '../../actions'
import { Heading, Box, Text, Button, jsx } from 'theme-ui'

import { Link } from 'react-router-dom'
import StaticLayout from './lander-layout'
import strings from '../../strings/strings'
import JsxParser from 'react-jsx-parser'

@connect(state => state.signin)
class Createuser extends React.Component {
  getDest() {
    return this.props.location.pathname.slice('/createuser'.length)
  }

  handleLoginClicked(e) {
    e.preventDefault()
    const attrs = {
      hname: this.hname.value,
      email: this.email.value,
      password: this.password.value,
      gatekeeperTosPrivacy: true
    }

    var dest = this.getDest()
    if (!dest.length) {
      dest = '/'
    }
    this.props.dispatch(doCreateUser(attrs, dest))
  }

  facebookButtonClicked() {
    var dest = this.getDest()
    if (!dest.length) {
      dest = '/'
    }
    this.props.dispatch(doFacebookSignin(dest))
  }

  joinButtonClicked() {
    this.props.dispatch(() => {
      window.location.href = 'https://join.gov.tw/portal/api/auth/login?redirect_uri=https%3A%2F%2Fpolis.pdis.dev%2Fsignin-join';
    });
  }

  handleFacebookPasswordSubmit() {
    var dest = this.getDest()
    if (!dest.length) {
      dest = '/'
    }
    const optionalPassword = this.facebook_password.value
    this.props.dispatch(doFacebookSignin(dest, optionalPassword))
  }

  maybeErrorMessage() {
    let markup = ''
    if (this.props.error) {
      markup = <div>{strings(this.props.error.responseText)}</div>
    }
    return markup
  }

  drawForm() {
    return (
      <Box>
        <form sx={{ mb: [4] }}>
          <Box sx={{ my: [2] }}>
            <input
              sx={{
                fontFamily: 'body',
                fontSize: [2],
                width: '35em',
                borderRadius: 2,
                padding: [2],
                border: '1px solid',
                borderColor: 'mediumGray'
              }}
              id="createUserNameInput"
              ref={c => (this.hname = c)}
              placeholder={strings('signup_input_name')}
              type="text"
            />
          </Box>
          <Box sx={{ my: [2] }}>
            <input
              sx={{
                fontFamily: 'body',
                fontSize: [2],
                width: '35em',
                borderRadius: 2,
                padding: [2],
                border: '1px solid',
                borderColor: 'mediumGray'
              }}
              id="createUserEmailInput"
              ref={c => (this.email = c)}
              placeholder={strings('signup_input_email')}
              type="email"
            />
          </Box>
          <Box sx={{ my: [2] }}>
            <input
              sx={{
                fontFamily: 'body',
                fontSize: [2],
                width: '35em',
                borderRadius: 2,
                padding: [2],
                border: '1px solid',
                borderColor: 'mediumGray'
              }}
              id="createUserPasswordInput"
              ref={c => (this.password = c)}
              placeholder={strings('signup_input_pwd')}
              type="password"
            />
          </Box>
          <Box sx={{ my: [2] }}>
            <input
              sx={{
                fontFamily: 'body',
                fontSize: [2],
                width: '35em',
                borderRadius: 2,
                padding: [2],
                border: '1px solid',
                borderColor: 'mediumGray'
              }}
              id="createUserPasswordRepeatInput"
              ref={c => (this.password2 = c)}
              placeholder={strings('signup_input_pwd2')}
              type="password"
            />
          </Box>
          {this.maybeErrorMessage()}

          <Box>
            <JsxParser components={{ Link }} jsx={strings('signup_agree')}/>
          </Box>
          <Button
            sx={{ my: [2] }}
            id="createUserButton"
            onClick={this.handleLoginClicked.bind(this)}>
            {this.props.pending ? strings('signup_btn_signup_pending') : strings('signup_btn_signup')}
          </Button>
        </form>
        <Box sx={{ mb: [4] }}>
          {strings('signup_have_account')}{' '}
          <Link
            tabIndex="6"
            to={'/signin' + this.getDest()}
            data-section="signup-select">
            {strings('signup_signin')}
          </Link>
        </Box>

        <Button
          sx={{ my: [2] }}
          id="signupFacebookButton"
          onClick={this.facebookButtonClicked.bind(this)}>
          {strings('signup_signup_fb')}
        </Button>
        {' '}
        <Button
          id="joinSigninButton"
          onClick={this.joinButtonClicked.bind(this)}
          style={{ background: "goldenrod" }}>
          {strings('signup_signup_join')}
        </Button>

        <Text>
          {strings('signup_fb')}
        </Text>
      </Box>
    )
  }

  drawPasswordConnectFacebookForm() {
    return (
      <Box>
        <Text>
          A pol.is user already exists with the email address associated with
          this Facebook account.
        </Text>
        <Text>
          {' '}
          Please enter the password to your pol.is account to enable Facebook
          login.
        </Text>
        <input
          ref={c => (this.facebook_password = c)}
          placeholder="polis password"
          type="password"
        />
        <Button onClick={this.handleFacebookPasswordSubmit.bind(this)}>
          {'Connect Facebook Account'}
        </Button>
      </Box>
    )
  }

  render() {
    return (
      <StaticLayout>
        <div>
          <Heading as="h1" sx={{ my: [4, null, 5], fontSize: [6, null, 7] }}>
            {strings('signup_title')}
          </Heading>
          {this.props.facebookError !== 'polis_err_user_with_this_email_exists'
            ? this.drawForm()
            : this.drawPasswordConnectFacebookForm()}
        </div>
      </StaticLayout>
    )
  }
}

export default Createuser
