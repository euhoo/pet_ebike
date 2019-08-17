


angular.module('App', [])
.controller('myAppCtrl',['$scope', '$timeout','$http',
($scope, $timeout, $http) => {
    $scope.title = 'Страничка для тестирования простешего хот релоада без пересборки';
    $scope.count = 0;
    $scope.todo = [
        'проверить на отслеживание watch файлы других типов',
        'прикрутить линтер, codeclimate и travis к этому проекту'
    ];
    // var socket = io();
    // socket.on('connect', function (count) {
    //     console.log(count);
    // })

    // var socket = io();

    // socket.on('connection', (data) => {
    //     alert('here'); 
    // });
 
    // socket.on('change', (data) => {
    //         console.log(data);  
    //         $scope.count = data.data;
    //         console.log('scope.count: ', $scope.count);
    //         $scope.$digest();//
    //         //location.reload();//agfr  
    //     })
    $scope.changed = [];
    $http({method: 'GET',url: 'data'})
    .then(response => {        
        $scope.count = response.data.count;
        $scope.changed = Array.from(new Set(response.data.changed)); // unique
        //const process = response.data.count;
        console.log($scope.changed); 
    });
}])