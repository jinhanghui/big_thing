$(function () {
    $('#log').on('click', function () {
        $('.in').hide()
        $('.zhuce').show()
    })
    $('#reg').on('click', function () {
        $('.in').show()
        $('.zhuce').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var rapwd = $('#resure').val()
            if (rapwd !== value) {
                return '两次不一样'
            }
        }
    })
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        $.post('http://ajax.frontend.itheima.net/api/reguser', {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        },
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                $('.ok').click()
            }
        )
    })

    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败!')
                }
                layer.msg('登陆成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})