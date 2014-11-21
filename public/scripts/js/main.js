
requirejs.config({
    baseUrl: "scripts",
    paths: {
        jquery      :"//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min",
        bootstrap :"//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min",
        backbone    :"//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.1.2/backbone-min",
        underscore  :"//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min",
        dustcore  :"//cdnjs.cloudflare.com/ajax/libs/dustjs-linkedin/2.4.0/dust-core",
        typeahead   :"//cdnjs.cloudflare.com/ajax/libs/typeahead.js/0.10.4/typeahead.bundle.min",
        vticker     :"//raw.githubusercontent.com/vivekdogra/mycdn/master/jquery.vticker.min",
        fb        :"./featurejs/fb"
    },
    shim:{
        bootstrap: {
            deps: ["jquery"],
            exports: "bootstrap"
        },
        underscore:{
            deps: [],
            exports: "_"
        },
        backbone:{
            deps:   ["jquery", "underscore"],
            exports: "Backbone"
        },
        dustcore: {
            exports: "dust"
        }
    }
});

require(["routers/routers", "backbone", "dustcore"], function(AppRouter, Backbone, dust){
    require(["bootstrap","fb","templates/layouts/master","templates/upcomingbirthday","templates/navbar", "templates/components/addressmodal","templates/awishlist","templates/wishtemplate","templates/userdetailshome"], function(){
        console.log("loading templates");
        $(".loader").fadeOut("slow");
        var myapp = new AppRouter();
        Backbone.history.start();
    });




});




