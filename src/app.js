


angular.module('App', [])
.controller('myAppCtrl',['$scope', '$timeout','$http',
($scope, $timeout, $http) => {
    $scope.title = 'Страничка для тестирования простешего хот релоада без пересборки';
    $scope.count = 0;
    $scope.todo = [
        'прикрутить рекурсивность папок,поискать стандартные методы',
        'проверить на отследивание node.js watch файлы других типов',
        'периодически проходить отслеживаемую папку и смотреть,не появились ли в ней или вложенные файлы и папки',
        'прикрутить линтер, codeclimate и travis к этому проекту'
    ]
    $scope.marks = [
        'watcher не смотрит рекурсивно на каталоги внутри'
    ]

    // var socket = io();
    //     socket.on('change', (data) => {
    //         console.log(data.data);
    //         $scope.count = data.data;
    //         console.log('scope.count: ', $scope.count);
    //         $scope.$digest();//
    //         location.reload();//agfr
    //     })

    $http({method: 'GET',url: 'data'})
    .then(response => {
        $scope.count = response.data;//
    });
}])