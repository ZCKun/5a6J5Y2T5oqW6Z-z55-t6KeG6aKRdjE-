var getTime = function() {return new Date(Date.now()).toLocaleTimeString()}
String.prototype.format = function () {
    var values = arguments;
    return this.replace(/\{(\d+)\}/g, function (match, index) {
        if (values.length > index) {
            return values[index];
        } else {
            return "";
        }
    });
}

  
Java.perform(function() {
    var UserInfo = Java.use("com.ss.android.common.applog.UserInfo");

    UserInfo.getUserInfo.implementation = function(arg0, arg1, arg2) {
        console.log('===================================');
        console.log("arg0 > ", arg0);
        console.log("arg1 > ", arg1);
        console.log("arg2 > ", arg2);
        var retval = this.getUserInfo(arg0, arg1, arg2);
        console.log("retval > ", retval);
        console.log('\n');
        return retval;
    }
});

