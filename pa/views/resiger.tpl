<!DOCTYPE html>
<html>
<head>
    <title>用户注册</title>
    <link href="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <script type="text/javascript" src="http://cdn.static.runoob.com/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="http://cdn.static.runoob.com/libs/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
<div class="container">
    <div class="form-group">
        <label for="text">用户名:</label>
        <input type="text" class="form-control username"  placeholder="用户名">
    </div>
    <div class="form-group">
        <label for="text">密码:</label>
        <input type="text" class="form-control password"  placeholder="密码">
    </div>
    <div class="form-group">
        <button class="cnt_land btn-primary" >注册</button>
        <button class="cnt_sign btn-primary">登录</button>
    </div>
    <div>
        <label id="status"></label>
    </div>
</div>
<!--JS部分-->
<script type="text/javascript">
    //登陆功能
    $('.cnt_land').click(function(){
        $.ajax({
            type:'post',
            url:'http://localhost:8080/land',
            data:{
                name:$('.username').val(),
                password:$('.password').val()
            },
            success(inf){
                 console.log(inf);
            }
        })
    })
    //注册
    $('.cnt_sign').click(function(){
        $.ajax({
            type:'post',
            url:'http://localhost:8080/sign',
            data:{
                name:$('.username').val(),
                password:$('.password').val()
            },
            success(inf){
                 console.log(inf);
            }
        })
    })
</script>
</body>
</html>