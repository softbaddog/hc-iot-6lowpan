var mainApplicationModuleName = 'hc-iot';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'users', 'bulbctrl', 'nodes']);

mainApplicationModule.config(['$locationProvider', 
	function($locationProvider) {
	$locationProvider.hashPrefix('!');
}]);

angular.element(document).ready(function() {
	angular.bootstrap(document, [mainApplicationModuleName]);
});