$(function () {
      ///登录注册事件

    if (localStorage.getItem('username')) {
        
       //如果本地已经存储用户登录账号,就先登录
        login();
        //注销事件
        logout();
    }
   //登录函数封装
    function login() {
        var name = localStorage.getItem('username');
        var identify=localStorage.getItem('identify');
        var li2 = $('<li class="out">注销</li>');
        $('.head_ul2').append(li2);
        $('.cnt_land').text(identify+":" +name);
        $('.cnt_land').off();
    }
    //注销事件函数封装
    function logout() {
        $('.head_ul2').on('click', '.out', function () {
            //alert(1);
            var name = localStorage.getItem('username');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
            localStorage.removeItem('identify');
            $(this).remove();
            $('.cnt_land').text('登录/注册');
            $('.cnt_land').click(function () {
                $('.land').show();
                $('.bg').show();
            })
            $('.username').val(name);
        })
    }

    //登录注册ajax
    $('.land_in').click(function () {
        var name = $('.username').val();
        var password = $('.password').val();
        if (name == '' || password == '') {
            alert('用户名/密码 不能为空');
            return;
        }
        $.ajax({
            url:'http://localhost:3003/land',
            type:'post',
            data: {
                name:name,
                password:password,
            },
            success(data){
                if(data.state==0){
                    alert("用户名不存在或密码错误");
                    return;
                }
                    localStorage.setItem('username', name);
                    localStorage.setItem('password', password);
                    var identify='';
                    var identify=data.identify;
                    localStorage.setItem('identify',identify);
                    $('.land').hide();
                    $('.bg').hide();
                    //如果是管理员,会自动打开管理页面
                    if(identify=='管理员'){
                        window.open("ad.html");
                    }
                    login();
                    window.location.reload();
            }
        });
       

    })
    //注册事件ajax
    $('.sign_in').click(function(){
        var name = $('.username').val();
        var password = $('.password').val();
        if (name == '' || password == '') {
            alert('用户名/密码 不能为空');
            return;
        }
        $.ajax({
            url:'http://localhost:3003/sign',
            type:'post',
            data: {
                name:name,
                password:password,
            },
            success(data){
                if(data.state==0){
                    alert("用户名已存在");
                    return;
                }
                    localStorage.setItem('username', name);
                    localStorage.setItem('password', password);
                    var identify='';
                    var identify=data.identify;
                    localStorage.setItem('identify',identify);
                    $('.land').hide();
                    $('.bg').hide();
                    login();
                    window.location.reload();
            }
    })
})
    
    
     //登录注册表格显示隐藏
     $('.cnt_land').click(function () {
        $('.land').show();
    })
    $('.cnt_close').click(function () {
        $('.land').hide();
    })


})