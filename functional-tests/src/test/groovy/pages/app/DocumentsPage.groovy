package pages.app

import pages.app.BaseAppPage

class DocumentsPage extends BaseAppPage {
  static at = { $("#documents-header") }

  static content = {
    uploadFiles { $("#upload-files") }
    documentUploadHeader { $("#document-upload-modal-header") }
  }
}
