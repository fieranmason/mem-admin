package pages.app

import pages.app.BaseAppPage

class ProjectPage extends BaseAppPage {
  static at = { $("#project-details-header") }
  static url = "/p"
  static content = {
    projectName { $("#project-name")}
    documentsLink { $("#Documents")}
  }
}
