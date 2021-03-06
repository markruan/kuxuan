/*
 * APICloud JavaScript Library
 * Copyright (c) 2014 apicloud.com
 */



(function(window) {
    var u = {};
    var isAndroid = (/android/gi).test(navigator.appVersion);
    var uzStorage = function() {
        var ls = window.localStorage;
        if (isAndroid) {
            ls = os.localStorage();
        }
        return ls;
    };

    function parseArguments(url, data, fnSuc, dataType) {
        if (typeof(data) == 'function') {
            dataType = fnSuc;
            fnSuc = data;
            data = undefined;
        }
        if (typeof(fnSuc) != 'function') {
            dataType = fnSuc;
            fnSuc = undefined;
        }
        return {
            url: url,
            data: data,
            fnSuc: fnSuc,
            dataType: dataType
        };
    }


    u.trim = function(str) {
        if (String.prototype.trim) {
            return str == null ? "" : String.prototype.trim.call(str);
        } else {
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    };
    u.trimAll = function(str) {
        return str.replace(/\s*/g, '');
    };
    u.isElement = function(obj) {
        return !!(obj && obj.nodeType == 1);
    };
    u.isArray = function(obj) {
        if (Array.isArray) {
            return Array.isArray(obj);
        } else {
            return obj instanceof Array;
        }
    };
    u.isEmptyObject = function(obj) {
        if (JSON.stringify(obj) === '{}') {
            return true;
        }
        return false;
    };
    u.addEvt = function(el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.addEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.addEventListener) {
            el.addEventListener(name, fn, useCapture);
        }
    };
    u.rmEvt = function(el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.rmEvt Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        if (el.removeEventListener) {
            el.removeEventListener(name, fn, useCapture);
        }
    };
    u.one = function(el, name, fn, useCapture) {
        if (!u.isElement(el)) {
            console.warn('$api.one Function need el param, el param must be DOM Element');
            return;
        }
        useCapture = useCapture || false;
        var that = this;
        var cb = function() {
            fn && fn();
            that.rmEvt(el, name, cb, useCapture);
        };
        that.addEvt(el, name, cb, useCapture);
    };
    u.dom = function(el, selector) {
        if (arguments.length === 1 && typeof arguments[0] == 'string') {
            if (document.querySelector) {
                return document.querySelector(arguments[0]);
            }
        } else if (arguments.length === 2) {
            if (el.querySelector) {
                return el.querySelector(selector);
            }
        }
    };
    u.domAll = function(el, selector) {
        if (arguments.length === 1 && typeof arguments[0] == 'string') {
            if (document.querySelectorAll) {
                return document.querySelectorAll(arguments[0]);
            }
        } else if (arguments.length === 2) {
            if (el.querySelectorAll) {
                return el.querySelectorAll(selector);
            }
        }
    };
    u.byId = function(id) {
        return document.getElementById(id);
    };
    u.first = function(el, selector) {
        if (arguments.length === 1) {
            if (!u.isElement(el)) {
                console.warn('$api.first Function need el param, el param must be DOM Element');
                return;
            }
            return el.children[0];
        }
        if (arguments.length === 2) {
            return this.dom(el, selector + ':first-child');
        }
    };
    u.last = function(el, selector) {
        if (arguments.length === 1) {
            if (!u.isElement(el)) {
                console.warn('$api.last Function need el param, el param must be DOM Element');
                return;
            }
            var children = el.children;
            return children[children.length - 1];
        }
        if (arguments.length === 2) {
            return this.dom(el, selector + ':last-child');
        }
    };
    u.eq = function(el, index) {
        return this.dom(el, ':nth-child(' + index + ')');
    };
    u.not = function(el, selector) {
        return this.domAll(el, ':not(' + selector + ')');
    };
    u.prev = function(el) {
        if (!u.isElement(el)) {
            console.warn('$api.prev Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.previousSibling;
        if (node.nodeType && node.nodeType === 3) {
            node = node.previousSibling;
            return node;
        }
    };
    u.next = function(el) {
        if (!u.isElement(el)) {
            console.warn('$api.next Function need el param, el param must be DOM Element');
            return;
        }
        var node = el.nextSibling;
        if (node.nodeType && node.nodeType === 3) {
            node = node.nextSibling;
            return node;
        }
    };
    u.closest = function(el, selector) {
        if (!u.isElement(el)) {
            console.warn('$api.closest Function need el param, el param must be DOM Element');
            return;
        }
        var doms, targetDom;
        var isSame = function(doms, el) {
            var i = 0,
                len = doms.length;
            for (i; i < len; i++) {
                if (doms[i].isEqualNode(el)) {
                    return doms[i];
                }
            }
            return false;
        };
        var traversal = function(el, selector) {
            doms = u.domAll(el.parentNode, selector);
            targetDom = isSame(doms, el);
            while (!targetDom) {
                el = el.parentNode;
                if (el != null && el.nodeType == el.DOCUMENT_NODE) {
                    return false;
                }
                traversal(el, selector);
            }

            return targetDom;
        };

        return traversal(el, selector);
    };
    u.contains = function(parent, el) {
        var mark = false;
        if (el === parent) {
            mark = true;
            return mark;
        } else {
            do {
                el = el.parentNode;
                if (el === parent) {
                    mark = true;
                    return mark;
                }
            } while (el === document.body || el === document.documentElement);

            return mark;
        }

    };
    u.remove = function(el) {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    };
    u.attr = function(el, name, value) {
        if (!u.isElement(el)) {
            console.warn('$api.attr Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length == 2) {
            return el.getAttribute(name);
        } else if (arguments.length == 3) {
            el.setAttribute(name, value);
            return el;
        }
    };
    u.removeAttr = function(el, name) {
        if (!u.isElement(el)) {
            console.warn('$api.removeAttr Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 2) {
            el.removeAttribute(name);
        }
    };
    u.hasCls = function(el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.hasCls Function need el param, el param must be DOM Element');
            return;
        }
        if (el.className.indexOf(cls) > -1) {
            return true;
        } else {
            return false;
        }
    };
    u.addCls = function(el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.addCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.add(cls);
        } else {
            var preCls = el.className;
            var newCls = preCls + ' ' + cls;
            el.className = newCls;
        }
        return el;
    };
    u.removeCls = function(el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.removeCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.remove(cls);
        } else {
            var preCls = el.className;
            var newCls = preCls.replace(cls, '');
            el.className = newCls;
        }
        return el;
    };
    u.toggleCls = function(el, cls) {
        if (!u.isElement(el)) {
            console.warn('$api.toggleCls Function need el param, el param must be DOM Element');
            return;
        }
        if ('classList' in el) {
            el.classList.toggle(cls);
        } else {
            if (u.hasCls(el, cls)) {
                u.removeCls(el, cls);
            } else {
                u.addCls(el, cls);
            }
        }
        return el;
    };
    u.val = function(el, val) {
        if (!u.isElement(el)) {
            console.warn('$api.val Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            switch (el.tagName) {
                case 'SELECT':
                    var value = el.options[el.selectedIndex].value;
                    return value;
                    break;
                case 'INPUT':
                    return el.value;
                    break;
                case 'TEXTAREA':
                    return el.value;
                    break;
            }
        }
        if (arguments.length === 2) {
            switch (el.tagName) {
                case 'SELECT':
                    el.options[el.selectedIndex].value = val;
                    return el;
                    break;
                case 'INPUT':
                    el.value = val;
                    return el;
                    break;
                case 'TEXTAREA':
                    el.value = val;
                    return el;
                    break;
            }
        }

    };
    u.prepend = function(el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.prepend Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterbegin', html);
        return el;
    };
    u.append = function(el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.append Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforeend', html);
        return el;
    };
    u.before = function(el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.before Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('beforebegin', html);
        return el;
    };
    u.after = function(el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.after Function need el param, el param must be DOM Element');
            return;
        }
        el.insertAdjacentHTML('afterend', html);
        return el;
    };
    u.html = function(el, html) {
        if (!u.isElement(el)) {
            console.warn('$api.html Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            return el.innerHTML;
        } else if (arguments.length === 2) {
            el.innerHTML = html;
            return el;
        }
    };
    u.text = function(el, txt) {
        if (!u.isElement(el)) {
            console.warn('$api.text Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 1) {
            return el.textContent;
        } else if (arguments.length === 2) {
            el.textContent = txt;
            return el;
        }
    };
    u.offset = function(el) {
        if (!u.isElement(el)) {
            console.warn('$api.offset Function need el param, el param must be DOM Element');
            return;
        }
        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

        var rect = el.getBoundingClientRect();
        return {
            l: rect.left + sl,
            t: rect.top + st,
            w: el.offsetWidth,
            h: el.offsetHeight
        };
    };
    u.css = function(el, css) {
        if (!u.isElement(el)) {
            console.warn('$api.css Function need el param, el param must be DOM Element');
            return;
        }
        if (typeof css == 'string' && css.indexOf(':') > 0) {
            el.style && (el.style.cssText += ';' + css);
        }
    };
    u.cssVal = function(el, prop) {
        if (!u.isElement(el)) {
            console.warn('$api.cssVal Function need el param, el param must be DOM Element');
            return;
        }
        if (arguments.length === 2) {
            var computedStyle = window.getComputedStyle(el, null);
            return computedStyle.getPropertyValue(prop);
        }
    };
    u.jsonToStr = function(json) {
        if (typeof json === 'object') {
            return JSON && JSON.stringify(json);
        }
    };
    u.strToJson = function(str) {
        if (typeof str === 'string') {
            return JSON && JSON.parse(str);
        }
    };
    u.setStorage = function(key, value) {
        if (arguments.length === 2) {
            var v = value;
            if (typeof v == 'object') {
                v = JSON.stringify(v);
                v = 'obj-' + v;
            } else {
                v = 'str-' + v;
            }
            var ls = uzStorage();
            if (ls) {
                ls.setItem(key, v);
            }
        }
    };
    u.getStorage = function(key) {
        var ls = uzStorage();
        if (ls) {
            var v = ls.getItem(key);
            if (!v) {
                return;
            }
            if (v.indexOf('obj-') === 0) {
                v = v.slice(4);
                return JSON.parse(v);
            } else if (v.indexOf('str-') === 0) {
                return v.slice(4);
            }
        }
    };
    u.rmStorage = function(key) {
        var ls = uzStorage();
        if (ls && key) {
            ls.removeItem(key);
        }
    };
    u.clearStorage = function() {
        var ls = uzStorage();
        if (ls) {
            ls.clear();
        }
    };

    /*by king*/
    u.fixIos7Bar = function(el) {
        if (!u.isElement(el)) {
            console.warn('$api.fixIos7Bar Function need el param, el param must be DOM Element');
            return;
        }
        var strDM = api.systemType;
        if (strDM == 'ios') {
            var strSV = api.systemVersion;
            var numSV = parseInt(strSV, 10);
            var fullScreen = api.fullScreen;
            var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
            if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                el.style.paddingTop = '20px';
            }
        }
    };
    u.fixStatusBar = function(el) {
        if (!u.isElement(el)) {
            console.warn('$api.fixStatusBar Function need el param, el param must be DOM Element');
            return;
        }
        var sysType = api.systemType;
        if (sysType == 'ios') {
            u.fixIos7Bar(el);
        } else if (sysType == 'android') {
            var ver = api.systemVersion;
            ver = parseFloat(ver);
            if (ver >= 4.4) {
                el.style.paddingTop = '25px';
            }
        }
    };
    u.toast = function(title, text, time) {
        var opts = {};
        var show = function(opts, time) {
            api.showProgress(opts);
            setTimeout(function() {
                api.hideProgress();
            }, time);
        };
        if (arguments.length === 1) {
            var time = time || 500;
            if (typeof title === 'number') {
                time = title;
            } else {
                opts.title = title + '';
            }
            show(opts, time);
        } else if (arguments.length === 2) {
            var time = time || 500;
            var text = text;
            if (typeof text === "number") {
                var tmp = text;
                time = tmp;
                text = null;
            }
            if (title) {
                opts.title = title;
            }
            if (text) {
                opts.text = text;
            }
            show(opts, time);
        }
        if (title) {
            opts.title = title;
        }
        if (text) {
            opts.text = text;
        }
        time = time || 500;
        show(opts, time);
    };
    u.post = function( /*url,data,fnSuc,dataType*/ ) {
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        argsToJson.data && (json.data = argsToJson.data);
        if (argsToJson.dataType) {
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text' || type == 'json') {
                json.dataType = type;
            }
        } else {
            json.dataType = 'json';
        }
        json.method = 'post';
        api.ajax(json, function(ret, err) {
            if (ret) {
                fnSuc && fnSuc(ret);
            }
        });
    };
    u.get = function( /*url,fnSuc,dataType*/ ) {
        var argsToJson = parseArguments.apply(null, arguments);
        var json = {};
        var fnSuc = argsToJson.fnSuc;
        argsToJson.url && (json.url = argsToJson.url);
        //argsToJson.data && (json.data = argsToJson.data);
        if (argsToJson.dataType) {
            var type = argsToJson.dataType.toLowerCase();
            if (type == 'text' || type == 'json') {
                json.dataType = type;
            }
        } else {
            json.dataType = 'text';
        }
        json.method = 'get';
        api.ajax(json, function(ret, err) {
            if (ret) {
                fnSuc && fnSuc(ret);
            }
        });
    };

    /*end*/

    window.$api = u;

})(window);

