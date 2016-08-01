angular.module('nodes').controller('NodesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Nodes', 
	function($scope, $routeParams, $location, Authentication, Nodes) {
		
		$scope.authentication = Authentication;

		$scope.create = function() {
			var node = new Nodes({
				name: this.name,
				status: this.status,
				group: this.group,
				parent: this.parent
			});

			node.$save(function(response) {
				$location.path('nodes/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.nodes = Nodes.query();
		};

		$scope.findOne = function() {
			$scope.node = Nodes.get({
				nodeId: $routeParams.nodeId
			});
		};

		$scope.update = function() {
			$scope.node.$update(function() {
				$location.path('nodes/' + $scope.node._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.delete = function(node) {
			if (node) {
				node.$remove(function() {
					for (var i in $scope.nodes) {
						if ($scope.nodes[i] === node) {
							$scope.nodes.splice(i, 1);
						}
					}
				});
			} else {
				$scope.node.$remove(function() {
					$location.path('nodes');
				});
			}
		};		
}]);

