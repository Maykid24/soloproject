var myApp=angular.module( 'myApp', [] );

myApp.controller('competitorOverall', ['$scope', '$http', '$location', '$window', function ($scope, $http, $location, $window) {

// $scope.competitors = [{id: 'new1'}, {id: 'new2'}];
$scope.competitors = [];

var Competitor = function () {

  name= '';
  classification= '';
  twoY= '';
  twoX= '';
  twoy= '';
  twox= '';
  threeY= '';
  threeX= '';
  sixY= '';
  sixX= '';
};

  $scope.addCompetitor = function () {
    event.preventDefault();
    $scope.competitors.push(new Competitor());
  };//end of add Competitor function

  $scope.removeComp = function () {
    var lastItem = $scope.competitors.length-1;
    $scope.competitors.splice(lastItem);
  };//end of remove competitors

  $scope.complete = function () {
    event.preventDefault();

    var dataToSend = {
      competitors: $scope.competitors,
      date: $scope.dateIn,
      location: $scope.locationIn,
      state: $scope.stateIn
    };

    $http({
      method: 'POST',
      url: '/compPost',
      data: dataToSend
    }).then(function(){
      $window.location.href ='/final';
    });//End of http Post
    console.log(dataToSend);
  };//End of complete function

  $scope.getCompetitors = function () {
    $http({
      method: 'GET',
      url: '/getCompetitors',
    }).then(function (response) {
      /// - Un comment when writing to the database
      $scope.allTheComp = response.data;
      console.log('scope allTheComp ' + $scope.allTheComp);
    });//end of http call
  };//end of get competitor function

  $scope.getCompetitors();
}]);//End of myApp controller
