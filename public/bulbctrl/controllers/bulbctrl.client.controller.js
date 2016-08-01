angular.module('bulbctrl').controller('BulbCtrlController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
	}
]);