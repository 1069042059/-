$(function () {
    //更改title,先获取先前存好的list_name
    var txt = localStorage.getItem('list_name');
    $('.title').text(txt);
    $.ajax({
        url: "http://localhost:3003/all-books", //第一个AJAX,获取相应的分类书籍信息,list-books:
        //这里会把list_name发过去
         data:{
            list_name:txt,
         },
        dataType: 'json',
        success(data) {
            var cur = 0;
            var str = '<li>';
            for (var i = 0; i < data.length; i++) {
                cur++;
                str +=template(data[i]);
                if (cur == 4) {
                    cur = 0;
                    str += '</li>';
                    $('.book_list').append(str);
                    str = '<li>';
                }
            }
        }
    })
    function template(data){
        return`
        <div class="info1">
        <img src="${data.src}" alt="" style="height: 100%;">
        <h4 class="name">${data.name}</h4>
        <p class="intro">冰封的神话世界,重现世间</p>
        <div class="writer">${data.writer}</div>
       </div>
        `
    }
    //点击书名打开书本详细信息
    Book('.book_list', '.name');

    //打开我的书架事件
    MyBook('.cnt_my_book');
    //打开书籍分类事件
    List('.head ul>li');
    //图书搜索事件
    Search('.cnt_search');

})