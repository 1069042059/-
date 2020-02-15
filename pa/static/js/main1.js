 //打开书籍分类list页的函数封装:
 function List(dom) {
     $(dom).click(function () {
         var str = $(this).text();
         localStorage.removeItem('.list_name');
         localStorage.setItem('list_name', str);
         window.open("list.html");
     })
 }
 //书籍搜索函数封装:
 function Search(dom) {
     $(dom).click(function () {
         var str = $(this).siblings('input').val();
         localStorage.removeItem('search_name');
         localStorage.setItem('search_name', str);
         window.open('search.html');
     })
 }
 //打开书库函数封装
 function MyBook(dom) {
     $(dom).click(function () {
         //先检查是否已登录
         var str = '登录/注册';
         var str1 = '登录/注册登录/注册';
         var text = $('.cnt_land').text();

         if (text == str||text==str1) {
             $('.land').show();
             $('.bg').show();
         } else {
             location.href='my-book.html';
         }
     })
 }
 //打开书本详细信息函数封装:
 function Book(parent, child) {
        $(parent).on('click', child, function () {
         // alert(1);
             var str = $(this).text();
             localStorage.removeItem('book_name');
             localStorage.setItem('book_name', str);
             window.open('book_new.html');
         

     })
 }