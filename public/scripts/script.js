var myApp=angular.module( 'myApp', ['xeditable'] );

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
    console.log( 'dataToSend from client: ', dataToSend);

  };//End of complete function

  $scope.getCompetitionResults = function(compDay){
    console.log('compDay', compDay);
    $scope.bottomHalf = !$scope.bottomHalf;
    $scope.topHalf = !$scope.topHalf;
    finalFactory.getCompetitors(compDay);

    console.log('logging out $scope.twoStanding', compDay);

  };//End of get competition results function

  $scope.scoreComp = function () {
    console.log('testing testy test: ', $scope.allTheComp);
  };//End of scoreComp function

  $scope.saveComp = function(data, id) {
    //$scope.Comp not updated yet
    angular.extend(data, {id: id});
    // return $http.post('/saveUser', data);
  };

  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
  };

  $scope.allTheComp = finalFactory.allCompForDay;
}]);//End of myApp controller
