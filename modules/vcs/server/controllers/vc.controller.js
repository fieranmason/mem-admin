'use strict';
// =========================================================================
//
// Controller for vcs
//
// =========================================================================
var path     = require('path');
var DBModel   = require (path.resolve('./modules/core/server/controllers/cc.dbmodel.controller'));
var _         = require ('lodash');

module.exports = DBModel.extend ({
	name : 'Vc',
	plural : 'vcs',
	getForProject: function (projectId) {
		return this.findMany ({project:projectId});
	},
});

