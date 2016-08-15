angular.module('bulbs').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'views/list-node.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);