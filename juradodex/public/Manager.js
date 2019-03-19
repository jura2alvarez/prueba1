/* global angular */

angular
    .module("Manager", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/front", {
                templateUrl: "front.html"
            })
            .when("/about", {
                templateUrl: "about.html"
            });
    });