function panduan() { //??????????????????
    if (!$api.getStorage('userinfo')) {
        api.toast({
            msg: '????????????'
        });
        return false;
    } else {

        return true;
    }

}

function kaifa() {
    api.toast({
        msg: '?????????...'
    });

}

function closeT() {
    api.openWin({
        name: 'slidLayout',
        animation: {
            type: "movein", //??????????????????????????????????????????
            subType: "from_left", //????????????????????????????????????????????????
            duration: 400 //???????????????????????????300??????
        },
    })
    api.closeSlidPane();

}

function imageCache(url) { //??????????????????
    var path = url;
    api.imageCache({
        url: url,
    }, function(ret, err) {
        if (ret) {
            path = ret.url;
        }
    });
    return path;
}

function openPhoto(data, i) { //????????????
    var dd = data.split(',')
    var imageBrowser = api.require('imageBrowser');
    imageBrowser.openImages({
        imageUrls: dd,
        showList: false,
        activeIndex: i
    });
}
// ????????????
function saveMlistDB(sid, name, artist, pic, date) {
    var db = api.require('db');
    db.openDatabase({
        name: 'history2'
    }, function(ret, err) {
        if (ret.status) {
            db.executeSql({
                name: 'history2',
                sql: 'CREATE TABLE IF NOT EXISTS mlist(mlist_id INT AUTO_INCREMENT, id INT(25),mlist_name varchar(255), mlist_artist varchar(255), mlist_pic varchar(255),mlist_date int(23),PRIMARY KEY ( mlist_id ))'
            }, function(ret, err) {
                if (ret.status) {
                    db.executeSql({
                        name: 'history2',
                        sql: "INSERT INTO mlist (mlist_id,id,mlist_name,mlist_artist,mlist_pic,mlist_date) VALUES ('" + sid + "', '" + sid + "','" + name + "', '" + artist + "', '" + pic + "','" + date + "')",
                    }, function(ret, err) {
                        if (ret.status) {
                            // console.log(JSON.stringify(ret));
                        } else {
                            //  alert(JSON.stringify(err));
                        }
                    });

                } else {
                    //  alert(JSON.stringify(err));
                }
            });

        } else {
            alert(JSON.stringify(err));
        }
    });

}


