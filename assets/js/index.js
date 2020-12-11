$(function () {
    $('#exit').on('click', function () {
        layer.confirm('确定退出？', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
        })
    })

    getUserInfo()
})
var layer = layui.layer

//获取，更新基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('请求失败')
                // console.log(res);
            }
            redow(res.data)
        }
    })
}

function redow(user) {
    var name = user.nickname || user.username
    $('#welcome').html(name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var fis = name[0].toUpperCase()
        $('.text-avatar').html(fis).show()
    }
}