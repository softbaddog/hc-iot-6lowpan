angular.module('bulbs').controller('BulbsController', ['$scope', 'Authentication',
	function($scope, Authentication, Socket) {
		$scope.authentication = Authentication;
	}
]);