function login_winxin() {
    var wx = api.require('wx');
    var regTime = getNowFormatDate();
    uiloading();
    wx.isInstalled(function(ret, err) {
        if (ret.installed) {
            wx.auth({
                apiKey: ''
            }, function(ret, err) {
                if (ret.status) {
                    console.log(JSON.stringify(ret));
                    var code = ret.code
                    wx.getToken({
                        apiKey: '',
                        apiSecret: '',
                        code: code
                    }, function(ret, err) {
                        if (ret.status) {
                            var accessToken = ret.accessToken;
                            var openId = ret.openId
                            wx.getUserInfo({
                                accessToken: accessToken,
                                openId: openId
                            }, function(ret, err) {
                                if (ret.status) {
                                    var openid = ret.openid;
                                    var nickname = ret.nickname;
                                    var sex = ret.sex;
                                    var headimgurl = ret.headimgurl;
                                    api.ajax({
                                        url: hostUrl + '/weilog.php',
                                        method: 'post',
                                        data: {
                                            values: {
                                                openid: openid,
                                                nickname: nickname,
                                                headimgurl: headimgurl,
                                                regdate: regTime,
                                            },
                                        }
                                    }, function(ret, err) {

                                        // stoploading();
                                        if (ret.status == 0) {

                                            api.toast({
                                                msg: ret.msg
                                            });
                                            $api.setStorage('userinfo', ret.userdata);

                                            api.sendEvent({
                                                name: 'updateuserinfo'
                                            });

                                            api.sendEvent({
                                                name: 'reg_login_successEvent',

                                            });
                                            api.closeWin({
                                                name: api.winName
                                            });

                                        } else if (ret.status == 1) {
                                            api.sendEvent({
                                                name: 'reg_login_successEvent',
                                                extra: {
                                                    user: nickname,
                                                }
                                            });
                                            var userdata = ret.userdata
                                            api.toast({
                                                msg: ret.msg
                                            });
                                            $api.setStorage('userinfo', userdata);
                                            api.setPrefs({
                                                key: 'user',
                                                value: nickname
                                            });
                                            api.sendEvent({
                                                name: 'updateuserinfo'
                                            });

                                            api.closeWin({
                                                name: api.winName
                                            });
                                        } else {
                                            api.toast({
                                                msg: ret.msg
                                            });

                                        }
                                    });
                                } else {
                                    alert(err.code);
                                }
                            });
                        } else {
                            alert(err.code);
                        }
                    });
                } else {
                    alert(err.code);
                }
            });
        } else {
            alert('????????????????????????????????????');
        }
    });
}

