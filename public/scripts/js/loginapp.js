'use strict';

require(["../common"], function (common) {

    require(["jquery","bootstrapjs","fbjs"], function(){

        var app = {
            initialize: function () {
                // Your code here
                $(document).ready(function () {
                    $(".loader").fadeOut("slow");
                });
           }
        };

        app.initialize();
    });

});
