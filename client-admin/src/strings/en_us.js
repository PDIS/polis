// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

var s = {}

// login/createuser strings
s.polis_err_param_parse_failed_email = 'Please enter a valid email address.'
s.polis_err_reg_bad_email = 'Please enter a valid email address.'
s.polis_err_param_parse_failed_password = 'Please enter a valid password.'
s.polis_err_login_unknown_user_or_password_noresults =
  'Login failed: invalid username/password combination.'
s.polis_err_login_unknown_user_or_password =
  'Login failed: invalid username/password combination.'
s.polis_err_reg_user_with_that_email_exists =
  'Email address already in use, Try logging in instead.'
s.polis_err_reg_need_name = 'Please include your name.'

s.polis_err_post_comment_duplicate =
  'Error posting: This comment already exists!'
s.waitinglist_add_success =
  "You've been added to the waiting list! We'll be in touch."

s.polis_err_fetching_tweet =
  'Error fetching tweet. Expected a URL to a twitter tweet.'

s.share_but_no_comments_warning =
  "This conversation has no comments. We recommend you add a few comments before inviting participants. This will help participants get started. Go to 'Configure' and then 'Seed Comments'."
s.share_but_no_visible_comments_warning =
  'This conversation has no visible comments. We recommend you add a few comments (or moderate the comments that exist) before inviting participants, since this will help them understand what kind of comments they should submit.'

s.no_permission =
  'Your account does not have the permissions to view this page.'

// signin strings
s.signin_text_title = 'Sign In'
s.signin_input_email = 'email'
s.signin_input_pwd = 'password'
s.signin_btn_signin = 'Sign In'
s.signin_btn_signin_pending = 'Signing in...'
s.signin_text_forgot_pwd = 'Forgot your password?'
s.signin_text_reset_pwd = 'Reset Password'
s.signin_btn_fb = 'Sign in with Facebook'
s.signin_btn_join = 'Sign in with Join.gov.tw'
s.signin_text_fb = 'If you click &apos;Sign in with Facebook&apos; and are not a pol.is user, you will be registered and you agree to the pol.is terms and privacy policy'

// home strings
s.home_title = 'Input Crowd, Output Meaning'
s.home_subtitle = 'Polis is a real-time system for gathering, analyzing and understanding what large groups of people think in their own words, enabled by advanced statistics and machine learning.'
s.home_content = 'Polis has been used all over the world by governments, academics, independent media and citizens, and is completely open source.'
s.home_getstart = 'Get Started'
s.home_getstart_content = '<Link href="/createuser">Sign up</Link> or <Link href="/signin">Sign in</Link>'
s.home_read = 'Read'
s.home_read_content = 'Press coverage from \
<Link target="_blank" href="https://www.nytimes.com/2019/10/15/opinion/taiwan-digital-democracy.html">The New York Times</Link>, \
<Link target="_blank" href="https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/">MIT Tech Review</Link>, \
<Link target="_blank" href="https://www.wired.co.uk/article/taiwan-democracy-social-media">Wired</Link>, \
<Link target="_blank" href="https://www.economist.com/open-future/2019/03/22/technology-and-political-will-can-create-better-governance">The Economist</Link>, \
<Link target="_blank" href="https://www.centreforpublicimpact.org/case-study/building-consensus-compromise-uber-taiwan/#evidence">Center for Public Impact</Link>, \
<Link target="_blank" href="https://civichall.org/civicist/vtaiwan-democracy-frontier/">Civicist</Link>, \
and a mini documentary from <Link target="_blank" href="https://www.youtube.com/watch?v=VbCZvU7i7VY">BBC</Link>'
s.home_explore = 'Explore'
s.home_explore_content = 'Onboard with a <Link target="_blank" href="https://roamresearch.com/#/app/polis-methods/page/1GR4r4LX8">comprehensive knowledge base</Link> including'
s.home_explore_item_1 = 'Welcome Guide'
s.home_explore_item_2 = 'Quickstart'
s.home_explore_item_3 = 'Usage Overview'
s.home_explore_item_4 = 'FAQ'
s.home_explore_item_5 = 'Case Studies'
s.home_explore_item_6 = 'Algorithms'
s.home_explore_item_7 = 'Best Practices for Moderation'
s.home_explore_item_8 = 'Press'
s.home_contribute = 'Contribute'
s.home_contribute_content = 'Explore the code and join the community <Link target="_blank" href="https://github.com/pol-is/">on Github</Link>'

// createuser strings
s.signup_title = 'Create Account'
s.signup_input_name = 'name'
s.signup_input_email = 'email'
s.signup_input_pwd = 'password'
s.signup_input_pwd2 = 'repeat password'
s.signup_agree = 'I agree to the <a href="https://pol.is/tos" tabIndex="110">pol.is terms</a> and <a href="https://pol.is/privacy" tabIndex="111">privacy agreement</a>.'
s.signup_btn_signup = 'Create Account'
s.signup_btn_signup_pending = 'Creating Account...'
s.signup_have_account = 'Already have an account?'
s.signup_signin = 'Sign in'
s.signup_signup_fb = 'Sign up with Facebook'
s.signup_signup_join = 'Sign up with Join.gov.tw'
s.signup_fb = 'If you click &apos;Sign in with Facebook&apos; and are not a pol.is user, you will be registered and you agree to the pol.is terms and privacy policy'

s.signout_pending = 'Signing Out' 

export default s
