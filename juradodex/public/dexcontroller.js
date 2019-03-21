/* global angular */


angular.module("App").controller("dexcontroller", ["$scope", "$http", function ($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/jurado/dex";

    function getDex() {
        $http.get(api + "?limit=10&offset=0").then(function successCallback(response) {
            $scope.status = "Status: " + response.status;
            $scope.dexTotal = response.data;
            $scope.error = "";
            $scope.offset = 0;
            $scope.limit = $scope.limit;
        }, function errorCallback(response) {
            console.log(response.status);
            $scope.status = "Status: " + response.status;
            switch (response.status) {
                case 404:
                    $scope.error = "The table is empty. Fill it and try again";
                    break;
                default:
                    $scope.error = "Ups, something was wrong. Try it later";
            }
        });
    }

    getDex();



}]); //fin de codigo