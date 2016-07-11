var myApp=angular.module( 'myApp', [] );

myApp.controller('competitorOverall', ['$scope', '$http', '$location', '$window', 'FinalFactory', function ($scope, $http, $location, $window, FinalFactory) {
var finalFactory = FinalFactory;

$scope.competitors = [];
$scope.topHalf = true;
$scope.bottomHalf = false;

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
    $scope.bottomHalf = !$scope.bottomHalf;
    $scope.topHalf = !$scope.topHalf;
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

  $scope.updateComp = function () {

  };//End of update comp function

  // / -Edit function needs to be completed...
  $scope.editCompetition = function () {
    $scope.topHalf = !$scope.topHalf;
    $scope.bottomHalf = !$scope.bottomHalf;
  };//end of edit competition function

  $scope.getCompetitionResults = function(compDay){
    console.log('compDay', compDay);
    $scope.bottomHalf = !$scope.bottomHalf;
    $scope.topHalf = !$scope.topHalf;
    finalFactory.getCompetitors(compDay);

    console.log('logging out $scope.twoStanding', compDay);

  };//End of get competition results function

  $scope.allTheComp = finalFactory.allCompForDay;
}]);//End of myApp controller
