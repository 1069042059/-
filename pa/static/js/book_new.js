$(function () {
    //先获取事先存好的书本名字
    var username=localStorage.getItem('username');
    var txt = localStorage.getItem('book_name');
    $.ajax({
        url:'http://localhost:3003/search',//获取单本书的接口
        data:{
            name:txt,
        },
        success(data){
            var result=template(data[0]);
           $('.container').html(result);
        }
    })
    function template(data){
        return `
        <div class="head">
        <div class="head_left">
            <img src="${data.src}" alt="">
        </div>
        <div class="head_mid">
            <div class="new">
                <h3 class="name" style="float: left;font-size: 25px;margin-right: 20px;">${data.name}</h3>
                <p class="writer" style="float: left;">${data.writer}</p>
            </div>
            <div class="new1">
                <ul>
                    <li>完本</li>
                    <li>签约</li>
                    <li>VIP</li>
                    <li>历史</li>
                    <li>架空历史</li>
                </ul>
            </div>
            <div class="new2">
                <p style="color: #262626;font-size: 15px;">醒掌天下权，醉卧美人膝，五千年风华烟雨，是非成败转头空！</p>
            </div>
            <div class="new3">
                <ul>
                    <li><span>12.123</span>万字</li>
                    <li><span>13.43</span>万总推荐</li>
                    <li><span>15.64</span>周推荐</li>
                </ul>
            </div>
            <div class="new4">
                <ul>
                    <li style="background-color: #BF2C24;color: white;">免费试读</li>
                    <li class="cnt_add_book">加入书架</li>
                    <li>投票互动</li>
                    <li style="background-color: #BF2C24;color: white;">手机app阅读</li>
                </ul>
            </div>
        </div>
        <div class="head_right">
            <div class="right_top">
                <div class="score" style="font-size: 35px; text-align: center;">9.2</div>

            </div>
            <div class="right_bottom">
                    <span ><svg t="1579487623657" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2686" width="32" height="32"><path d="M860.1728 888.337067H802.474667V804.096h56.925866a27.127467 27.127467 0 0 0 27.2896-27.3024V225.365333c0-79.556267-57.314133-144.2944-127.492266-144.2944H264.029867C193.847467 81.066667 136.533333 145.8048 136.533333 225.361067v620.855466c0 2.3424 0.388267 4.680533 0.7808 6.6304C140.4288 903.150933 180.9792 942.933333 230.101333 942.933333h630.0672a27.127467 27.127467 0 0 0 27.293867-27.298133c0-15.210667-12.475733-27.298133-27.293867-27.298133zM264.797867 136.533333h494.404266C799.300267 136.533333 832 176.708267 832 226.248533v524.245334H230.929067c-14.016 0-27.2512 3.1232-38.929067 8.9728V226.248533C192 176.712533 224.311467 136.533333 264.797867 136.533333zM192 844.8c0-23.7056 17.245867-42.666667 38.4128-42.666667H750.933333v85.333334H230.4128c-21.162667 0-38.4128-19.357867-38.4128-42.666667z" p-id="2687" fill="#bfbfbf"></path></svg></span>
                    <span style="font-size: 15px;">订阅</span> 
           </div>
         </div>
    </div>
    <div class="bar">
       <div class="information">
           作品信息
       </div>
       <div class="list">目录(825章节)</div>
    </div>
    <div class="intro">
        <p>积善之家，必有余庆，留余庆，留余庆，忽遇恩人；幸娘亲，幸娘亲，积得阴功。劝人生，济困扶穷……而谁可知，人生于世，上承余庆，终究却是要自己做出道路抉择，正是所谓岔枝发：
            　　东风携云雨，幼藤吐新芽。
            　　急催如颦鼓，洗尽茸与华。
            　　且待朝阳至，绿遍庭中架。
            　　更盼黄叶时，采得数枚瓜。
            　　……
            　　……</p>
    </div>
        `
    }
    //打开我的书架事件
    MyBook('.cnt_my_book');
    //打开书籍分类事件
    List('.head1 ul>li');
    //加入书架事件
    $('.container').on('click', '.cnt_add_book', function () {
        var book_name=$('.container').find('.name').text();
        console.log(book_name);
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
    
})