import requests
import hashlib
import time


def shuffle(result, array):
    ret = ['0', '0', '0', '0', '0', '0', '0', '0']
    ret[2] = result[ord(array[2]) - 49]
    ret[4] = result[ord(array[4]) - 49]
    ret[6] = result[ord(array[6]) - 49]
    ret[5] = result[ord(array[5]) - 49]
    ret[3] = result[ord(array[3]) - 49]
    ret[1] = result[ord(array[1]) - 49]
    ret[7] = result[ord(array[7]) - 49]
    ret[0] = result[ord(array[0]) - 49]
    return ''.join(ret)


def get_name(server_time, params):
    _as = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
    _cp = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
    shuffle1 = hex(server_time)[2:]
    shuffle2 = hex(server_time)[2:]
    shuffle1 = shuffle(shuffle1, '57218436')
    shuffle2 = shuffle(shuffle2, '15387264')
    params_md5 = hashlib.md5(params.encode('utf-8')).hexdigest()
    if server_time & 1:
        params_md5 = hashlib.md5(params_md5.encode('utf-8')).hexdigest()
    _as[0] = chr(97)
    _as[1] = chr(49)
    for i in range(8):
        _as[2*(i+1)] = params_md5[i]

    for j in range(8):
        _as[2*j+3] = shuffle2[j]

    for k in range(8):
        _cp[2*k] = shuffle1[k]

    for l in range(8):
        _cp[2*l+1] = params_md5[l+24]
    
    _cp[16] = chr(101)
    _cp[17] = chr(49)

    return ''.join(_as + _cp)


def params_replace(params):
    ret = ''
    for i in list(params):
        if ord(i) == 32 or ord(i) == 43:
            ret += chr(97)
            continue
        ret += i 
    return ret


def p2d(p):
    _ = p.split('&')
    r = {}
    for i in _:
        __ = i.split('=')
        r[__[0]] = __[1]
    r['rstr'] = 'efc84c17'
    return r


def params_process(p1):
    # params = p2d(params)
    # params['rstr'] = 'efc84c17'
    # for i in ['as', 'cp']:
    #     if i in params:
    #         del params[i]
    ts = p1['ts']
    # sorted_k = sorted(params)
    # pars = ''
    # for k in sorted_k:
        # pars += params[k]
    # pars = params_replace(pars)
    # print(pars)
    # encrypt = get_name(st, pars)
    # encrypt = get_name(st, f"{st}wifi1128awemewandoujia6Xiaomi69143529399androidMIaMAXa344088263783316zh16600ffa82bd3b11065942891080*2029no_retryefc84c17a{int(p1['ts'])}016628686950355594321661.6.60.13333333333333333")
    ps = [p1['_rticket'], 'wifi','1128','aweme','wandoujia','6','unknown','69143529399','android','unknown','440','88263783316','zh','166','0','0','ffa82bd3b1106594','28','9','1080*2029','no_retry','efc84c17','a',ts,'0','1662','166','1.6.6','0.13333333333333333']
    encrypt = get_name(int(ts), ''.join(ps))
    i = len(encrypt)//2
    _as = encrypt[:i]
    _cp = encrypt[i:]
    p1.update({'as': _as, 'cp': _cp})
    print(encrypt)
    print(p1)
