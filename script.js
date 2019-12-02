// 反调试判断
var exports = Module.enumerateExportsSync("libuserinfo.so");
//var _Z17be_attached_checkRi = null;
//
//for (var i = 0; i < exports.length; i++) {
//    if (exports[i].name == '_Z17be_attached_checkRi') {
//        _Z17be_attached_checkRi = exports[i].address;
//        break;
//    }
//}
//
//Interceptor.attach(new NativePointer(_Z17be_attached_checkRi), {
//    onLeave: function(retval) {
//        retval.replace(0);
//    }
//});

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
// Memory.readUtf8String
var mru8s = function(addr) {return Memory.readUtf8String(addr)}
// Memory.readPointer
var mrp = function(addr) {return Memory.readPointer(addr)}


var _Z7getRSTRv = null;
var _Z7getNameiPcS_ = null;
var _Z7shufflePcS_ = null;
var nativeGetUserinfo = null;

for (var i = 0; i < exports.length; i++) {
    var name = exports[i].name;
    var addr = exports[i].address;
    if (name == '_Z7getRSTRv') {
        _Z7getRSTRv = addr;
    } else if (name == '_Z7getNameiPcS_') {
        _Z7getNameiPcS_ = addr;
    } else if (name == '_Z7shufflePcS_') {
        _Z7shufflePcS_ = addr;
    } else if (name == 'nativeGetUserinfo') {
        nativeGetUserinfo = addr;
    }
}

Interceptor.attach(new NativePointer(_Z7getRSTRv), {
    onLeave: function(retval) {
        console.log('[{0}] _Z7getRSTRv onLeave retval:{1}'.format(getTime(), Memory.readUtf8String((retval))));
    }
});


Interceptor.attach(new NativePointer(_Z7getNameiPcS_), {
    onEnter: function(args) {
        console.log('^^^^^^^^^^');
        console.log('[{0}][onEnter] _Z7getNameiPcS_ arg1: [{1}] ^^^^'.format(getTime(), args[0].toInt32()));
        console.log('[{0}][onEnter] _Z7getNameiPcS_ arg2: [{1}] ^^^^'.format(getTime(), mru8s(args[1])));
        console.log('[{0}][onEnter] _Z7getNameiPcS_ arg3: [{1}] ^^^^'.format(getTime(), mru8s(args[2])));
    },
    onLeave: function(retval) {
        console.log('[{0}][onLeave] _Z7getNameiPcS_ retval: [{1}] ^^^^'.format(getTime(), mru8s(retval)));
        console.log('^^^^^^^^^^\n');
    }
});

Interceptor.attach(new NativePointer(nativeGetUserinfo), {
    onEnter: function(args) {
        console.log('??????????');
        var env = Java.vm.getEnv();
        console.log('[{0}][onEnter] nativeGetUserinfo serverTime: [{1}] ?????'.format(getTime(), args[2].toInt32()));
        var array = '';
        for (var i = 0; i < env.getArrayLength(args[4]); i++) {
            console.log('[{0}][onEnter] nativeGetUserinfo urlParamsArray: [{1}] ?????'.format(getTime(), mru8s(env.getStringUtfChars(env.getObjectArrayElement(args[4], i)))));
        }
//        var ele = env.getObjectArrayElement(args[4], 0);
//        var chr = env.getStringUtfChars(ele);
//        console.log('[{0}][onEnter] nativeGetUserinfo urlParamsArray: [{1}] ?????'
//                    .format(getTime(), array));
        console.log('??????????\n');
    }
});


Interceptor.attach(new NativePointer(_Z7shufflePcS_), {
    onEnter: function(args) {
        console.log('&&&&&&&&&&');
        console.log('[{0}][onEnter] _Z7shufflePcS_ arg1: [{1}] &&&&'.format(getTime(), mru8s(args[0])));
        console.log('[{0}][onEnter] _Z7shufflePcS_ arg2: [{1}] &&&&'.format(getTime(), mru8s(args[1])));
    },
    onLeave: function(retval) {
        console.log('[{0}][onLeave] _Z7shufflePcS_ retval: [{1}] &&&&'.format(getTime(), mru8s(retval)));
        console.log('&&&&&&&&&&\n');
    }
});