function isOnLineStatus(callback) {
    var s = api.connectionType;
    s = s.toLowerCase();
    if (s == 'wifi' || s == '3g' || s == '4g' || s == '2g') {
        callback(true, s);
    } else {
        callback(false, s);
    }
}

function uiloading(id,isfull) {
    id = id ? id : 0
    var to_top
    to_top=isfull?0:69
    if (id < 7) {
        api.openFrame({
            name: 'loading',
            url: 'widget://html/loading/loading.html',
            rect: {
                x: 0,
                y: to_top,
                w: api.winWidth,
                h: api.winHeight

            },
            pageParam: {
                id: id
            },
            bounces: false,
            bgColor: 'rgba(0,0,0,0)',
            vScrollBarEnabled: true,
            hScrollBarEnabled: true
        });
    } else {
        var isw = 70
        var isH = 70
        var isBg = 'rgba(14, 14, 14, 0.2)'

        var list = [{
            frame: 'widget://image/yin/1.png'
        }, {
            frame: 'widget://image/yin/2.png'
        }, {
            frame: 'widget://image/yin/3.png'
        }, {
            frame: 'widget://image/yin/4.png'
        }, {
            frame: 'widget://image/yin/5.png'
        }, {
            frame: 'widget://image/yin/6.png'
        }, {
            frame: 'widget://image/yin/7.png'
        }, {
            frame: 'widget://image/yin/8.png'
        }, {
            frame: 'widget://image/yin/9.png'
        }, {
            frame: 'widget://image/yin/10.png'
        }, {
            frame: 'widget://image/yin/11.png'
        }, {
            frame: 'widget://image/yin/12.png'
        }, {
            frame: 'widget://image/yin/13.png'
        }, {
            frame: 'widget://image/yin/14.png'
        }, {
            frame: 'widget://image/yin/15.png'
        }, {
            frame: 'widget://image/yin/16.png'
        }]

        var activity = api.require('UILoading');
        activity.keyFrame({
            rect: {
                w: isw,
                h: isH
            },
            styles: {
                bg: isBg,
                corner: 5,
                interval: 90,
                frame: {
                    w: 68,
                    h: 68
                }
            },
            content: list,
        }, function(ret) {
            //		alert(JSON.stringify(ret));
        });

        
      }
      setTimeout(function() {
        api.closeFrame({
            name: 'loading'
        });
    }, 5000);

}

