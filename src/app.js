
// eslint-disable-next-line no-undef
angular.module('App', [])
  .controller('myAppCtrl', ['$scope', '$timeout', '$http',
    ($scope, $interval, $http) => {
      $scope.title = 'Страничка для тестирования простешего хот релоада без пересборки';
      $scope.count = 0;
      $scope.todo = [
        'проверить на отслеживание watch файлы других типов',
        'прикрутить линтер, codeclimate и travis к этому проекту',
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
     
    }]);
