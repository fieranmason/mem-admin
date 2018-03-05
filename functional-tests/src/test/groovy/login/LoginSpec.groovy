import geb.spock.GebReportingSpec
import spock.lang.Narrative
import spock.lang.Title
import spock.lang.Unroll
import spock.lang.Ignore

import pages.app.HomePage
import pages.app.LoginPage

@Narrative('''In order to access administration features,
      I need to authenticate in order to demonstrate authorization.''')
@Title('Feature: Authentication')

class LoginSpec extends GebReportingSpec {

  def setupSpec() {
    //no spec setup
  }

  def cleanupSpec() {
    //no spec cleanup
  }

  def setup() {
    //no fixture setup
  }

  def cleanup() {
    //no fixture cleanup
  }

  //Test header login link
  @Unroll
  @Ignore //dont' know how to do site minder headers yet
  def "Scenario 1A: A user tries to access the login page through the header"() {
    given:
      "A user goes to the home page"
      to HomePage
      waitFor { at(HomePage) }
    when: "and the user attempts to login with valid credentials"
      header_nav_bar_toggle.click()
      header_login_link.click()
    then: "the user is authenticated and provided access to the admin features."
      assert false
  }

  //Test header login link
  @Unroll
  def "Scenario 1B: Access login page through footer link"() {
    given:
      "A user goes to the home page"
      to HomePage
      waitFor { at(HomePage) }
    when: "and accesses the login page through the header"
      footer_login_link.click();
    then: "the user is authenticated and provided access to the admin features."
      assert at(LoginPage)
  }

  //Test authentication
  def "Scenario 2: Authenticate"() {
    assert false
  }

}
