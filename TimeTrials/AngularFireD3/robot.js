//app determines the scope of your functions
var app = angular.module('myapp', ['n3-charts.linechart','firebase']);







app.controller('MyController', function($scope,angularFire) {

  //$scope.dasthing =0;
  //$scope.messages = [{x: 0, value: 0}, {x: 1, value: 4}, {x: 2, value: 7}, {x: 3, value: 0}];
  
  
  
  // Line
  //$scope.options = {series: [{y: 'value', color: 'steelblue'}]};
  
  // Area
  //$scope.options = {series: [{y: 'value', tyep: 'area', color: 'steelblue'}]};
  
  
  // Column
  //$scope.options = {series: [{y: 'value', type: 'column', color: 'steelblue'}]};
  // Interpolation
  //$scope.options = {lineMode: 'cardinal', series: [{y: 'value', color: 'steelblue'}]};
  

      // the following is your url for your firebase -- the place where all json files live
      //^^^this one got me, make sure to include a directory -- in this case "robot" else it won't work ^^^ 
      var ref = new Firebase("https://kielian.firebaseio.com/robot");

      // literally looks for variable called "messages" in the controller's scope (between the tags it was included into) 
      $scope.messages = [];

    //binding -- the special way to bind the angular model to the database's model
    angularFire(ref, $scope, "messages");


    //FINALLY, writing data to firebase

    //We define a function in order to bind data directly to the firebase
    $scope.addMessage = function(direction) {
       $scope.messages.set({type: "movement", direction: direction}); 
    }; 



    $scope.clearMessage = function() {
	//it's better to use firebase's removing as opposed to angular's
	//this makes it sure to reach the firebase
	ref.remove();
	};
  $scope.change = function() {
//  $scope.data = [{x: 0, value: $scope.dasthing}, {x: 1, value: 4}, {x: 2, value: 7}, {x: 3, value: 0}];
    
  };


});

