$(function () {

    var layer = layui.layer
    var form = layui.form

    initAlias()
    //获取文章列表
    function initAlias() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    $('#btn').on('click', function () {
        layer.open({
            title: '添加文章分类',
            area: ['500px', '250px'],
            type: 1,
            content: $('#alins-add').html()
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增失败')
                }
                initAlias()
                layer.msg('新增成功')
                layer.closeAll()
            }
        })
    })

    $('body').on('click', '#edit-btn', function () {
        layer.open({
            title: '修改文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#alins-edit').html()
        });

        var id = $(this).attr('data-index')

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('formDem', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')
                initAlias()
                layer.closeAll()
            }
        })
    })

    $('tbody').on('click', '#del-btn', function () {
        var id = $(this).attr('data-del')
        layer.confirm('确定删除？', { icon: 2, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    initAlias()
                    layer.closeAll()
                }
            })
            layer.close(index);
        });
    })
})