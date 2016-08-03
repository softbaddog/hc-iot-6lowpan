angular.module('nodes').factory('Nodes', ['$resource',
	function($resource) {
		return $resource('api/nodes/:nodeId', {
			nodeId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);