const getnowDate = function(){
    var date = new Date()
    var y = date.getFullYear(),
        m = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1),
        d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    return m + '月' + d + '日';
}

const ajax = function(url,method,parmas,succ){
    wx.request({
        url: url, 
        method: method,
        data: parmas,
        header: {
            'content-type': 'application/json' 
        },
        success(res) {
            succ(res.data)
        }
    });
}





module.exports = {
    getnowDate: getnowDate,
    ajax: ajax
}
