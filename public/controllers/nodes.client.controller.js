angular.module('nodes').controller('NodesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Nodes', 'Socket',
	function($scope, $routeParams, $location, Authentication, Nodes, Socket) {

		$scope.authentication = Authentication;

		Socket.on('nodeChanged', function(node) {
			console.log('received node changed.', node);
			if ($scope.node && $scope.node._id === node._id) {
				// 刷新当前节点数据
				$scope.node = node;
			}
			if ($scope.nodes) {
				$scope.nodes.forEach(function(element, index) {
					if (element._id === node._id) {
						$scope.nodes[index] = node;
					}
				});
			}
		});

		$scope.create = function() {
			var node = new Nodes({
				name: this.name,
				deviceId: this.deviceId,
				groupId: this.groupId,
				status: this.status,
				parent: this.parent,
				level: this.level,
				switch: this.switch,
				params: this.params,
				metadata: this.metadata
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

				// 同时触发nodeChanged事件
				Socket.emit('nodeChanged', $scope.node);
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
	}
]);