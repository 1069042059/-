$(function () {
    //改变搜索栏的val
    var txt = localStorage.getItem('search_name');
    var username=localStorage.getItem('username');
    $('.search>input').val(txt);
    $.ajax({
        url:'http://localhost:3003/search1',//搜索含有相关名字的书籍
        data:{
            name:txt,
        },
        success(inf){
            var result = '';
            for (var i = 0; i < inf.length; i++) {
             result += template(inf[i]);
          }
             $('.list_ul').append(result);
         }
    })
    function template(data){
        return`
        <li>
        <div class="intro">
            <img src="${data.src}" alt="">
            <div class="intro_left">
                <div class="name">${data.name}</div>
                <div class="writer">${data.writer}</div>
                <div class="brief">穿越不可怕，可怕的是穿越到异时空的**
                    。更可怕的是忘了自己是谁？忘了就忘了吧！更更可怕的是脑
                    子里多了一个叫亲爹的系统，好吧！人家都是坑爹，到了米蓝
                    这</div>
               <div class="state">最新更新 心情沉重</div>
            </div>
            <div class="intro_right">
                <div class="sum_char">1234 万总字数</div>
                <div class="sum_recommend">4444 总推荐</div>
                <div class="cnt_book_new">书籍详情</div>
                <div class="cnt_add_book">加入书架</div>
            </div>
         </div>
      </li>
        `
    }

    $.ajax({
        url: 'http://localhost:3003/all-books', //第二个ajax,recommend-books,获取本周推荐的书籍信息
        dataType: 'json',
        success(data) {
            var result1 = '';
            for (var i = 0; i < data.length; i++) {
                result1 += rec_template(data[i]);
            }
            $('.recommend_ul').append(result1);
        }
    })
    function rec_template(data){
        return`
        <li>
        <div class="intro1">
            <img src="${data.src}" alt="">
            <div>
                <h4 class="rec_name">${data.name}</h4>
                <p class="rec_writer">${data.writer}</p>
                <div class="rec_brief">穿越到与地球类似但却魔物横行的危险世界</div>
            </div>
        </div>
      </li>
        `
    }   
    //加入我的书架,ajax
    $('.list_ul').on('click', '.cnt_add_book', function () {
        var book_name=$(this).parents('li').find('.name').text();
        $.ajax({
            url:'http://localhost:3003/add-book',
            data:{
                username:username,
                bookname:book_name
            },
            success(data){
               if(data.state==0){
                   alert("这本书已在书架");
               }else{
                alert("加入成功");
               }
            }
        })
    })
    




    
    //图书搜索事件
    Search('.cnt_search');
    //打开我的书架事件
    MyBook('.cnt_my_book');
    //打开书籍分类事件
    List('.head ul>li');

    //打开书籍详情,此处操作特殊,无法使用main1.js里的封装函数
    $('.list_ul').on('click', '.cnt_book_new', function () {
        //    alert(1);
        var str = $(this).parents('.intro').find('.name').text();
        localStorage.removeItem('book_name');
        localStorage.setItem('book_name', str);
        window.open('book_new.html');

    })
    //点击推荐书籍打开书本详细信息
    Book('.recommend_ul', '.rec_name');


})