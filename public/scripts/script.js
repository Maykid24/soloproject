var myApp=angular.module( 'myApp', [] );

myApp.controller('competitorOverall', ['$scope', '$http', '$location', '$window', 'FinalFactory', function ($scope, $http, $location, $window, FinalFactory) {
var finalFactory = FinalFactory;

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
    $scope.competitors.total = Number($scope.twoY) + Number($scope.twoy) + Number($scope.threeY) + Number($scope.sixY);
    $scope.competitors.totalX = Number($scope.twoX) + Number($scope.twox) + Number($scope.threeX) + Number($scope.sixX);
    console.log('total', $scope.competitors.total);
    console.log('total X', $scope.competitors.totalX);
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
    finalFactory.getCompPost(dataToSend);

    console.log(dataToSend);
  };//End of complete function


  $scope.getCompetitionResults = function(compDay){
    console.log('compDay', compDay);
    finalFactory.getCompetitors(compDay);
  };
  $scope.allTheCompSelected = finalFactory.allCompForSelectedDate;

  $scope.allTheComp = finalFactory.allCompForDay;
  console.log('in controller finalFactory.allCompForDay', finalFactory.allCompForDay);
}]);//End of myApp controller
