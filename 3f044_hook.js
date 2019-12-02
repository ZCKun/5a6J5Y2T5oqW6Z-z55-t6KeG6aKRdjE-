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

var JNI_OnLoad;

var exports = Module.enumerateExportsSync("libuserinfo.so");
for (var i = 0; i < exports.length; i++) {
    var name = exports[i].name;
    var addr = exports[i].address;
    if (name == 'JNI_OnLoad') {
        JNI_OnLoad = addr;
    }
}

// Memory.readUtf8String
var mru8s = function(addr) {return Memory.readUtf8String(addr)}
// Memory.readPointer
var mrp = function(addr) {return Memory.readPointer(addr)}
// Memory.allocUtf8String
var mau8s = function(addr) {return Memory.allocUtf8String(addr)}
// read process memory
var rpm = function(addr, size) { 
    var buf = Memory.readByteArray(ptr('0x' + addr), size);
    console.log(hexdump(buf, {
    offset: 0, 
        length: size, 
        header: true,
        ansi: false
    }));
}

var BASE_ADDR = parseInt(JNI_OnLoad) - parseInt("0x14504");
var addr = '0x' + parseInt(BASE_ADDR + parseInt('0x3f044')).toString(16);

Interceptor.attach(new NativePointer(addr), {
    onEnter: function(args) {
        
    },
    onLeave: function(retval) {

    }
});

var i = 0;

var addr = '0x' + parseInt(BASE_ADDR + parseInt('0x3EF30')).toString(16);
Interceptor.attach(new NativePointer(addr), {
    onEnter: function(args) {
        // if (i < 2) {
            i ++;
            var msg = '===============【' + i + '】==================\n' + 
                        '[参数1 > {0}({3}/{4})\n[参数2 > {1}\n[参数3 > {2}\n'
                        .format(mru8s(mrp(args[0])), mru8s(args[1]), args[2], args[0], mrp(args[0]));
            send(msg);
        // }
    },
    onLeave: function(retval) {
        send('retval > {0}'.format(retval));
    }
});

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