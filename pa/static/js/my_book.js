$(function () {
    
    var username = localStorage.getItem('username');
    if (username) {
            $('.username').text("书友:" +username);
    } 
      
    $.ajax({
        url: 'http://localhost:3003/my-books', //,发送用户名,返回该用户书库的书籍
        data:{name:username},
        success(data) {
            var result = '<ul class=my_list>';
            for (var i = 0; i < data.length; i++) {
                result += template(data[i]);
            }
            result += '</ul>'
            //console.log(result);
            $('.list').html(result);
        }
    })
    function template(data){
        return`
        <li>
        <div class="binggo"><span></span></div>
        <div class="name">${data.name}</div>
        <div class="writer">${data.writer}</div>
        <span class="close"><svg t="1579435450490" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2678" width="20" height="20">
                <path
                    d="M842.947458 778.116917 576.847937 512.013303 842.946434 245.883083c8.67559-8.674567 13.447267-20.208251 13.43908-32.477692-0.008186-12.232602-4.7727-23.715121-13.414521-32.332383-8.655124-8.677637-20.149922-13.450337-32.384571-13.4575-12.286838 0-23.808242 4.771677-32.474622 13.434987L512.019443 447.143876 245.88206 181.050496c-8.66331-8.66331-20.175505-13.434987-32.416294-13.434987-12.239765 0-23.75196 4.770653-32.414247 13.43294-8.66024 8.636704-13.428847 20.12434-13.437034 32.356942-0.008186 12.269441 4.76349 23.803125 13.437034 32.476669l266.135336 266.13022L181.050496 778.11794c-8.664334 8.66331-13.43601 20.173458-13.43601 32.41527 0 12.239765 4.7727 23.752983 13.437034 32.417317 8.662287 8.66331 20.173458 13.43294 32.413224 13.43294 12.240789 0 23.754007-4.770653 32.416294-13.43294l266.134313-266.100544 266.101567 266.100544c8.66331 8.66331 20.185738 13.43294 32.4429 13.43294 12.265348-0.008186 23.74889-4.771677 32.369222-13.412474C860.81643 825.081555 860.821547 795.991006 842.947458 778.116917z"
                    p-id="2679" fill="#cdcdcd"></path>
            </svg></span>
      </li>
        `
    }
    //用户搜索书架中的书籍
    $('.search_btn').click(function () {
        var value = $('.search').val();
        if(value){
            $.ajax({
                url:"http://localhost:3003/search-mybook",
                data:{
                    username:username,
                    bookname:value,
                },
                success(inf){
                        if(inf.state==1){
                            alert("这本书不存在");
                            return;
                        }
                        var result ='';
                        for(var i=0;i<inf.length;i++){
                            result+=template(inf[i]);
                        }
                        $('.list').html(result);
                        $('.search').val(" ");
                }
            })
        }

    })

    //点击删除事件
    $('.list').on("click", '.close', function () {
        var name=$(this).parents('li').find('.name').text();
        $.ajax({
            url:'http://localhost:3003/delete-mybook',//删除书籍
            data:{
                username:username,
                name:name,
            }
        })

        $(this).parents('li').remove();
    })
    $('.list').on('click', '.binggo', function () {
        $(this).children('span').toggleClass('current');
    })
    //全选事件
    $('.all ,.all1').click(function () {
        $('.all ,.all1').find('span').toggleClass('current');
        if ($('.all').find('span').hasClass('current')) {
            $('.binggo').find('span').each(function (index, ele) {
                if (!$(ele).hasClass('current')) {
                    $(ele).addClass('current');
                }
            })
        } else $('.binggo').find('span').removeClass('current');
    })
    //删除选定目标
    $('.close_goal').click(function () {
        if ($('.all').find('span').hasClass('current')) {
            $('.all,.all1').find('span').removeClass('current');
            $.ajax({
                url:'http://localhost:3003/delete-allbooks',//删除所有书籍
                data:{
                    username:username,
                }
            })
            $('.list').empty();
            return;
        }
        $('.binggo').find('span').each(function (index, ele) {
            if ($(ele).hasClass('current')) {
                var name=$(this).parents('li').find('.name').text();
                $.ajax({
                    url:'http://localhost:3003/delete-mybook',//删除书籍
                    data:{
                        username:username,
                        name:name,
                    }
                })
                $(this).parents('li').remove();
            }
        })
    })

    //置顶事件
    $('.cnt_top').click(function () {
        $('.binggo').find('span').each(function (index, ele) {
            if ($(ele).hasClass('current')) {
                $(ele).removeClass('current');
                var str = $(ele).parents('li').clone(false);
                $(ele).parents('li').remove();
                $('.list').prepend(str);
                $(this).removeClass('current');
            }
        })
    })
    //点击打开书本详细信息
    Book('.list', '.name');


    // 点击按钮跳回首页
    $('.index').click(function () {
        location.href = 'index.html'
    })
        

})