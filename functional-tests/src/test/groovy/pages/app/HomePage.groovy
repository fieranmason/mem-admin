
package pages.app

import geb.Page

class HomePage extends Page {
  static at = { newsAndAnnouncementsSectionHeader.text().startsWith("News & Announcements") }

  static url = ""

  static content = {
    newsAndAnnouncementsSectionHeader { $("#news-and-announcements-section-header") }
    header_login_link { $('#header-login-link') }
    footer_login_link { $('#footer-login-link') }
    header_nav_bar_toggle { $('#header-navbar-toggle') }
  }
}
