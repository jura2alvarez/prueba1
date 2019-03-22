/* global angular */

angular.module("App", ["ngRoute"]).config(function ($routeProvider) {
    $routeProvider.

    when("/", {
            templateUrl: "portada.html",
            controller: "portadacontroller"
        })
        .when("/dex", {
            templateUrl: "dexview.html",
            controller: "dexcontroller"
        })
        .when("/info", {
            templateUrl: "info.html"
        });
});