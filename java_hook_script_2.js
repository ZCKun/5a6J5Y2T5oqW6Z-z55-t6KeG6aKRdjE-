
String.prototype.format =function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(m, i){
        return args[i];
    });
}

function getTime(){var d=new Date(Date.now());return d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()}

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

//==================================================================

var JNI_OnLoad;
var exports = Module.enumerateExportsSync("libuserinfo.so");
for (var i = 0; i < exports.length; i++) {
    var name = exports[i].name;
    var addr = exports[i].address;
    if (name == 'JNI_OnLoad') {
        JNI_OnLoad = addr;
    }
}

var BASE_ADDR = parseInt(JNI_OnLoad) - parseInt("0x14504");
var addr = '0x' + parseInt(BASE_ADDR + parseInt('0x11828')).toString(16);

var i = 0;

Interceptor.attach(new NativePointer(addr), {
    onEnter: function(args) {
        console.log('{0}++++++++++++++++{1}+++++++++++++++++'.format(addr,getTime()));
        console.log('[{0}] 参数1 > {1}\n'.format(args[0], args[0].toInt32()));
        console.log('[{0}] 参数2 > {1}\n'.format(args[1], mru8s(args[1])));
    },
    onLeave: function(retval) {
        console.log('retval > ', mru8s(retval));
        console.log('\n');
    }
});


Java.perform(function() {
    var ampa = Java.use('com.ss.android.ugc.aweme.app.b.b');
    /*ampa.a.overload('java.lang.String', 'java.util.List', 'boolean').implementation = function(str, list, bol) {
        console.log('参数1> ', str);
        console.log('参数2> ', list);
        console.log('参数3> ', bol);
        
        var ret = this.a(str, list, bol);
        console.log('返回值> ', ret);
        return ret;
    }*/
    /*
    var ToolUtil = Java.use('com.ss.android.common.util.g');
    ToolUtil.a.overload('android.content.Context').implementation = function(ctx) {
        var ret = this.a(ctx);
        console.log(ret);
        return ret;
    }*/
    var alc = Java.use('com.ss.android.common.applog.u');
    alc.a.overload('java.util.Map', 'boolean').implementation = function(map, z) {
        console.log('==============={0}================'.format(getTime()));
        this.a(map,z);
        var values = map.values();
        var keys = map.keySet();
        console.log('KEYS> ', keys.toArray());
        console.log('VALUES> ', values.toArray());
        console.log('\n');
    }

    var UserInfo = Java.use("com.ss.android.common.applog.UserInfo");
    UserInfo.getUserInfo.implementation = function(arg0, arg1, arg2) {
        console.log('================={0}=================='.format(getTime()));
        console.log("ServerTime > ", arg0);
        console.log("arg1 > ", arg1);
        console.log("params > ", arg2);
        var retval = this.getUserInfo(arg0, arg1, arg2);
        console.log("retval > ", retval);
        console.log('\n');
        return retval;
    }
});
