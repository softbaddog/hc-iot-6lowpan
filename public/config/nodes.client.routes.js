angular.module('nodes').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/nodes', {
		templateUrl: 'views/list-node.client.view.html'
	}).
	when('/nodes/create', {
		templateUrl: 'views/create-node.client.view.html'
	}).
	when('/nodes/:nodeId', {
		templateUrl: 'views/view-node.client.view.html'
	}).
	when('/nodes/:nodeId/edit', {
		templateUrl: 'views/edit-node.client.view.html'
	});
}]);