var app = angular.module('plunker', ['n3-charts.linechart']);

app.controller('MainCtrl', function($scope) {
  $scope.data = [{x: 0, value: 12}, {x: 1, value: 4}, {x: 2, value: 7}, {x: 3, value: 0}];
  
  // Line
  //$scope.options = {series: [{y: 'value', color: 'steelblue'}]};
  
  // Area
  //$scope.options = {series: [{y: 'value', type: 'area', color: 'steelblue'}]};
  
  // Column
  //$scope.options = {series: [{y: 'value', type: 'column', color: 'steelblue'}]};
  
  // Interpolation
  $scope.options = {lineMode: 'cardinal', series: [{y: 'value', color: 'steelblue'}]};
  
});
