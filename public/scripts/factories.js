myApp.factory("FinalFactory", ['$http', '$location', '$window', function ($http, $location, $window) {


  var allCompForDay = {};
  var allCompForSelectedDate = {};
  var getCompPost = function (dataToSend) {
    $http.post('/compPost', dataToSend).then(function (response) {
      console.log('compPost response from server in factory: ', response);
      allCompForDay.comps = response.data;
    });
  };
  var getCompetitors = function (compDay) {
    $http.post('/getCompetitors', compDay).then(function (response) {
      console.log('compDay response from server in factory: ', response);
      allCompForDay.comps = response.data;
    });
  };
  return {
    allCompForSelectedDate: allCompForSelectedDate,
    allCompForDay: allCompForDay,
    getCompPost: getCompPost,
    getCompetitors: getCompetitors
  };
}]);//end of factory
