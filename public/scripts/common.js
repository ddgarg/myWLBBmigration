'use strict';


requirejs.config({
    baseUrl: "scripts",
    paths: {
        jquery      :"//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        bootstrapjs :"//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        backbone    :"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
        underscore  :"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min",
        dustcorejs  :"//cdnjs.cloudflare.com/ajax/libs/dustjs-linkedin/2.4.0/dust-core",
        typeahead   :"//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.4/typeahead.bundle.min",
        vticker     :"//raw.githubusercontent.com/vivekdogra/mycdn/master/jquery.vticker.min",
        fbjs        :"./featurejs/fb"
    }
});