angular.module('admin').controller('AdminController', ['$scope', 'Authentication',
	function($scope, Authentication, Socket) {
		$scope.authentication = Authentication;
	}
]);