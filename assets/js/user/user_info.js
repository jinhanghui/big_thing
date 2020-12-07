$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '输入长度需在1-6个字符'
            }
        }
    })

    // 初始化用户基本信息
    function initInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                // console.log(res);
                form.val('UserInfo', res.data)
            }
        })
    }
    initInfo()

    //重置信息
    $('#refsh').on('click',function(){
        initInfo()
    })


    //更新用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')
                window.parent.getUserInfo()
            }

        })
    })
})