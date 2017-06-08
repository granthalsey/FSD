(function () {
    var f = function () { };
    if (!window.console) {
        window.console = {
            log: f, info: f, warn: f, debug: f, error: f
        };
    }
    window.log = window.console.log;
}());