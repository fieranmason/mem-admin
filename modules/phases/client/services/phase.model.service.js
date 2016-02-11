'use strict';
// =========================================================================
//
// phase model and phase base model
//
// =========================================================================
angular.module('project').factory ('PhaseModel', function (ModelBase, _) {
	//
	// build the project model by extending the base model. the base model will
	// have all the basic crud stuff built in
	//
	var PhaseClass = ModelBase.extend ({
		urlName : 'phase',
		// -------------------------------------------------------------------------
		//
		// add a milestone, from a base, to a phase
		//
		// -------------------------------------------------------------------------
		addMilestone : function (baseMilestoneId) {
			var self = this;
			return new Promise (function (resolve, reject) {
				self.put ('/api/phase/'+self.model._id+'/add/milestone/'+baseMilestoneId, {})
				.then (function (res) {
					self.model = res.data;
					self.modelIsNew = false;
					resolve (res.data);
				}).catch (function (res) {
					reject (res.data);
				});
			});
		}
	});
	return new PhaseClass ();
});
angular.module('project').factory ('PhaseBaseModel', function (ModelBase, _) {
	//
	// build the project model by extending the base model. the base model will
	// have all the basic crud stuff built in
	//
	var PhaseBaseClass = ModelBase.extend ({
		urlName : 'phasebase'
	});
	return new PhaseBaseClass ();
});





