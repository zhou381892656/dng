//app.js
App({

  globalData: {
        token: null,
        hasRoom: null,
        coupon_code: null,//优惠券码
        userInfo: null,
        host:'https://friend.dngver.com',
  },  
  onLaunch: function () {
    wx.getSystemInfo({
      success: res => {
        console.log(res)
        this.globalData.headerHeight = res.statusBarHeight + 46;
      }
    })

    

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId

      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  wxRequest(method, url, data, token, callback, errFun) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'token': token
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {
        errFun(res);
      }
    })
  },
  // 公共分享
  globalShare() {
    return {
      title: "这是我在.DNG定格拍的照片，快来看",
      path: "/pages/index/index",
      imageUrl: "/pages/images/share.jpg",
      success: function (a) { }
    };
  },
 
})