function stoploading() {
    var uiloading = api.require('UILoading');
    uiloading.closeKeyFrame();
    setTimeout(function() {
        api.closeFrame({
            name: 'loading'
        });
    }, 100)
}

function goback1() {
    api.execScript({
        name: 'index',
        script: 'app.hidefloatModule()'
    });
    api.closeWin();

}

// ????????????
function openIndex() {
    api.openSlidLayout({
        type: 'left',
        fixedPane: {
            name: 'win1',
            url: "widget://html/slidLayout_body.html",
        },
        slidPane: {
            name: 'index',
            url: "widget://html/index/index_head.html",
            bgColor: 'red'
        }
    }, function(ret, err) {

    });
}

// ????????????
function saveCache(dataName, key, data) {
    var data = $api.jsonToStr(data)
    api.writeFile({
        path: api.cacheDir + '/' + dataName + key + '.json',
        data: data
    }, function(ret, err) {});

    // }

}

function getCache(dataName, key, callback) {

    api.readFile({
        path: api.cacheDir + '/' + dataName + key + '.json',
    }, function(ret, err) {
        // console.log(JSON.stringify(ret.data));
        if (ret.status) {
            var data = {
                data: ret.data,
                code: 0
            }

            callback(data, err); //??????
        } else {
            callback(ret, err); //??????
        }
    });


    // }

}


