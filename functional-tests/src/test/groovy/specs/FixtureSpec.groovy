package pages.specs

import geb.spock.GebReportingSpec
import groovy.json.JsonSlurper
import groovy.io.FileType
import com.mongodb.util.JSON

import com.mongodb.MongoClient
import com.mongodb.DB
import com.mongodb.BasicDBObject
import com.mongodb.DBCollection
import com.mongodb.WriteConcern

abstract class FixtureSpec extends GebReportingSpec {

  private static final String FIXTURES = "fixtures";
  static _host = "localhost"
  static _port = 27017
  static _database = "mem-dev-func"
  static MongoClient _mongoClient
  static fixture_files = []

  protected setupFixtures () {
    println("FixtureSpec setupSpec")
    _mongoClient = _mongoClient ?: new MongoClient(_host, _port)
    DB db = _mongoClient.getDB(_database)

    String cwd = System.getProperty("user.dir");
    String fixtures_full_path = [cwd, FIXTURES].join('/')
    def fixtures_dir = new File(fixtures_full_path)

    def files = []
    fixtures_dir.eachFileRecurse (FileType.FILES) {
      file -> files << file
              println("file: " + fixture_files)
    }

    println("fixture_files: " + fixture_files)

    def fixtures = []
    files.each {
      file -> if(file.name.endsWith('.json') && //its a json file and ...
                  ( fixture_files.contains(file.name) || fixture_files.contains(file.name.split("\\.")[0] ) ) ) {//the file name is included in the fixture list with or without the json extension
                fixtures << file
              }
    }

    def jsonSlurper = new JsonSlurper()

    fixtures.each {
      file -> println("fixture: ${file}")
      def inputJson = jsonSlurper.parseText(file.text)

      def fixtureObjects = []
      inputJson.each{
        collection -> println collection
        def collectionName = collection.collection
        def collectionObjects = collection.objects
        println collectionName
        println collectionObjects
        collectionObjects.each {
          object -> println "object: " + object
          DBCollection dbCollection = db.getCollection(collectionName)
          def keySet = object.keySet()
          println "keyset: " + keySet
          BasicDBObject basicObject = new BasicDBObject()
          keySet.each {
            key -> basicObject.put(key, object[key])
          }

          print "inserting basic object: " + basicObject
          dbCollection.insert(basicObject, WriteConcern.SAFE)
        }
      }
    }
  }
}
