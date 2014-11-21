window.fbAsyncInit = function () {

    FB.init({
        appId: '1440831706165680',
        cookie: true,
        status: true,
        xfbml: true,
        version: 'v1.0'
    });

};

function post(path, params, method) {
    method = method || "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

function fbLogin() {

    FB.login(function (response) {
        console.log(response);

        var fbAuthResponse = response.authResponse;

        if (response.authResponse) {
            post('/login', {accessToken: fbAuthResponse.accessToken, userId: fbAuthResponse.userID, signedRequest: fbAuthResponse.signedRequest});
        }

        else {
            window.location = "/";
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'public_profile,email,publish_actions,user_friends,user_birthday'});
}

function fblogout() {
    FB.getLoginStatus(function (response) {

        if (response && response.status === 'connected') {
            FB.logout(function (response) {
                window.location = "/logout";
            });
        }
        else {
            window.location = "/logout";
        }
    });
}
(function () {
    var e = document.createElement('script');
    e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
    e.async = true;
    document.getElementById('fb-root').appendChild(e);
}());