// 拿到 jni_onload 基址
var JNI_LOAD_POINTER = Module.getExportByName('libuserinfo.so', 'JNI_OnLoad');
var BASE_ADDR = parseInt(JNI_LOAD_POINTER) - parseInt('0x14504');


var sub_3E384 = '0x' + parseInt(BASE_ADDR + parseInt('0x3E384')).toString(16);
Interceptor.attach(new NativePointer(sub_3E384), {
    onLeave: function(retval) {
        console.log('[sub_3E384] retval:', Memory.readCString(retval), '++++');
    }
});


var sub_3fcc8 = '0x' + parseInt(BASE_ADDR + parseInt('0x3fcc8')).toString(16);
var sub_3fcc8_arg1, sub_3fcc8_arg2, sub_3fcc8_arg3;
Interceptor.attach(new NativePointer(sub_3fcc8), {
    onEnter: function(args) {
        sub_3fcc8_arg1 = args[0];
        sub_3fcc8_arg2 = args[1];
        sub_3fcc8_arg3 = args[2];
        console.log('***********');
        console.log('[{0}][sub_3fcc8 onEnter] sub_3fcc8_arg2 char: [{1}] ----'.format(getTime(), Memory.readUtf8String(sub_3fcc8_arg2)));
        console.log('[{0}][sub_3fcc8 onEnter] sub_3fcc8_arg3 char: [{1}] ----'
                    .format(getTime(), Memory.readUtf8String(Memory.readPointer(Memory.readPointer(sub_3fcc8_arg3)))));

        console.log('\n');
    },
    onLeave: function(retval) {
        console.log('[{0}][sub_3fcc8 onLeave] arg1: [{1}], retval: [{2}] ----'.format(getTime(), sub_3fcc8_arg1, retval));
        console.log('[{0}][sub_3fcc8 onLeave] sub_3fcc8 return value: [{1}] ----'.format(getTime(), Memory.readUtf8String(Memory.readPointer(retval))));
        console.log('[{0}][sub_3fcc8 onLeave] sub_3fcc8_arg2 char: [{1}] ----'.format(getTime(), Memory.readUtf8String(sub_3fcc8_arg2)));
        console.log('[{0}][sub_3fcc8 onLeave] sub_3fcc8_arg3 char: [{1}] ----'
                    .format(getTime(), Memory.readUtf8String(Memory.readPointer(Memory.readPointer(sub_3fcc8_arg3)))));
        console.log('------------\n');
    }
});


var sub_3f044 = '0x' + parseInt(BASE_ADDR + parseInt('0x3f044')).toString(16);
var sub_3f044_arg1, sub_3f044_arg2, sub_3f044_arg3, sub_3f044_arg4;
Interceptor.attach(new NativePointer(sub_3f044), {
    onEnter: function(args) {
        sub_3f044_arg1 = args[0];
        sub_3f044_arg2 = args[1];
        sub_3f044_arg3 = args[2];
        sub_3f044_arg4 = args[3];
        console.log('================');
        console.log('[{0}][sub_3f044 onEnter] sub_3f044_arg1: [{1}] ===='.format(getTime(), mru8s(mrp(sub_3f044_arg1))));
        console.log('[{0}][sub_3f044 onEnter] sub_3f044_arg2: [{1}] ===='
                    .format(getTime(), mru8s(sub_3f044_arg2)));
        console.log('[{0}][sub_3f044 onEnter] sub_3f044_arg3: [{1}] ===='.format(getTime(), mru8s(mrp(sub_3f044_arg3))));
    },
    onLeave: function(retval) {
        console.log('[{0}][sub_3f044 onLeave] retval:[{1}] ===='.format(mru8s(mrp(retval))));
        console.log('================\n');
    }
});


