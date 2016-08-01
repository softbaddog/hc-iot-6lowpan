angular.module('nodes').config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/nodes', {
		templateUrl: 'nodes/views/list-node.client.view.html'
	}).
	when('/nodes/create', {
		templateUrl: 'nodes/views/create-node.client.view.html'
	}).
	when('/nodes/:nodeId', {
		templateUrl: 'nodes/views/view-node.client.view.html'
	}).
	when('/nodes/:nodeId/edit', {
		templateUrl: 'nodes/views/edit-node.client.view.html'
	});
}]);