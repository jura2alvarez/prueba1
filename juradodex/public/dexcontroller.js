/* global angular */


angular.module("App").controller("dexcontroller", ["$scope", "$http", function ($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/jurado/dex";

    function getDex() {
        $http.get(api + "?limit=10&offset=").then(function successCallback(response) {
            $scope.status = "Status: " + response.status;
            $scope.dexTotal = response.data;
            $scope.error = "";
            $scope.offset = 0;
            $scope.limit = $scope.limit;
            $scope.idioma = []
            $scope.idiomas = $scope.dexTotal.filter(function (o) {

                return o.tipo == "Idioma";

            });
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

    //POST
    $scope.addDex = function () {
        $http.post(api, $scope.newDex).then(function successCallback(response) {
            //  $scope.status = "Status: " + response.status;
            window.alert("Creado con exito");
            getDex();
            $scope.error = "";
        }, function errorCallback(response) {
            console.log(response.status)
            $scope.status = "Status: " + response.status;
            switch (response.status) {
                case 405:
                    window.alert("The post method has to be done to a set of resources");
                    //  $scope.error = "The post method has to be done to a set of resources";
                    break;
                case 409:
                    window.alert("The resource already exists");
                    // $scope.error = "The resource already exists";
                    break;
                case 400:
                    window.alert("Invalid fields");

                    // $scope.error = "Invalid fields";

                    break;
                default:
                    window.alert("Ups, something was wrong. Try it later");
                    // $scope.error = "Ups, something was wrong. Try it later";
            }
        });
    }

    //Delete concreto
    $scope.deleteDex = function (tipo, nombre) {
        console.log("Divorce to be deleted: " + tipo + nombre);

        $http.delete(api + "/" + tipo + "/" + nombre).then(function successCallback(response) {
            $scope.status = "Status: " + response.status;
            window.alert("Eliminado con exito");
            getDex();
        }, function errorCallback(response) {
            console.log(response.status);
            $scope.status = "Status: " + response.status;
            $scope.error = "Ups, something was wrong. Try it later";

        });

    }

    //Delete total
    $scope.deleteAll = function () {

        $http.delete(api).then(function successCallback(response) {
            $scope.status = "Status: " + response.status;
            window.alert("Eliminados con exito");
            getDex();
        }, function errorCallback(response) {
            console.log(response.status);
            $scope.status = "Status: " + response.status;
            $scope.error = "Ups, something was wrong. Try it later";
        });

    }

    $scope.fillTable = function () {

        $http.get(api + "/populate").then(function successCallback(response) {
            //  $scope.status = "Status: " + response.status;
            window.alert("Rellenado con exito");
            getDex();
            $scope.error = ""
        }, function errorCallback(response) {
            console.log(response.status);
            $scope.status = "Status: " + response.status;
            $scope.error = "Ups, something was wrong. Try it later";
        });

    }

    //Paginacion

    $scope.getPageNext = function () {
        $scope.offset = $scope.offset + 10;
        $http.get(api + "?limit=10" + "&offset=" + $scope.offset).then(function successCallback(response) {
            $scope.status = "STATUS: " + response.status + "Done!";
            $scope.dexTotal = response.data;
            $scope.error = ""
        }, function errorCallback(response) {
            console.log(response.status);
            $scope.status = response.status;
            $scope.error = "Ups, something was wrong. Try it later";
        });

    }

    $scope.getPageBack = function () {
        $scope.offset = $scope.offset - 10;
        $http.get(api + "?limit=10" + "&offset=" + $scope.offset).then(function successCallback(response) {
            $scope.status = "STATUS: " + response.status + "Done!";
            $scope.dexTotal = response.data;
            $scope.error = ""
        }, function errorCallback(response) {
            console.log(response.status);
            $scope.status = response.status;
            $scope.error = "Ups, something was wrong. Try it later";
        });

    }

    $scope.getBusqueda = function () {
        console.log(api + "/" + $scope.tipo);
        $http.get(api + "/" + $scope.tipo).then(function successCallback(response) {
            $scope.status = "STATUS: " + response.status + "Done!";
            $scope.dexTotal = response.data;
            $scope.error = ""

        }, function errorCallback(response) {
            console.log(response.status);
            $scope.status = response.status;
            $scope.error = "Ups, something was wrong. Try it later";
            $scope.empty = getDex();
        });

    }

    getDex();



}]); //fin de codigo