$(function () {
    var identify=localStorage.getItem('identify');
    if(identify=='书友')window.close();
    //ajax
    $.ajax({
        url: 'http://localhost:3003/page-books',//获取单页书籍
        //会发当前的页面号码过去
        data:{
            page:parseInt(1),
         //page:toString(1),
        },
        Datatype:'json',
        success(data) {
            var result = '';
            for (var i = 0; i < data.length; i++) {
                result += template(data[i]);
            }
            $('.ul2').html(result);
        }
    })
    //分页按钮ajax
    $('.pages>li').click(function(){
        $(this).addClass('pageOn').siblings('li').removeClass('pageOn');
        const page=$(this).text();
        $.ajax({
       url: 'http://localhost:3003/page-books',//获取所有书籍的信息,all-books,
       //会发当前的页面号码过去
       data:{
        page:page,
       },
       Datatype:'json',
       success(data) {
           console.log(data);
           var result = '';
           for (var i = 0; i < data.length; i++) {
               result +=template(data[i]);
           }
           $('.ul2').html(result);
       }
   })
   })
   function template(data){

       return `
       <li>
        <div class="num">${data.index}</div>
        <div class="name">${data.name}</div>
        <div class="writer">${data.writer}</div>
        <div class="monitor">
            <span class='change'>修改</span>
            <span class='dele'>删除</span>
            <span class='inf'>详情</span>
        </div>
       </li>
       `
   }
    //删除书籍事件,
    $('.ul2').on('click', '.dele', function () {
        var result = prompt('您确定要删除这本书?是/否');
        var index=$(this).parents('li').index();
        if (result == '是') {
            alert('删除成功');
            $.ajax({
                 url:'http://localhost:3003/ad-delete',
                 data:{
                     name:$('.name').eq(index).text(),
                 }
             })
            $(this).parents('li').remove();
        }
    })
    //修改书籍信息事件
    $('.ul2').on('click', '.change', function () {
        var name_input = $('<input type="text">');
        var writer_input = $('<input type="text">');
        var index = $(this).parents('li').index();

        var bName = $('.name').eq(index).text();
        var wName = $('.writer').eq(index).text();
        var pre_name=bName;

        $(name_input).val(bName);
        $(writer_input).val(wName);

        $('.name').eq(index).html(name_input);
        $('.writer').eq(index).html(writer_input);

       var after_name='';
        $(name_input).blur(function () {
            var result=prompt("确定修改书名?");
            if(result=='是'){
                after_name= $(this).val();      
                $('.name').eq(index).text($(this).val());
                $.ajax({
                    url:'http://localhost:3003/ad-change',
                   data:{
                       pre_name:pre_name,
                       after_name: after_name,
                    },
                    success(data){
                      pre_name=after_name//更新数据
                    }
                })
            }

        })
        var after_writer="";
        $(writer_input).blur(function () {
            var result=prompt("确定修改作者名?");
            if(result=='是'){
                after_writer= $(this).val();
                $('.writer').eq(index).html($(this).val());
                $.ajax({
                    url:'http://localhost:3003/ad-change',
                    data:{
                       pre_name:pre_name,
                       after_writer: after_writer,
                    }
                })
            }
        })
         
    })

    //点击书名打开书本信息
    $('.ul2').on('click', '.inf', function () {
        var txt = $(this).parents('li').find('.name').text();
        localStorage.removeItem('book_name');
        localStorage.setItem('book_name', txt);
        window.open('book_new.html');
    })

})