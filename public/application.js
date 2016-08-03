var mainAppModuleName = 'hc-iot';

angular.module(mainAppModuleName, ['ngResource', 'ngRoute', 'users', 'app', 'nodes'])
	.config(['$locationProvider',	function($locationProvider) {
		$locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainAppModuleName]);
});