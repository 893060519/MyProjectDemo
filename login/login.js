//设置是否调试
var isDebug = false;

// if (store.get("ebs_token")) {
//     var data = {
//         token: store.get("ebs_token")
//     };
//     $.ajax({
//         url: isDebug ? "ajax/GetUserInfo.w" : "webserver/GetUserInfo",
//         type: isDebug ? "GET" : "POST",
//         dataType: 'json',
//         data: JSON.stringify(data),
//         success: function (data) {
//             if (data.code === 0) {
//                 store.set("username", data.data.username);
//                 store.set("permission", data.data['permission']);
//                 goHome();
//             }
//         }
//     });
// }

layer.closeAll();

//全局参数
var confirmFocusIndex = 0;
var handleKeydown = $.noop;
var sName = "MyProjectDemo办公管理";
var str = "";
var mac;

if (!getBrowserSupport()) {
    str += '<p class="note">由于浏览器版本过低，网页功能可能无法使用，建议使用IE9+、最新的chrome、最新的firefox浏览器!</p>';
}

str += '<div style="margin: 0 auto; width: 905px;">';
str += '    <div class="header">';
str += '        <div class="welcome">';
str += '            <div class="welcomeTo">Welcome to</div>';
str += '            <div class="platform">';
str += '                <span id="platform">';
str += '                    <a class="machine">';
str += sName;
str += '                    </a>平台';
str += '                </span>';
str += '            </div>';
str += '        </div>';
str += '        <img src="login/login_split.png">';
str += '    </div>';
str += '    <form class="login-box" onsubmit="return login(true);">';
str += '        <input type="password" style="position:absolute;visibility:hidden;"/>';
str += '        <div>';
str += '            <label for="username" class="icon">';
str += '                <img src="login/login_user.png">';
str += '            </label>';
str += '            <span>';
str += '                <input id="username" value="" placeholder="username" type="text"  autofocus>';
str += '            </span>';
str += '            <label for="password" class="icon">';
str += '                <img src="login/password.png">';
str += '            </label>';
str += '            <span>';
str += '                <input id="password" value="" placeholder="password" type="password"  autocomplete="new-password"> ';
str += '            </span>';
str += '        </div>';
str += '        <div class="submit">';
str += '            <label for="keepalive" class="checkbox_label"><input id="keepalive" type="checkbox" >保持登录</label>';
str += '            <button id="submit">Login</button>';
str += '        </div>';
str += '    </form>';
str += '</div>';

$('body').append(str);


$(function () {
    window.onload = OnPageLoad;
    // $.ajax({
    //     url: "upload/macInfo.php",
    //     type: "post",
    //     dataType:"JSON",
    //     success: (data) => {
    //         mac = data.mac;
    //     }
    // });
});

// //判断浏览器支持情况
// function OnPageLoad() {
//     var browser = DetectBrowser();
//     if (browser == "Unknown") {
//         layer.confirm("不支持该浏览器， 如果您在使用傲游或类似浏览器，请切换到chrome或者firefox模式");
//         return;
//     }
//     //createElementIA300() 对本页面加入IA300插件
//
//     createElementNT199();
//     //DetectActiveX() 判断IA300Clinet是否安装
//     var create = DetectNT199Plugin();
//     if (create == false) {
//         layer.confirm("插件未安装,请直接安装CD区的插件!");
//         return false;
//     }
// }
//
// //是否安装加密狗信息校验
// function checkDog() {
//     //查找加密锁是否存在
//     var retVal = NT199_Find();
//     if (retVal < 1) {
//         layer.confirm("没有插入加密狗！");
//         return false;
//     }
//     else if (retVal > 1) {
//         layer.confirm("找到 " + retVal + " 把Key，只能对一把Key进行操作。");
//         return false;
//     }
//     //管理工具的的密码
//     var sNTPwd = "12345678";
//
//     //登陆Key
//     retVal = NT199_CheckPassword(sNTPwd);
//     if (retVal !== 0) {
//         layer.confirm("用户密码验证失败！");
//         return false;
//     }
//
//     //获取Key硬件ID
//     var NTID = NT199_GetHardwareId();
//     getRandomMessageFromServer(NTID, mac);
//     return false;
// }
//
// //获取服务器随机数
// function getRandomMessageFromServer(NTID, MAC) {
//
//     var data = {
//         guid: NTID
//     };
//     $.ajax({
//         url: "webserver/GetRandomMessageFromServer",
//         data: JSON.stringify(data),
//         contentType: 'application/json',
//         type: "post",
//         success: function (data) {
//             var randomMessageFromServer = data.data.random;
//             var hashValue = NT199_Sha1WithSeed(randomMessageFromServer);
//             if (hashValue == "") {
//                 layer.confirm("二次验证码计算出错！");
//                 return false;
//             }
//             sendUSBKeyConfirm(hashValue, NTID, MAC);
//         }
//     });
// }
//
// //向服务器下发MAC地址、SHA1种子码、硬件序列号。
// function sendUSBKeyConfirm(hashValue, NTID, MAC) {
//     var data = {
//         digest: hashValue,
//         guid: NTID,
//         mac: MAC
//     };
//     $.ajax({
//         url: "webserver/USBKeyConfirm",
//         contentType: 'application/json',
//         type: "post",
//         data: JSON.stringify(data),
//         success: function (data) {
//             //数据验证成功后执行登录操作
//             if(data.code !== 0){
//                 layer.msg(data.description);
//                 return false;
//             }
//             login();
//         }
//     });
// }

