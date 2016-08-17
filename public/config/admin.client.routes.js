angular.module('admin').config(['$routeProvider',
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