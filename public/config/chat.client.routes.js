angular.module('chat').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/chat', {
			templateUrl: 'views/chat.client.view.html'
		});
	}
]);