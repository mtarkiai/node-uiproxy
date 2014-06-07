/* AngularJS application logic */

angular.module('ui-demo', ['ui.bootstrap']);

/*
Data controller for DOM elements with ng-controller="ServerDataCtrl"
 */
function ServerDataCtrl($scope,$http) {
    // Initialize proxyData scope variable for usage by DOM
    $scope.proxyData = {
        status: "Initialized",
        req_param: "(n/a)",
        proxy_counter: "0"
    };

    // Declare a callProxyServer function
    $scope.callProxyServer = function() {
        var sample_req_param = (new Date).getTime();
        $http.get('/api/proxytest/' + sample_req_param).success(function(data) {
            // Insert results into $scope.proxyData => DOM will refresh
            $scope.proxyData = data;
        });
    }
}

