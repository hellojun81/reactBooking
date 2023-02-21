

const request = require('request');
const iconv = require('iconv-lite') //인코딩을 변환 해주는 모듈, 필자는 iconv보다 iconv-lite를 선호한다.
const charset = require('charset') //해당 사이트의 charset값을 알 수 있게 해준다.
var cookie;

exports.real_resOk = async function (_pointdate, _pointname, _pointtime, _hand_tel1, _hand_tel2
    , _hand_tel3, _bookgDateSms, _bookgCourseSms, _certSeq, _certNo) {
    url = 'https://lavieestbellegolfnresort.com/oldcourse/GolfRes/onepage/golfNoChk.asp'
    jsonData = getJsonData(_pointdate, _pointname, _pointtime, _hand_tel1, _hand_tel2
        , _hand_tel3, _bookgDateSms, _bookgCourseSms, _certSeq, _certNo)
    let a = await PostReq(url, jsonData)
    a = a.split('javascript:subcmd')
    for (let i = 0; i < a.length; i++) {
        str = a[i].split('>')
        arr.push(str[0])
    }
    return arr
}


exports.authorization = async function (_pointdate, _pointname, _pointtime, _hand_tel1, _hand_tel2
    , _hand_tel3, _bookgDateSms, _bookgCourseSms, _certSeq, _certNo) {
    url = 'https://lavieestbellegolfnresort.com/oldcourse/GolfRes/onepage/golfNoChk.asp'
    let jsonData = getJsonData(_pointdate, _pointname, _pointtime, _hand_tel1, _hand_tel2
        , _hand_tel3, _bookgDateSms, _bookgCourseSms, _certSeq, _certNo)
    let a = await PostReq(url, jsonData)
    a = a.split('javascript:subcmd')
    for (let i = 0; i < a.length; i++) {
        str = a[i].split('>')
        arr.push(str[0])
    }
    return arr
}


exports.login = async function (id, pw) {
    var url = 'https://lavieestbellegolfnresort.com/oldcourse/login/login_ok.asp'
    var jsonData = {
        mem_id: id,
        usr_pwd: pw,
        preurl: ''
    }
    let a = await PostReq(url, jsonData)
    return a
}
exports.getTel = async function () {
    var url = 'https://lavieestbellegolfnresort.com/dunescourse/pagesite/lounge/info/edit.asp'
    let a = await GetReq(url)
    let str = new Array()
    let _str
    a = a.split('/dunescourse/memberInfor/smsChk.asp')
    a = a[1].split('form')
    a = a[0].replace(/\"/gi, "");
    for (let i = 0; i < 3; i++) {
        _str = a.split('name=hand_tel' + (i + 1) + ' value=')
        _str = _str[1].split('>')
        str.push(_str[0])
    }
    _str = str[0] + str[1] + str[2]
    return _str
}

exports.getCourse = async function (date) {
    var arr = new Array()
    var url = 'https://lavieestbellegolfnresort.com/oldcourse/GolfRes/onepage/real_timelist_ajax_list.asp'
    var jsonData = {
        golfrestype: 'real',
        courseid: '0',
        usrmemcd: '10',
        pointdate: date,
        openyn: '2',
        dategbn: '1',
        choice_time: '00',
        cssncourseum: '',
        inputtype: 'I',
    }
    let a = await PostReq(url, jsonData)
    a = a.split('javascript:subcmd')
    for (let i = 0; i < a.length; i++) {
        str = a[i].split('>')
        str=str[0].replace(/\'/gi, "")
  
        arr.push(str)
    }
    return arr
}

async function GetReq(url) {
    return new Promise(function (resolve, reject) {
        request.get({
            headers: {
                'Cookie': cookie
            },
            url: url,
            method: 'GET',
            encoding: null
        }, function (error, response, body) {
            if (error) { console.log(error) }
            const enc = charset(response.headers, body) // 해당 사이트의 charset값을 획득
            const result = iconv.decode(body, enc) // 획득한 charset값으로 body를 디코딩
            resolve(result)
        });

    })
}
async function getJsonData(_pointdate, _pointname, _pointtime, _hand_tel1, _hand_tel2
    , _hand_tel3, _bookgDateSms, _bookgCourseSms, _certSeq, _certNo) {
    let _bookgTimeSms=_pointtime.substring(0,2)+':'+_pointtime.substring(2,4)
    let jsonData = {
        cmd: 'ins',
        cmval: '0',
        cmkind: '',
        calltype: 'AJAX',
        gonexturl: './my_golfreslist.asp',
        backurl: '',
        pointdate: _pointdate,
        openyn: '2',
        dategbn: '1',
        pointid: '1',
        pointname: _pointname,
        pointtime: _pointtime,
        golfuser_name: '',
        hand_tel1: _hand_tel1,
        hand_tel2: _hand_tel2,
        hand_tel3: _hand_tel3,
        join_bookg_cnt: '',
        pointhole: '18홀',
        pointpartcd: '',
        certSeq: _certSeq,
        certNo: _certNo,
        bookgDateSms: _bookgDateSms,
        bookgCourseSms: _bookgCourseSms,
        bookgTimeSms: _bookgTimeSms,
        ref_check: '',
        ref_name: '',
        ref_tel1: '',
        ref_tel2: '',
        ref_tel3: '',
        coupon_info: '',
        self_r_yn: 'N',
        self_c_yn: '',
        res_gubun: 'N',
    }
    return jsonData
}



async function PostReq(url, fomData) {
    // var cookie
    return new Promise(function (resolve, reject) {
        request.post({
            headers: {
                //     // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            url: url,
            method: 'POST',
            form: fomData,
            json: true,
            encoding: null
        }, function (error, response, body) {
            if (error) { console.log(error) }
            const enc = charset(response.headers, body) // 해당 사이트의 charset값을 획득
            const result = iconv.decode(body, enc) // 획득한 charset값으로 body를 디코딩
            if (response.headers["set-cookie"].length > 1) {
                cookie = response.headers["set-cookie"][1].split(';')
            }
            resolve(result)
        });


    })
}