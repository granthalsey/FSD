﻿window.fbAsyncInit = function () {
    FB.init({
        appId: '251632261525136',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v2.9'
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "Scripts/plugins/facebook/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));