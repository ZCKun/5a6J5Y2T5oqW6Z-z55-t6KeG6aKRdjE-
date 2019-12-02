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

var getAddr = function(fa) { // fa是要获取的方法的地址
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
    var addr = '0x' + parseInt(BASE_ADDR + parseInt(fa)).toString(16);
    return addr;
}

var sout = function(msg, color) {
    if (color instanceof Number) {
        console.log(msg);
    } else {
        switch (color) {
            default:
            case 'b':
                msg = '\x1b[38;01m' + msg + '\x1b[0m';
                break;
            case 'hei':
                msg = '\x1b[30;01m' + msg + '\x1b[0m';
                break;
            case 'lv':
                msg = '\x1b[32;01m' + msg + '\x1b[0m';
                break;
            case 'h':
                msg = '\x1b[31;01m' + msg + '\x1b[0m';
                break;
        }
        console.log(msg);
    }
}

//==================================================================
//
const STALKED = 12345;
var threads = [];
var count = 0;
Interceptor.attach(new NativePointer(getAddr("0x3F36C")), {
    onEnter: function(args) {
        count ++;
        sout('===============  ' + count + '  ===============', 'h');
        // console.log('参数1 > ', args[0]);
        // console.log('参数2 > ', mru8s(mrp(args[1])));

        // var trace = Thread.backtrace(this.context, Backtracer.ACCURATE).map(DebugSymbol.fromAddress);
        // for (var j in trace)
        //     console.log(trace[j], '\n');

        var tid = Process.getCurrentThreadId();
            if (threads[tid] == STALKED)
                return;
            Stalker.follow(tid, {
                events: {
                    call: true, // CALL instructions: yes please
                    ret: false, // RET instructions: no thanks
                    exec: false // all instructions: no thanks
                },
                onCallSummary: function (summary) {
                    var log = []
                    for (i in summary) {
                        var addr = idaAddress(base, '0x0', i);
                        if (addr.compare(ptr(STARTING_ADDRESS)) >= 0 && addr.compare(ptr(ENDING_ADDRESS)) <= 0)
                            log.push(addr);
                    }
                    console.log(JSON.stringify(log));
                }
            });
            threads[tid] = STALKED;
    },
    onLeave: function(retval) {
        var tid = Process.getCurrentThreadId();
        if (threads[tid] == STALKED)
            return;
        Stalker.unfollow(tid);
        Stalker.garbageCollect();
        console.log('\n');
    }
});