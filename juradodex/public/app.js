/* global angular */

angular.module("App", ["ngRoute"]).config(function ($routeProvider) {
    $routeProvider.

    when("/", {
            templateUrl: "portada.html",
            controller: "portadacontroller"
        })
        .when("/dexadmin", {
            templateUrl: "dexviewadmin.html",
            controller: "dexcontroller"
        })
        .when("/info", {
            templateUrl: "info.html"
        })
        .when("/curriculum", {
            templateUrl: "curriculum.html"
        })
        .when("/parallax", {
            templateUrl: "parallax.html"
        })
        .when("/dexuser", {
            templateUrl: "dexviewuser.html",
            controller: "dexcontroller"
        })
        .when("/prueba", {
            templateUrl: "portadaprueba.html",
            controller: "dexcontroller"
        });
});