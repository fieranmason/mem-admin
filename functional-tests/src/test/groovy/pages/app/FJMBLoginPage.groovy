package pages.app

import geb.Page

class LoginPage extends Page {
  static at = { $('#login-title').text().startsWith('Login') }

  static url = "/authentication/local/signin"

  static content = {
    username { $('#username') }
    password { $('#password') }
    authenticateButton { $('#login-button')}
  }
}
