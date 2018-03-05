
package pages.app

import geb.Page

class LoginPage extends Page {
  static at = { $('#login-title').text().startsWith('Login') }

  static url = ""

  static content = {
    header_login_link { $('#header-login-link') }
    footer_login_link { $('#footer-login-link') }
  }
}