function delCache(dataName, key) {

    api.writeFile({
        path: api.cacheDir + '/' + dataName + key + '.json',
        data: null
    }, function(ret, err) {

    });


    // }
}
/////////////////??????????????????//////
function songCache(songid, url) {
    api.download({
        url: url,
        savePath: api.cacheDir + '/mp3/' + songid + timestamp,
        report: true,
        cache: true,
        allowResume: true
    }, function(ret, err) {
        // console.log(JSON.stringify(ret));
        if (ret.state == 1) {
            var info = {}
            info.mp3 = ret.savePath

            saveCache('songCache', songid, info)
        }
    });

}
var interval = setInterval(function() {
    Dtime(1)
}, 850);
clearInterval(interval);

function DsTime(is) { //???????????????????????????
    clearInterval(interval);
    interval = setInterval(function() {
        Dtime(1)
    }, 850);
}


function Dtime(val) { //?????????????????????
    for (var i = val; i < 17; i++) {

        api.setNavBarAttr({
            rightButtons: [{
                iconPath: 'widget://image/yin/' + i + '.png',
                text: ' '
            }]
        })
        window.setTimeout("Dtime(" + ++i + ")", 50)
        break;
    }
}

function dateFormat(time) {
    time = new Date(time)
    var year = time.getFullYear()
    var month = time.getMonth() + 1;
    var date = time.getDate();

    return year + '???' + month + "???" + date + "???"
}

function UnixToDate(str) {
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth() + 1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //??????????????????
    return oTime;
};

//???0??????
function getzf(num) {
    if (parseInt(num) < 10) {
        num = '0' + num;
    }
    return num;

}

// function fnaddEventListener() { //?????????????????????
//     var audioStreamer = api.require('audioStreamer');
//     audioStreamer.addEventListener({}, function(ret) {
//         app.state = ret.state
//         switch (ret.state) {
//             case "prepare":
//                 app.isPlaying = true
//                 app.music_img_min = 'https://loading.io/spinners/microsoft/index.svg'
//                 break;

//             case "finished":
//                 var isRepeat = $api.getStorage('isRepeat') && $api.getStorage('isRepeat') == 1 ? true : false
//                 if (isRepeat) {
//                     app.init()
//                 } else {
//                     api.sendEvent({
//                         name: 'isNotPlaying',
//                     });
//                     app.playNext()
//                 }
//                 break;
//             case "buffering":

//                 break;
//             case "pause":
//                 $api.setStorage('isPlaying', false);
//                 break;
//             case "resume":
//                 $api.setStorage('isPlaying', true);
//                 break;
//             default:
//                 api.sendEvent({
//                     name: 'isNotPlaying',
//                 });
//         }
//     });
// }
//??????????????????

function openPerCenter(uid) {
    api.openTabLayout({
        name: 'per_frame',
        url: 'widget://html/per/per_frame.html',
        title: '??????',
        hideNavigationBar: false,
        bounces: false,
        slidBackEnabled: false,
        reload: true,
        pageParam: {
            uid: uid
        },
        navigationBar: {
            background: 'widget://image/hd2.jpg',
            color: '#fff',
            leftButtons: [{
                iconPath: 'widget://image/back.png',
                text: '??????'

            }]
        }
    });
}