function login(force) {
    var username = $("#username").val();
    var password = $("#password").val();
    //这里要判断用户的有效性
    if (!username) {
        layer.alert('用户名不能为空,请重新输入！', {
            title: '信息',
            icon: 2,
            btn: ['确定']
        });
        $("#username").focus();
        return false;
    }

    var data = {
        username: username,
        password: md5(password),
        keepalive: $("#keepalive").prop("checked"),
        force: force
    };

    $.ajax({
        url: isDebug ? "ajax/Login.w" : "ajax/Login",
        type: isDebug ? "GET" : "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function (data) {
            if (data && data.code === 0) {
                store.set("ebs_token", data.data['token']);
                store.set("username", username);
                store.set("first_jump_to_app", 1);
                goHome();
            } else if (data && data.code === 25) {
                if (force) {
                    layer.alert('强制登录失败，可能有更高级的用户在操作，请稍后...', {
                        title: '信息',
                        icon: 2,
                        btn: ['确定']
                    });
                } else {
                    layer.confirm('其它用户正在操作，是否强制登录？', {
                        icon: 3,
                        title: '提示',
                        btn: ['确定', '取消'],
                        success: function (layero, index) {
                            confirmFocusIndex = 0;

                            layero.find('.layui-layer-btn>a').removeClass("active").eq(confirmFocusIndex).addClass("active");

                            handleKeydown = function (e) {
                                switch (e.keyCode) {
                                    case 39:
                                        confirmFocusIndex = Math.min(confirmFocusIndex + 1, 1);
                                        layero.find('.layui-layer-btn>a').removeClass("active").eq(confirmFocusIndex).addClass("active");
                                        break;
                                    case 37:
                                        confirmFocusIndex = Math.max(confirmFocusIndex - 1, 0);
                                        layero.find('.layui-layer-btn>a').removeClass("active").eq(confirmFocusIndex).addClass("active");
                                        break;
                                    case 13:
                                        if (confirmFocusIndex === 0) {
                                            forceLogin();
                                        }
                                        layer.close(index);
                                        break;
                                    default:
                                        return false;
                                }
                                return true;
                            }
                        },
                        end: function () {
                            handleKeydown = $.noop;
                        }
                    }, function (index) {
                        forceLogin();
                        layer.close(index);
                    });
                }

            } else {
                layer.alert('用户名或者密码错误，请重新输入！', {
                    title: '信息',
                    icon: 2,
                    btn: ['确定']
                });
                $("#password").val("").focus();
            }
        },
        error: function () {
            goHome();
            // layer.alert('网络可能出现了问题，请检查网络是否正常！', {
            //     title: '信息',
            //     icon: 2,
            //     btn: ['确定']
            // });
        }
    });

    return false;
}

function goHome() {
    window.location = "index.html?s=" + getUUID();
}

//强制登录
function forceLogin() {
    login(true);
}


//事件监听
$(document).keydown(function (e) {

    if (handleKeydown(e)) return false;

    // 回车键事件
    if (e.which === 13) {
        if ($(".layui-layer").length === 0) {
            if (document.activeElement.id === "keepalive") {
                $("#keepalive").click();
                return false;
            }
            return true;
        } else {
            layer.closeAll();
            return false;
        }
    }
});

function getBrowserSupport() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isEdge = (userAgent.indexOf("Edge") > -1 || userAgent.indexOf("Trident/7.0;") > -1) && !isIE;
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion < 9) {
            return false;
        }
    }
    // if (isEdge)return "edge";
    // if (isFF)return "FF";
    // if (isOpera)return "Opera";
    // if (isSafari)return "Safari";
    // if (isChrome)return "chrome";
    return true;
}

