'use strict';

angular.module('documents').service('DocumentMgrService', documentMgrService);
documentMgrService.$inject = ['$http'];
/* @ngInject */
function documentMgrService($http) {

	// PUT /api/project/:project/directory/add/:foldername/:parentid'

	var addDirectory = function(project, parentDir, newdirname) {
		return $http({method:'PUT', url: '/api/project/' + project._id + '/directory/add/' + newdirname + '/' + parentDir.model.id, data: {}});
	};

	// PUT /api/project/:project/directory/rename/:folderid/:newname')

	var renameDirectory = function(project, dir, newname) {
		return $http({method:'PUT', url: '/api/project/' + project._id + '/directory/rename/' + dir.model.id + '/' + newname, data: {}});
	};

	// PUT /api/project/:project/directory/remove/:folderid

	var removeDirectory = function(project, dir) {
		return $http({method:'PUT', url: '/api/project/' + project._id + '/directory/remove/' + dir.model.id, data: {}});
	};

	// PUT /api/project/:project/directory/move/:folderid/:newparentid

	var moveDirectory = function(project, sourceDir, destDir) {
		return $http({method:'PUT', url: '/api/project/' + project._id + '/directory/move/' + sourceDir.model.id + '/' + destDir.model.id, data: {}});
	};

	return {
		addDirectory: addDirectory,
		renameDirectory: renameDirectory,
		removeDirectory: removeDirectory,
		moveDirectory: moveDirectory
	};
}