function openAlubm(data) { //??????????????????
    var dialogBox = api.require('dialogBox');
    dialogBox.close({
        dialogName: 'tips'
    });
    api.openWin({
        name: 'alubm_head',
        url: 'widget://html/album/album_head.html',
        pageParam: {
            data: data,
        },
        animation: {
            type: "reveal", //??????????????????????????????????????????
            subType: "from_right", //????????????????????????????????????????????????
            duration: 300
        }
    });
}
//#############################################  ????????????????????????  #############################################//



function formatSeconds(value) {
    var theTime = parseInt(value);
    // ???
    var theTime1 = 0;
    // ???
    var theTime2 = 0;
    // ?????? // alert(theTime);
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        // alert(theTime1+"-"+theTime);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = "" + parseInt(theTime) + "";
    if (result < 10) {
        var result = "0" + parseInt(theTime) + "";
        if (10 > theTime1 > 0) {
            result = "0" + parseInt(theTime1) + ":" + result;
        } else {
            result = "" + parseInt(theTime1) + ":" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + ":" + result;
        }
        return result;
    } else {
        if (10 > theTime1 > 0) {
            result = "0" + parseInt(theTime1) + ":" + result;
        } else {
            result = "" + parseInt(theTime1) + ":" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + ":" + result;
        }
        return result;
    }
}

//???????????????????????????
function notify(title, content, extra, updateCurrent) {
    if ($api.getStorage('notify') && $api.getStorage('notify') == 1) {
        updateCurrent = updateCurrent ? updateCurrent : true;
        api.notification({
            sound: '',
            notify: {
                title: title, //???????????????????????????????????????Android??????
                content: content, //?????????????????????'????????????'
                extra: extra, //????????????????????????????????????????????????????????????????????????????????????????????????
                updateCurrent: updateCurrent //????????????????????????????????????????????????true|false??????Android??????
            }
        }, function(ret, err) {
            return ret.id;
        });

    }

}


function openart(aid) { //??????????????????
    var dialogBox = api.require('dialogBox');

    dialogBox.close({
        dialogName: 'tips'
    });
    api.openWin({
        name: 'artistlist_h',
        url: 'widget://html/artist/artist_head.html',
        pageParam: {
            artistId: aid,
        },
        animation: {
            type: "reveal", //??????????????????????????????????????????
            subType: "from_right", //????????????????????????????????????????????????
            duration: 400
        }
    });
}

function openMyGeDan(id) { //???????????????????????????
    api.openFrame({
        name: 'mygedan',
        url: 'widget://html/music/mygedan.html',
        rect: {
            x: 0,
            y: 0,
            w: api.winWidth,
            h: 'auto'

        },
        pageParam: {
            id: id
        },
        bounces: false,
        animation: {
            type: "fade", //??????????????????????????????????????????
            subType: "from_right", //????????????????????????????????????????????????
            duration: 400
        },
        bgColor: 'rgba(0,0,0,0.6)',
        vScrollBarEnabled: true,
        hScrollBarEnabled: true
    });
    var dialogBox = api.require('dialogBox');
    dialogBox.close({
        dialogName: 'tips'
    });

}



function openPhoto(url) { //????????????
    var dd = []
    dd[0] = url
    var imageBrowser = api.require('imageBrowser');
    imageBrowser.openImages({
        imageUrls: dd,
        showList: false,
    });
}

function openMv(vid) { //??????MV
    api.openWin({
        name: 'mvhead',
        url: 'widget://html/mv/mv_head.html',
        pageParam: {
            vid: vid
        },
        animation: {
            type: "movein", //??????????????????????????????????????????
            subType: "from_bottom", //????????????????????????????????????????????????
            duration: 400
        }
    });
}

function openVideo(vid) { //??????MV
    api.openWin({
        name: 'v_head',
        url: 'widget://html/video/v_head.html',
        pageParam: {
            vid: vid
        },
        animation: {
            type: "movein", //??????????????????????????????????????????
            subType: "from_bottom", //????????????????????????????????????????????????
            duration: 400
        }
    });
}
// ??????????????????
function openMusicList(lid) {
    api.openWin({
        name: 'musiclist',
        url: 'widget://html/music/mlist_win.html',
        // reload: true,
        slidBackEnabled: false,
        animation: {
            type: "reveal", //??????????????????????????????????????????
            subType: "from_right", //????????????????????????????????????????????????
            duration: 400 //???????????????????????????300??????
        },
        pageParam: {
            lid: lid
        }
    });
}


