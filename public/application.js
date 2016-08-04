var mainAppModuleName = 'hc-iot';

var mainModuel = angular.module(mainAppModuleName, ['ngResource', 'ngRoute', 'users', 'bulbs', 'nodes', 'chat']);

mainModuel.config(['$locationProvider',	function($locationProvider) {
		$locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainAppModuleName]);
});