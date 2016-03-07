'use strict';

angular.module('core').config(configFunction);

configFunction.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

/* @ngInject */
function configFunction($locationProvider, $stateProvider, $urlRouterProvider) {

	$locationProvider.html5Mode(true);

	// Redirect to 404 when route not found
	$urlRouterProvider.otherwise(function ($injector, $location) {
		$injector.get('$state').transitionTo('not-found', null, {
			location: false
		});
	});

	$stateProvider
	.state('configuration', {
		url: '/configuration',
		template: '<tmpl-configuration></tmpl-configuration>',
		data: {
			roles: ['admin']
		}
	})
	.state('projects', {
		url: '/',
		template: '<tmpl-projects></tmpl-projects>'
	})
	.state('login', {
		url: '/login',
		template: '<tmpl-login></tmpl-login>'
	})
	.state('register', {
		url: '/register',
		template: '<tmpl-register></tmpl-register>'
	})
	.state('recover', {
		url: '/recover',
		template: '<tmpl-recover></tmpl-recover>'
	})
	// =========================================================================
	//
	// Old Project Routes
	//
	// =========================================================================
	.state('project', {
		url: '/project/:id',
		template: '<tmpl-project></tmpl-project>'
	})
	// =========================================================================
	//
	// New Project Routes
	//
	// =========================================================================
	// -------------------------------------------------------------------------
	//
	// the project abstract, this contains the menu and a ui-view for loading
	// child views. it also handles injecting the project
	//
	// -------------------------------------------------------------------------
	.state('p', {
		url: '/p/:projectId',
		abstract: true,
		templateUrl: 'modules/projects/client/views/project.abstract.html',
		resolve: {
			project: function ($stateParams, ProjectModel) {
				console.log ('project abstract resolving projectId');
				return ProjectModel.getModel ($stateParams.projectId);
			},
			eaoAdmin: function (project) {
				return project.adminRole;
			},
			proponentAdmin: function (project) {
				return project.proponentAdminRole;
			}
		},
		controller: function($scope, $stateParams, project) {
			console.log ("project abstract controller is running", project);
			$scope.project = project;
			console.log ('project = ', project);
		}
	})
	// -------------------------------------------------------------------------
	//
	// the detail view of a project
	//
	// -------------------------------------------------------------------------
	.state('p.detail', {
		url: '/detail',
		templateUrl: 'modules/projects/client/views/project-partials/project.detail.html',
		controller: function ($scope, $stateParams) {
			$scope.project = $scope.$parent.project;
		}
	})
	// -------------------------------------------------------------------------
	//
	// project description
	//
	// -------------------------------------------------------------------------
	.state('projectdescription', {
		url: '/projectdescription/:project',
		template: '<tmpl-project-description-edit></tmpl-project-description-edit>',
		data: {
			roles: ['admin', 'user']
		}
	})
	.state('comments', {
		url: '/comments/:project',
		template: '<tmpl-comment-period-list></tmpl-comment-period-list>',
		data: {
			roles: ['admin', 'user']
		}
	})
	.state('activity', {
		url: '/project/:project/activity/:activity',
		template: '<tmpl-activity></tmpl-activity>',
		data: {
			roles: ['admin', 'user']
		}
	})
	.state('activities', {
		url: '/activities',
		template: '<tmpl-user-activities></tmpl-user-activities>',
		data: {
			roles: ['admin', 'user']
		}
	});





	// Home state routing
	$stateProvider
	.state('not-found', {
		url: '/not-found',
		templateUrl: 'modules/core/client/views/404.client.view.html',
		data: {
			ignoreState: true
		}
	})
	.state('bad-request', {
		url: '/bad-request',
		templateUrl: 'modules/core/client/views/400.client.view.html',
		data: {
			ignoreState: true
		}
	})
	.state('forbidden', {
		url: '/forbidden',
		templateUrl: 'modules/core/client/views/403.client.view.html',
		data: {
			ignoreState: true
		}
	});

}











