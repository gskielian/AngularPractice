var app = angular.module("wassup",[]);


app.directive("helloworld", function() { 
  return {
    restrict :"A",
    template: "<div> <h1> Nothin Much </h1> How about you? </div>"
  };
});
