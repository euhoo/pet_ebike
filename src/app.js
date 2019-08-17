


angular.module('App', [])
.controller('myAppCtrl',['$scope', '$timeout', ($scope, $timeout) => {
    $scope.title = 'MyTestPage';
}])