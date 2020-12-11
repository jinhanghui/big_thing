$(function () {

    var layer = layui.layer
    var form = layui.form


    initCate()
    initEditor()
    //获取文章列表
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlStr = template('tpl-art', res)
                $('#art').html(htmlStr)
                form.render()
            }
        })
    }

    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#tip').on('click', function () {
        $('#choseimg').click()
    })
    $('#choseimg').on('change', function (e) {
        var filelist = e.target.files
        if (filelist === 0) {
            return layer.msg('请选择图片')
        }
        var file = e.target.files[0]

        var newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    var atr = '已发布'
    $('#savedate1').on('click', function () {
        atr = '存为草稿'
    })

    $('#form-on').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append('state', atr)

        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                pubArt(fd)
            })
    })

    function pubArt(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data:fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布失败')
                }
                layer.msg('发布成功')
                location.href = '../../../article/article_list.html'
            }
        })
    }
})