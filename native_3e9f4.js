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


var JNI_OnLoad = null;

var exports = Module.enumerateExportsSync("libuserinfo.so");
for (var i = 0; i < exports.length; i++) {
    var name = exports[i].name;
    var addr = exports[i].address;
    if (name == 'JNI_OnLoad') {
        JNI_OnLoad = addr;
    }
}

var BASE_ADDR = parseInt(JNI_OnLoad) - parseInt("0x14504");
var addr = '0x' + parseInt(BASE_ADDR + parseInt('0x3e9f4')).toString(16);
Interceptor.attach(new NativePointer(addr), {
    onEnter: function(args) {
        console.log('-----------------[{0}][onEnter]---------------'.format(getTime()));
        console.log('arg 1:', args[0].toInt32());
        console.log('arg 2:', args[1].toInt32());
    },
    onLeave: function(retval) {
        console.log('retval:', retval.toInt32());
        console.log('------------------[onLeave]----------------\n');
    }
});
