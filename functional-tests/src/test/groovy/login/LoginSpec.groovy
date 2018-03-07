import com.mongodb.MongoClient
import com.mongodb.DB
import com.mongodb.DBCollection
import com.mongodb.DBCursor
import com.mongodb.DBObject
import com.mongodb.BasicDBObject
import com.mongodb.WriteConcern

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
  static _host = "localhost"
  static _port = 27017
  static _database = "mem-dev-func"
  static MongoClient _mongoClient
  static _username = "username"
  static _password = "password"

  def setupSpec() {
    _mongoClient = _mongoClient ?: new MongoClient(_host, _port)
    DB db = _mongoClient.getDB(_database)
    DBCollection users = db.getCollection('users')

    BasicDBObject user = new BasicDBObject()
    user.put("username", _username)
    user.put("password", _password)
    users.insert(user, WriteConcern.SAFE)
  }

  def inspect(collectionName, collection) {
    println "collection: " + collectionName
    println "#" + collectionName + ": " + collection.count()

    DBCursor cursor = collection.find();

    println "---start " + collectionName + " collection ---"
    while( cursor.hasNext() ) {
       DBObject obj = cursor.next();
       println obj
    }
    println "---end " + collectionName + " colection---"

  }

  def cleanupSpec() {
    _mongoClient = _mongoClient ?: new MongoClient(_host, _port)
    DB db = _mongoClient.getDB(_database)
    DBCollection users = db.getCollection('users')

    DBCursor cursor = users.find();

    while( cursor.hasNext() ) {
      DBObject obj = cursor.next();
      users.remove(obj, WriteConcern.SAFE)
    }
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
    when: "and the user attempts to login with valid credentials"
      header_nav_bar_toggle.click()
      header_login_link.click()
    then: "the user is authenticated and provided access to the admin features."
      assert false
  }

  //Test footer login link
  def "Scenario 1B: Access login page through footer local link"() {
    given:
      "A user goes to the home page"
      to HomePage
    when: "and accesses the login page through the header"
      footer_login_link.click();
    then: "the user is redirected to the authentication page."
      at LoginPage
  }

  //Test authentication
  def "Scenario 2: Authenticate"() {
    given: "A user accesses the authentication page"
      to LoginPage
    when: "and the users enters and submits valid credentials"
      username.value( _username )
      password.value( _password )

      println authenticateButton
      authenticateButton.click()
    then: "the user is authenticated and redirected to the homepage"
      at HomePage
      footer_logout_link
  }

}
