


   //app determines the scope of your functions
var app = angular.module('myapp', ['n3-charts.linechart','firebase']);







app.controller('MyController', function($scope,angularFire) {

  $scope.dasthing =0;
  $scope.messages = [{x: 0, value: 0}, {x: 1, value: 4}, {x: 2, value: 7}, {x: 3, value: 0}];
  
  
  
  // Line
  //$scope.options = {series: [{y: 'value', color: 'steelblue'}]};
  
  // Area
  //$scope.options = {series: [{y: 'value', tyep: 'area', color: 'steelblue'}]};
  
  
  // Column
  //$scope.options = {series: [{y: 'value', type: 'column', color: 'steelblue'}]};
  // Interpolation
  $scope.options = {lineMode: 'cardinal', series: [{y: 'value', color: 'steelblue'}]};
  

      // the following is your url for your firebase -- the place where all json files live
      //^^^this one got me, make sure to include a directory -- in this case "happy" else it won't work ^^^ 
      var ref = new Firebase("https://kielian.firebaseio.com/happy");

      // literally looks for variable called "messages" in the controller's scope (between the tags it was included into) 
      $scope.messages = [];

    //binding -- the special way to bind the angular model to the database's model
    angularFire(ref, $scope, "messages");


    //FINALLY, writing data to firebase

    //We define a function in order to bind data directly to the firebase
    $scope.addMessage = function(e) {
      if(e.keyCode != 13) return; // only proceed to next lines if enter key is pressed
       $scope.messages.push({x: $scope.x, value: $scope.value});
       $scope.msg = ""; // this clears the view's msg variable
    }
    $scope.clearMessage = function() {
	//it's better to use firebase's removing as opposed to angular's
	//this makes it sure to reach the firebase
	ref.remove()
	}
  $scope.change = function() {
//  $scope.data = [{x: 0, value: $scope.dasthing}, {x: 1, value: 4}, {x: 2, value: 7}, {x: 3, value: 0}];
    
  }


});



    //controller is where all the math and processing occurs -- i.e. preferably not in the html
    function MyController($scope, angularFire) {
    }
