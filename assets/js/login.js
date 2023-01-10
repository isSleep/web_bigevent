$(function() {
    //点击去注册的链接
    $('#link_reg').on('click',function() {
        $('.login-box').hide()
        $('.reg-box').show()
        
    })

     // 点击"去登录账号"的链接
     $('#link_login').on('click',function() {
        $('.login-box').show()
        $('.reg-box').hide()
        
    })

    //从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    //通过 form.verify() 函数自定义校验规则
    form.verify({
        //自定义一个叫做pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        repwd:function(value) {
            //通过形参得到的是确认密码框中的内容
            //还需要拿到密码框上的值
            //然后进行等于判断
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }  
    })

    //监听注册表单的提交事件
    $('#form_reg').on('submit',function (e) {
        e.preventDefault()
        $.post('/api/reguser',{username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val() },function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
                
            }
            layer.msg('注册成功,请登录')
            //模拟人的点击行为
            $('#link_login').click()
        })
    })

    //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单数据
            data: $(this).serialize(),
            success:function(res) {
                if(res.status !==0 ) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                //将登录成功得到的 token 字符串，保存到localStorage 中
                localStorage.setItem('token',res.token)
                //跳转到后台主页
                //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTA1MCwidXNlcm5hbWUiOiJhYmNkZSIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOiIiLCJlbWFpbCI6IiIsInVzZXJfcGljIjoiIiwiaWF0IjoxNjczMzE0NDA3LCJleHAiOjE2NzMzNTA0MDd9.8PvCejO_1eFXzJ0IKGsrt4NkgKZD2mgKH0gol9lMGnE
                location.href = '/index.html'
            }
        })
         
    })
})