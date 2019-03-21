/* global angular */

angular.module("App", ["ngRoute"]).config(function ($routeProvider) {
    $routeProvider.

    when("/", {
            templateUrl: "portada.html"
        })
        .when("/dex", {
            templateUrl: "dexview.html",
            controller: "dexcontroller"
        })
        .when("/about", {
            templateUrl: "about.html"
        });
});