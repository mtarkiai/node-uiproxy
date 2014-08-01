/**
 @module server.js
 @author mtarkiai
 @since 6/6/14
 */

const SERVER_PORT = 80;
const NODETIME_CONFIG = {
    enabled: false,
    account_key: 'insert_here',
    app_name: 'insert_here'
};

// Import external modules
var express = require('express'),
    request = require('request');

// Instantiate express application object
var app = express();

// Declare a counter for proxied requests
var proxied_req_counter = 0;

// Start nodetime agent, if enabled
if (NODETIME_CONFIG.enabled) {
    var nodetime = require('nodetime');
    nodetime.profile({
        accountKey: NODETIME_CONFIG.account_key,
        appName: NODETIME_CONFIG.app_name
    });
}

// Express configuration

// Map ./www_content to the root (/) for static pages
app.use('/', express.static(__dirname + '/www_content'));

// Specific route configuration for express

// Status page; GET /api/status
app.get('/api/status', function(req, res) {
    res.json({
        version: "1.0"
    })
});

// API proxy test: GET /api/proxytest/{any_string}
app.get('/api/proxytest/:my_param', function(req, res) {

    // Make a test URL to a publicly available REST service
    var testURL = "http://echo.jsontest.com/status/ok/req_param/"
        + req.params.my_param
        + "/proxy_counter/" + (++proxied_req_counter);
    // Implement a one-line proxy to an external web service
    request.get(testURL).pipe(res);
});

// Launch server

app.listen(SERVER_PORT, function(){
    console.log("node.js server is listening at http://localhost:" + SERVER_PORT);
});
