/*
 * ku music api
 * Copyright (c) 2019  iqimeng.com
 */
 
(function(window) {

    shareApi = 'https://www.iqimeng.com/v2';
    musicApi = 'https://api.iqimeng.com';

    // musicApi = 'https://daiwei.site/netease'

    timestamp = Date.parse(new Date());
    var u = {};
    var isAndroid = (/android/gi).test(navigator.appVersion);

    u.tool = function(dourl, params, callback) { //公共方法调用ajax



        var url = musicApi + dourl
            // 可选地，上面的请求可以这样做
        if (typeof callback !== 'function') { //检查回调函数是否可用调用的
            callback = false;
        }

        $.ajax({
            url: url,
            xhrFields: {
                withCredentials: true
            },
            data: params,
            cache: true,
            success: function(ret) {
                callback(ret)
            },
            error: function(err) {
              callback(err)
            }
        })
    };
  
    u.getartists = function(params, callback) { //获取热门歌手
        this.tool('/top/artists', params, function(ret, err) {
            // console.log(JSON.stringify(ret));
            callback(ret, err)
        })
    }
    u.getMusicInfo = function(params, callback) { //获取歌曲详情
        this.tool('/song/detail', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.checkIsPlay = function(params, callback) { //检查歌曲是否可以播放
            this.tool('/check/music', params, function(ret, err) {
                callback(ret, err)
            })
        }
        //获取MP3 地址
        //可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
    u.getMp3Url = function(params, callback) {
        this.tool('/song/url', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.search = function(params, callback) { //搜索
        this.tool('/search', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getMvList = function(params, callback) { //获取M热门Vlist
        this.tool('/top/mv', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getNewMvList = function(params, callback) { //获取最新MVlist
        this.tool('/mv/first', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getLyric = function(params, callback) { //获取歌词信息
        this.tool('/lyric', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.logout = function(callback) { //登出
        this.tool('/logout', null, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getListDetail = function(params, callback) { //获取歌单详情

        this.tool('/playlist/detail', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getUserLikeLlistID = function(params, callback) { //获取用户LIKEID

        this.tool('/user/playlist', params, function(ret, err) {
            ret = ret.playlist[0].id
            callback(ret, err)
        })
    }
    u.loginCellphone = function(params, callback) { //手机登录

        this.tool('/login/cellphone', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.loginStatus = function(callback) { //获取登录状态

        this.tool('/login/status', null, function(ret, err) {
            callback(ret, err)
        })
    }
    u.loginRefresh = function(callback) { //刷新登录

        this.tool('/login/refresh', null, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getmv = function(params, callback) { //获取MV 信息

        this.tool('/mv/detail', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getMvUrl=function(params, callback) { //获取MV url

        this.tool('/mv/url', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getmvSub = function(callback) { //收藏的MV 信息

        this.tool('/mv/sublist', null, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getVideo = function(params, callback) { //获取视频信息
        this.tool('/video/detail', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getVideoUrl = function(params, callback) { //获取视频地址
        this.tool('/video/url', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.Vsimi = function(params, callback) { //获取相似视频
        this.tool('/related/allvideo', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getVideoCom = function(params, callback) { //获取视频地址
        this.tool('/comment/video', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getHotVideo = function(params, callback) { //获取分类视频列表
        this.tool('/video/group', params, function(ret, err) {

            callback(ret, err)
        })
    }
    u.simi = function(params, callback) { // 获取相似mv
        this.tool('/simi/mv', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getNewAlbumList = function(callback) { // 获取新碟上架
        this.tool('/album/newest', null, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getAlbumList = function(params, callback) { // 获取专辑信息
        this.tool('/album', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.createNewGeDan = function(params, callback) { // 新增歌单
        this.tool('/playlist/create', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getUserPlaylist = function(params, callback) { // 获取用户歌单
        this.tool('/user/playlist', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.checkPhone = function(params, callback) { // 验证电话是否注册过
        this.tool('/cellphone/existence/check', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.sendMsg = function(params, callback) { // 发送验证码
        this.tool('/captcha/sent', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.checkCaptcha = function(params, callback) { // 检查验证码
        this.tool('/captcha/verify', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.register = function(params, callback) { // 注册
        this.tool('/register/cellphone', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.getUserInfo = function(params, callback) { // 获取用户信息
        this.tool('/user/detail', params, function(ret, err) {
            callback(ret, err)
        })
    }
    
    u.getUserSubcount = function(callback) { // 获取用户信息 , 歌单，收藏，mv, dj 数量
        this.tool('/user/subcount', null, function(ret, err) {
            callback(ret, err)
        })
    }
    u.follow = function(params, callback) { // 关注/取消关注用户
        this.tool('/follow', params, function(ret, err) {
            callback(ret, err)
        })
    }
    u.subArt = function(params, callback) { //收藏或取消歌手
        this.tool('/artist/sub', params, function(ret, err) {
            callback(ret, err);
        })
    }
    u.delPlayList = function(params, callback) { //删除歌单
        this.tool('/playlist/delete', params, function(ret, err) {
            callback(ret, err);
        })
    }
    u.GetRecommend = function(callback) { //推荐
        this.tool('/recommend/resource', null, function(ret, err) {
            callback(ret, err);
        })
    }
    u.likeOr = function(params, callback) { //喜欢、取消喜欢
        this.tool('/like', params, function(ret, err) {
            callback(ret, err);
        })
    }
    u.GetMsg = function(params, callback) { //获取消息
        this.tool('/msg/private', params, function(ret, err) {
            return callback(ret, err);
        })

    }
    u.GetNotices = function(params, callback) { //获取消息通知
        this.tool('/msg/notices', params, function(ret, err) {
            return callback(ret, err);
        })
    }
    u.GetMsgComments = function(params, callback) { //获取消息通知
        this.tool('/msg/comments', params, function(ret, err) {
            return callback(ret, err);
        })
    }
    u.getArtistAlbum = function(params, callback) { //获取歌手专辑
        this.tool('/artist/album', params, function(ret, err) {
            return callback(ret, err);
        })
    }
    u.getArMv = function(params, callback) { //获取歌手MV
        this.tool('/artist/mv', params, function(ret, err) {
            return callback(ret, err);
        })
    }
    u.getuserfollow = function(params, callback) { //获取用户关注列表或粉丝
        var ii = params.is ? 'follows' : 'followeds'
        this.tool('/user/' + ii, params, function(ret, err) {
            return callback(ret, err);
        })
    }
    u.getCom = function(params, callback) {
        this.tool('/comment/' + params.comtype, params, function(ret, err) {
            return callback(ret, err);
        })
    }
    u.getLikeList = function(params, callback) { //获取喜欢列表
        this.tool('/likelist', params, function(ret, err) {
            return callback(ret, err);
        })
    }
    u.comment = function(params, callback) { //评论
        this.tool('/comment', params, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.getArSub = function(callback) { //获取收藏歌手
        this.tool('/artist/sublist', null, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.getArInfo = function(params, callback) { //获取歌手信息
        this.tool('/artists', params, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.getDailySong = function(callback) { //获取歌手信息
        this.tool('/recommend/songs', null, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.playlistSub = function(params, callback) { //获取收藏歌单
        this.tool('/playlist/subscribe', params, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.albumSub = function(params, callback) { //获取收藏专辑
        this.tool('/album/sublist', params, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.getAlbumInfo = function(params, callback) { //获取收藏专辑
        this.tool('/album', params, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.getTopList = function(callback) { //获取榜单列表
        this.tool('/toplist', null, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.getBannerList = function(params, callback) { //获取banner
        this.tool('/banner', params, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.playlistEdit = function(params, callback) { //对歌单添加或删除歌曲
        // op: 从歌单增加单曲为 add, 删除为 del
        // pid: 歌单 id tracks: 歌曲 id,可多个,用逗号隔开
        this.tool('/playlist/tracks', params, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.getTopPlaylist = function(params, callback) { //获取网友精选碟歌单
        // 可选参数 : order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
        // cat:cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
        this.tool('/top/playlist', params, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.getUserFollows = function(params, callback) { //对歌单添加或删除歌曲
        // 必选参数 : uid : 用户 id
        this.tool('/user/follows', params, function(ret, err) {
            return callback(ret, err)
        })
    }
    u.userUpdate = function(params, callback) { //更新用户信息

        this.tool('/user/update', params, function(ret, err) {
            return callback(ret, err)
        })
    }

    u.personalized=function(callback){
      this.tool('/personalized?limit=6', null, function(ret, err) {
          return callback(ret, err)
      })
    }

    u.getArList = function(params, callback) { //获取歌手列表
             var params=params||null
            this.tool('/artist/list', params, function(ret, err) {
                return callback(ret, err)
            })
        }
    u.commentLike = function(params, callback) { //评论点赞
                 var params=params||null
                this.tool('/comment/like', params, function(ret, err) {
                    return callback(ret, err)
                })
            }
    u.getHightqualityPlayList=function(params, callback){//获取精品歌单
        var params=params||null
        this.tool('/top/playlist/highquality', params, function(ret, err) {
            return callback(ret, err)
        })
    }   
 
        /*end*/

    window.$ku = u;

})(window);