function likeSong(id) {
    var music = new neteaseMusic()
    music.getLikeList($api.getStorage('userinfo').userId, function(ret, err) {
        var likelist = ret.ids
        var res = $.inArray(id, likelist);
        if (res == -1) {

            // ?????????????????????
            music.likeOr(true, id, function(ret, err) {
                if (ret.code == 200) {
                    api.toast({
                        msg: '??????',
                        duration: 2000,
                        location: 'bottom'
                    });

                } else {
                    api.toast({
                        msg: '??????',
                        duration: 2000,
                        location: 'bottom'
                    });
                }
            })

        } else {
            // ????????????????????????
            api.confirm({
                buttons: ['??????', '??????'],
                title: '??????',
                msg: '????????????????????????????????????',
            }, function(ret, err) {
                if (ret.buttonIndex == 1) {
                    // ?????????????????????
                    music.likeOr(false, id, function(ret, err) {
                        if (ret.code == 200) {
                            api.toast({
                                msg: '??????',
                                duration: 2000,
                                location: 'bottom'
                            });
                        } else {
                            api.toast({
                                msg: '??????',
                                duration: 2000,
                                location: 'bottom'
                            });
                        }
                    })
                }
            });


        }
    })
}

// ??????????????????
function playMusic(url) {
    var audio = api.require('audioPlayer');
    audio.removeEventListener({
        name: "playing"
    });
    audio.removeEventListener({
        name: "state"
    });
    var audioPlayer = api.require('audioPlayer');
    audioPlayer.pause();
    audioPlayer.initPlayer({
        path: url,
        cache: false
    }, function(ret) {
        if (ret.status) {
            api.sendEvent({
                name: 'isPlaying',
            });
            app.err=false
            app.isPlaying = true
            app.duration = ret.duration
            app.dur = formatSeconds(app.duration);
            audio.addEventListener({
                name: "state"
            }, function(ret) {
               if(ret.state=="finished"){
                 if($api.getStorage('isRepeat')==1){
                   app.play()
                 }else{
                   app.playNext()
                 }
               }
            });
            audioPlayer.addEventListener({
                name: 'playing'
            }, function(ret, err) {

                app.cur = ret.current
                var percent = (app.cur / app.duration) * 100;
                app.per = Math.round(percent);
                app.current = formatSeconds(app.cur);
                app.audioCover()
                app.cur = ret.current
                var percent = (app.cur / app.duration) * 100;
                app.per = Math.round(percent);

                app.current = formatSeconds(app.cur);

                api.sendEvent({
                    name: 'per',
                    extra: {
                        per: app.per,
                        current: app.current
                    }
                });
            });
        } else {
            if (app.err) {

                app.err = false
                app.playNext()
            } else {
                app.err = true
            }

        }
    });

    // var audioStreamer = api.require('audioStreamer');
    // $api.setStorage('isPlaying', true);
    // audioStreamer.openPlayer({
    //     path: url,
    // }, function(ret) {
    //     if (ret.status) {
    //         app.duration = ret.duration
    //         api.sendEvent({
    //             name: 'isPlaying',
    //         });
    //
    //
    //     } else {
    //         console.log(JSON.stringify(ret));
    //     }
    // });
}

/**
 * ?????????????????????????????????????????????????????????????????????
 * @param {Object} arr ??????
 * @param {Object} value ?????????
 */
function isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
            return true;
        }
    }
    return false;
}

function openPerCenter(uid) {
    api.openTabLayout({
        name: 'per_frame',
        url: 'widget://html/per/per_frame.html',
        title: '??????',
        hideNavigationBar: false,
        bounces: false,
        slidBackEnabled: false,
        reload: true,
        pageParam: {
            uid: uid
        },
        navigationBar: {
            background: 'widget://image/hd2.jpg',
            color: '#fff',
            leftButtons: [{
                iconPath: 'widget://image/back.png',
                text: '??????'

            }]
        }
    });
}
function echoInit() {
        echo.init({
                offset :300,
                throttle : 0 //?????????????????????????????????
        });
}
