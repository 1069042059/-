$(function () {

   //第一个AJAX,本周推荐  
   $.ajax({
    url: 'http://localhost:3003/recommend-books', //recommend-books,获取本周推荐的书籍信息
    dataType: 'json',
    success(data) {
       // console.log(data);
        var str = '<li class="on">' + data[0].name + '</li>';
        var str_img = '<img src="' + data[0].src + '">';
        // <img src="im/2.jpg" style="display: none">
        for (var i = 1; i < data.length; i++) {
            str += '<li>';
            str += data[i].name;
            str += '</li>';
            str_img += '<img src="' + data[i].src + '" display:none>';
            if(i==5)break;//这里只用得到六本书
        }
        console.log(str_img);
        $('.recommend>ul').html(str);
        $('.lunbo').append(str_img);
    }

    })

  //ajax函数封装,用于排行榜的重复操作
  function Ajax(url, index) {
    $.ajax({
        url: url, //后端接口
        dataType: 'json',
        success(data) {
            // console.log(data);
            var str = '<ul>';
            for (var i = 0; i < data.length&&i<=9; i++) {
                str += template1( data[i]);
            }
            str += '</ul>'
            $('.parent_li').eq(index).html(str);
        }
    })
}
//第二个AJAX排行榜,rank-books
Ajax('http://localhost:3003/all-books', 0);//原创风雨榜
Ajax('http://localhost:3003/all-books', 1);//24小时热销
Ajax('http://localhost:3003/all-books', 2);//新增粉丝
Ajax('http://localhost:3003/all-books', 3);//阅读指数
Ajax('http://localhost:3003/all-books', 4);//签约作者新书

function template1(data){
    let result='';
    result+=`
    <li class="child_li">
    <span style=" color: white;" class="book_index">${data.id}</span>
    <div class="information" style=" color: #838383;">
    <span class="book_name" style="float: left; ;">${data.name}</span>
    <span class="book_renqi" style="float: right;";">1234</span>
    </div>
    </li>
    `
    return result;
}





    $('.head1').hide();
    $('.lift').hide();
    $('.cnt_close').click(function () {
        $('.bg').hide();
        $(this).parent().hide();
    })


    //轮播图部分
    window.img_index = 0;

    function show(index) {
        $(".lunbo>img").eq(index).show().siblings('img').hide();
        $(".lunbo>ul>li").eq(index).addClass('on').siblings('li')
            .removeClass('on');
        $('.recommend>ul>li').eq(index).addClass('on').siblings('li').removeClass('on');

    }
    var timer = setInterval(function () {
        window.img_index++;
        if (window.img_index == 6) window.img_index = 0;
        show(window.img_index);
    }, 2000)
    $('.lunbo>ul>li').click(function () {
        var cur_index = $(this).index();
        window.img_index = cur_index;
        show(cur_index);
    })
    //头部滚动导航栏事件,右侧电梯导航栏
    var top_max = $('.cont_head').offset().top;
    var top_max1 = $('.cont_foot').offset().top - 50;
    $(window).scroll(function () {
        if ($(document).scrollTop() >= top_max) {
            $('.head1').stop().slideDown('slow');
            $('.lift').stop().fadeIn('slow');
        } else {
            $(".head1").stop().slideUp('slow');
            $('.lift').stop().fadeOut('slow');
        }

        if ($(document).scrollTop() >= top_max1 - 40) {
            $('.lift li').removeClass('on_lift');
            $('.lift li').eq(1).addClass('on_lift');
        } else {
            $('.lift li').removeClass('on_lift');
            $('.lift li').eq(0).addClass('on_lift');
        }
    })
    $('.lift li').eq(0).click(function () {
        $('html,body').stop().animate({
            scrollTop: top_max,
        })
    })
    $('.lift li').eq(1).click(function () {
        $('html,body').stop().animate({
            scrollTop: top_max1,
        })
    })
    $('.lift li').eq(2).click(function () {
        $('html,body').stop().animate({
            scrollTop: 0,
        })
    })
    //书籍点击跳出book_new页面,//因操作特殊,无法使用main1.js中的封装函数
    $('.parent_li').on("click", ".child_li", function () {
        var index = $(this).index();
        var str = $(".book_name").eq(index).text();
         localStorage.removeItem('book_name');
           localStorage.setItem('book_name', str);
           window.open('book_new.html');
    })
    //打开我的书架
    MyBook('.cnt_my_book');

    //打开书籍分类
    List('.mid_left>ul>li');
    List('.head1 ul>li');

    
    //本周推荐点击打开书本信息事件
    Book('.recommend', 'li');

    
    //点击搜索事件
    Search('.cnt_search');

    
})