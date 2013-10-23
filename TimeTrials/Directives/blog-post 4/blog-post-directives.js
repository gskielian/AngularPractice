var app = angular.module("blogang", []);



app.directive("greybig",function() {
  return {
    restrict:"EA",
    scope: {
      content:"@"
    },
    template: "<div>{{content}}</div>"
  };
});
app.directive("navbar",function() {
  return {
    restrict:"EA",
    scope: {
      content:"@"
    },
    template: "<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\"> <div class=\"container\"> <div class=\"navbar-header\"> <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\".navbar-ex1-collapse\"> <span class=\"sr-only\">toggle navigation</span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span class=\"icon-bar\"></span> </button> <a class=\"navbar-brand\" href=\"~/Main/index.html\">G. S. Kielian Blog</a> </div> <!-- collect the nav links, forms, and other content for toggling --> <div class=\"collapse navbar-collapse navbar-ex1-collapse\"> <ul class=\"nav navbar-nav\"> <li><a href=\"#contact\">contact</a></li> </ul> </div><!-- /.navbar-collapse --> </div><!-- /.container --> </nav> "
  };
});

app.directive("posttime",function() {
  return{
    restrict: "EA",
    scope: {
      dastime:"@"
    },
    template: " <p><span class=\"glyphicon glyphicon-time\"></span> Posted on {{dastime}}</p>"
  };
});
