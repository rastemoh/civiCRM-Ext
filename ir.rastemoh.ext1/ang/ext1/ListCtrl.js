(function(angular, $, _) {

  angular.module('ext1').config(function($routeProvider) {
      $routeProvider.when('/list', {
        controller: 'Ext1ListCtrl',
        templateUrl: '~/ext1/ListCtrl.html',
        resolve: {
		  memberships: function(crmApi){
			  return crmApi('Membership','get',{
				 "sequential": 1,
				 "return": ["start_date","end_date","id","contact_id.display_name","status_id"]

			  });
		  },
        }
      });
    }
  );
  angular.module('ext1').controller('Ext1ListCtrl', function($scope, crmApi, crmStatus, crmUiHelp, memberships) {
    // The ts() and hs() functions help load strings for this module.
    var ts = $scope.ts = CRM.ts('ext1');
    var hs = $scope.hs = crmUiHelp({file: 'CRM/ext1/ListCtrl'}); // See: templates/CRM/ext1/ListCtrl.hlp
	
	$scope.memberships = memberships.values;
	$scope.dateFilter = function(object){
		var sd = moment($scope.dates.rangeStart);
		var ed = moment($scope.dates.rangeEnd);
		var date = moment(object.start_date);
		return date >= sd && date <= ed;
	}
	$scope.dates = {//default values
		rangeStart:new Date(2015,01,01),
		rangeEnd:new Date(2016,12,01)
	}

  });

})(angular, CRM.$, CRM._);
