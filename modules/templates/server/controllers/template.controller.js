'use strict';
// =========================================================================
//
// Controller for templates
//
// =========================================================================
var path     = require('path');
var DBModel   = require (path.resolve('./modules/core/server/controllers/core.dbmodel.controller'));
var _         = require ('lodash');

module.exports = DBModel.extend ({
	name : 'Template',
	plural : 'templates',
	preProcessAdd: function (model) {
		model.versionNumber++;
		return model;
	},
	preProcessUpdate: function (model) {
		model.versionNumber++;
		return model;
	},
	getCurrentType: function (documentType) {
		var self = this;
		return new Promise (function (resolve, reject) {
			self.findFirst ({documentType:documentType},null,{versionNumber:-1})
			.then (function (docs) {
				if (docs[0]) return docs[0];
				else return {};
			})
			.then (resolve, reject);
		});
	},
	newSection : function () {
		var self = this;
		return new Promise (function (resolve, reject) {
			var doc = new self.model ();
			var section = doc.sections.create ();
			resolve (section);
		});
	},
	newMeta : function () {
		var self = this;
		return new Promise (function (resolve, reject) {
			self.newSection().then (function (section) {
				var meta = section.meta.create ();
				resolve (meta);
			});
		});
	},
	currentTemplates: function () {
		var self = this;
		return new Promise (function (resolve, reject) {
			self.model.aggregate ([
			    { "$sort": { "versionNumber": -1 } },
			    { "$group": {
			        "_id": "$documentType",
			        "id": {"$first": "$_id"},
			        "documentTyp": {"$first": "$documentType"},
			        "versionNumber": { "$first": "$versionNumber" },
			        "sections": { "$first": "$sections" }
			    }}
			], function (err, result) {
				if (err) return reject (err);
				else resolve (result);
			});
		});
	}
});

/*

'use strict';
// =========================================================================
//
// Controller for Task
//
// =========================================================================
var path     = require('path');
var DBModel  = require (path.resolve('./modules/core/server/controllers/core.dbmodel.controller'));


module.exports = DBModel.extend ({
	name : 'ValuedComponent',
	plural : 'valuedcomponents',
	newAssessmentBoundary : function () {
		var self = this;
		return new Promise (function(resolve, reject) {
			resolve ( self.model.assessmentBoundaries.create () );
		});
	},
	newExistingCondition : function () {
		var self = this;
		return new Promise (function (resolve, reject) {
			resolve (self.model.existingConditions.create () );
		});
	},
	newPotentialEffect : function () {
		var self = this;
		return new Promise (function (resolve, reject) {
			resolve (self.model.potentialEffects.create () );
		});
	},
	newMitigationMeasure : function () {
		var self = this;
		return new Promise (function (resolve, reject) {
			resolve (self.model.mitigationMeasures.create () );
		});
	},
	newCumulativeEffect : function () {
		var self = this;
		return new Promise (function (resolve, reject) {
			resolve (self.model.cumulativeEffects.create () );
		});
	},
	listForProject : function (project) {
		var self = this;
		return new Promise (function (resolve, reject) {
			// console.log ('project = ', project);
			self.list ({
				project: project._id
			})
			.then (resolve, reject);
		});
	},
});
*/
