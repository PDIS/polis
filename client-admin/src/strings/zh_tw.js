// Copyright (C) 2012-present, The Authors. This program is free software: you can redistribute it and/or  modify it under the terms of the GNU Affero General Public License, version 3, as published by the Free Software Foundation. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more details. You should have received a copy of the GNU Affero General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>.

var s = {}

// login/createuser strings
s.polis_err_param_parse_failed_email = '請輸入有效的電子信箱。'
s.polis_err_reg_bad_email = '請輸入有效的電子信箱。'
s.polis_err_param_parse_failed_password = '請輸入密碼。'
s.polis_err_login_unknown_user_or_password_noresults = '登錄失敗：用戶名或密碼錯誤。'
s.polis_err_login_unknown_user_or_password = '登錄失敗：用戶名或密碼錯誤。'
s.polis_err_reg_user_with_that_email_exists = '電子郵件已註冊，請嘗試登入。'
s.polis_err_reg_need_name = '請輸入您的名字'
s.polis_err_post_comment_duplicate = '發布錯誤：此評論已存在！'
s.waitinglist_add_success = '您已被添加到等待名單中！ 保持聯繫。'
s.polis_err_fetching_tweet = '提取推文時出錯。 預期是Twitter推文的URL。'
s.share_but_no_comments_warning = '此對話沒有評論。我們建議您在邀請參與者之前添加一些評論。這將幫助參與者開始。請轉到「配置」，然後點擊「種子評論」。'
s.share_but_no_visible_comments_warning = '這次對話沒有可見的評論。 我們建議您在邀請參與者之前添加一些評論（或調整現有的評論），因為這將有助於他們了解應提交的評論類型。'
s.no_permission = '您的帳戶無權查看此頁面。'

// signin strings
s.signin_text_title = '登入'
s.signin_input_email = '電子信箱'
s.signin_input_pwd = '密碼'
s.signin_btn_signin = '登入'
s.signin_btn_signin_pending = '登入中'
s.signin_text_forgot_pwd = '忘記密碼？'
s.signin_text_reset_pwd = '重設密碼'
s.signin_btn_fb = 'Facebook 登入'
s.signin_btn_join = '公共政策網路參與平臺登入'
s.signin_text_fb = '如果您使用「Facebook 登入」並且不是 pol.is 用戶，您將被註冊並同意 pol.is 條款和隱私政策。'

// home strings
s.home_title = 'Input Crowd, Output Meaning'
s.home_subtitle = 'Polis 是一個即時系統，通過先進的統計和機器學習功能，該系統可以收集、分析和理解群眾在文字中的含義。'
s.home_content = 'Polis 已被世界各地的政府、學者、獨立媒體和公民廣泛使用，並且是完全開源的。'
s.home_getstart = '開始使用'
s.home_getstart_content = '<Link href="/createuser">註冊</Link> 或 <Link href="/signin">登入</Link>'
s.home_read = '報導'
s.home_read_content = '來自各界的報導：\
<Link target="_blank" href="https://www.nytimes.com/2019/10/15/opinion/taiwan-digital-democracy.html">紐約時報</Link>、\
<Link target="_blank" href="https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/">麻省理工科技評論</Link>、\
<Link target="_blank" href="https://www.wired.co.uk/article/taiwan-democracy-social-media">連線雜誌</Link>、\
<Link target="_blank" href="https://www.economist.com/open-future/2019/03/22/technology-and-political-will-can-create-better-governance">經濟學人</Link>、\
<Link target="_blank" href="https://www.centreforpublicimpact.org/case-study/building-consensus-compromise-uber-taiwan/#evidence">公共影響力中心</Link>、\
<Link target="_blank" href="https://civichall.org/civicist/vtaiwan-democracy-frontier/">Civicist</Link>、\
<Link target="_blank" href="https://www.youtube.com/watch?v=VbCZvU7i7VY">BBC</Link>短片'
s.home_explore = '探索'
s.home_explore_content = '一起來探索<Link target="_blank" href="https://roamresearch.com/#/app/polis-methods/page/1GR4r4LX8">全面的知識庫</Link>！包括：'
s.home_explore_item_1 = '歡迎指南'
s.home_explore_item_2 = '快速開始'
s.home_explore_item_3 = '使用概述'
s.home_explore_item_4 = '常見問題'
s.home_explore_item_5 = '個案研究'
s.home_explore_item_6 = '演算法'
s.home_explore_item_7 = '審查機制最佳範例'
s.home_explore_item_8 = '媒體報導'
s.home_contribute = '貢獻'
s.home_contribute_content = '在 <Link target="_blank" href="https://github.com/pol-is/">Github</Link> 檢視原始碼並加入社群'

// createuser strings
s.signup_title = '註冊帳號'
s.signup_input_name = '名字'
s.signup_input_email = '電子信箱'
s.signup_input_pwd = '密碼'
s.signup_input_pwd2 = '密碼確認'
s.signup_agree = '我同意 <a href="https://pol.is/tos" tabIndex="110">pol.is 條款</a> 和 <a href="https://pol.is/privacy" tabIndex="111">隱私政策</a>。'
s.signup_btn_signup = '註冊帳號'
s.signup_btn_signup_pending = '帳號註冊中...'
s.signup_have_account = '已經有帳號了？'
s.signup_signin = '登入'
s.signup_signup_fb = 'Facebook 註冊'
s.signup_signup_join = '公共政策網路參與平臺註冊'
s.signup_fb = '如果您使用「Facebook 登入」並且不是 pol.is 用戶，您將被註冊並同意 pol.is 條款和隱私政策。'

s.signout_pending = '登出中' 

export default s
