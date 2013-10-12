var myApp = angular.module("myApp",[]);

myApp.filter("reverse", function (text) {
  return function(text) {
    return text.split("").reverse().join("");
    }
}
