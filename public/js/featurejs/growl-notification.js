/**
 * Created by vdogra on 11/13/14.
 */

function notificationGrowl (notificationProperties, notificationStyling){
    $.growl(notificationProperties, notificationStyling );
}

var removeBackdrop = function(){
    $('.loading-wishes-backdrop').addClass('hide');
};