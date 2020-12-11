$(function () {

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    var p = {
        pagenum: 1,//分几页
        pagesize: 3,//每页显示几条
        cate_id: '',
        state: ''
    }

    initTable()
    //获取文章列表请求
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlStr = template('tpl-table', res)
                console.log(htmlStr);
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    inicate()

    function inicate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('#getup').html(htmlStr)
                form.render()
            }
        })
    }

    $('#btn-cate').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        p.cate_id = cate_id
        p.state = state
        initTable()
    })

    // 定义渲染分页
    function renderPage(total) {
        laypage.render({
            elem: 'page',//注意，这里的 test1 是 ID，不用加 # 号
            count: total,//数据总数，从服务端得到
            limit: p.pagesize,
            curr: p.pagenum,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],

            jump: function (obj, first) {
                p.pagenum = obj.curr
                p.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    //删除文章
    $('body').on('click', '#delet-btn', function () {
        var id = $(this).attr('data-del')
        var len = $('#delet-btn').length
        layer.confirm('确认删除?', { icon: 2, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        p.pagenum = p.pagenum === 1 ? 1 : p.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });
    })
})






