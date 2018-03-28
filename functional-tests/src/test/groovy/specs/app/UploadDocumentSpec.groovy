package specs.app

import pages.app.AddEditProjectPage
import pages.app.ProjectPage
import pages.app.DocumentsPage

class UploadDocumentSpec extends LoggedInSpec {

  def projectName = "test project"
  def convertedProjectName = "test-project"

  def "Navigate to project page, upload project"() {
    given: "I creat a project and navigate to it"
      to AddEditProjectPage
      page.projectName.value(projectName)
      page.saveProject.click()

      to ProjectPage, convertedProjectName, "detail"
      at ProjectPage
    when: "I click on the #ClickLink"
      page.documentsLink.click()
      at DocumentsPage
      uploadFiles.click()
    then: "I arrive on the #AssertPage page"
      page.documentUploadHeader
  }
}
