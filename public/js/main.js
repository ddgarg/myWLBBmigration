requirejs.config({
    baseUrl: "./js",
    paths: {
        jquery: "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        jqueryui: "//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min",
        bootstrap: "//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        backbone: "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
        underscore: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min",
        dustcore: "//cdnjs.cloudflare.com/ajax/libs/dustjs-linkedin/2.4.0/dust-core",
        typeahead: "//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.4/typeahead.bundle.min",
        vticker: "./featurejs/jquery.vticker.min",
        formvalidate: "./featurejs/jquery-form-validator",
        fb: "./featurejs/fb",
        essentials: "./featurejs/essentials",
        growl: "./featurejs/bootstrap-growl.min",
        growlfn: "./featurejs/growl-notification",
        loadModules: "./loadModules",
        app: "./app"
    },
    shim: {
        jqueryui: {
            deps: ["jquery"],
            exports: "jQuery"

        },
        bootstrap: {
            deps: ["jquery"],
            exports: "jQuery"
        },
        underscore: {
            deps: [],
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },
        dustcore: {
            exports: "dust"
        },
        typeahead: {
            deps: ["jquery"]
        },
        "formvalidate": {
            deps: ["jquery"]
        },
        "vticker": {
            deps: ["jquery"]
        },
        "growlfn": {
            deps: ["growl"]
        }
    }
});

require(["jquery", "backbone", "dustcore", "bootstrap","typeahead", "vticker"], function ($, Backbone, dust) {
    require(["loadModules"], function () {
        require(["app"], function (App) {
            window.app = new App();
            app.start();

        });
    });
});





