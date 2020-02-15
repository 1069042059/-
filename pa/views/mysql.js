var mysql=require('mysql')
var fs=require('fs');
var path=require('path');
var bodyParser = require('body-parser')
const express = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:"3306",
    database:'test',
    multipleStatements: true 
});
connection.connect();

//返回所有书籍的接口
app.get('/all-books',function(req,res){
  var sql="select * from books";
  var m=[];
  connection.query(sql,function(err,result){
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
       return;
     }
    res.json(result);
})
})
//管理员删除书籍接口
app.get('/ad-delete',function(req,res){
  var name=req.query.name;
  var sql="delete from books where name="+'"'+name+'";delete from shelf where bookname="'+name+'"';
  connection.query(sql,function(err,result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
     return;
   }
  })
})
//管理员修改书籍接口
app.get('/ad-change',function(req,res){
  var pre_name=req.query.pre_name;
  var after_name=req.query.after_name;
  var after_writer=req.query.after_writer;
  if(after_writer){
    var sql="update books set writer="+"'"+after_writer+"'"+"where name='"+pre_name+"'";
    connection.query(sql,function(err,result){
      console.log(pre_name,after_writer);
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
       return;
     }
    })
  }
  if(after_name){
    var sql="update books set name="+"'"+after_name+"'"+"where name='"+pre_name+"';update shelf set bookname='"+after_name+"' where bookname='"+pre_name+"'";
    connection.query(sql,function(err,result){
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
       return;
     }
    })
  }
})
//查询单本书籍信息接口
app.get('/search',function(req,res){
  var name=req.query.name;
  var sql="select * from books where name regexp '"+name+"*'";
  connection.query(sql,function(err,req){
    res.json(req);
  })
})
//search1接口,查询含有相关名字的书籍
app.get('/search1',function(req,res){
  var name=req.query.name;
  var sql="select * from books where name regexp '"+name+"'";
  connection.query(sql,function(err,result){
    if(err){
      console.log(res);
      return;
    }
    res.json(result);
  })
})
//my-books,返回用户书架书籍
app.get('/my-books',function(req,res){
   var name=req.query.name;
  var sql="select a.name,a.writer,a.src from books a join shelf b where a.name=b.bookname and b.username='"+name+"'";
   connection.query(sql,function(err,result){
       if(err){
         console.log(err);
         return;
       }
       //console.log(result);
       res.json(result);
   })
})
//search-mybook,用户书架搜索书籍
app.get('/search-mybook',function(req,res){
      var username=req.query.username;
      var bookname=req.query.bookname;
      var sql="select  a.name,a.writer,a.src from books  a join shelf b where a.name=b.bookname and a.name regexp '"+bookname+"*' and b.username='"+username+"'";

      var obj=[];
      connection.query(sql,function(err,result){
        if(result.length==0){
        console.log(err);
          return;
        }
       res.json(result);
      })

})
//delete-mybook用户删除书架书籍
app.get('/delete-mybook',function(req,res){
  var name=req.query.name;
  var username=req.query.username;
  var sql="delete from shelf where username='"+username+"' and bookname='"+name+"'";
  connection.query(sql,function(err,result){
    if(err){
      console.log(err);
      return;
    }
  })
})
//delete-allbooks用户删掉所有书架书籍
app.get('/delete-allbooks',function(req,res){
  var username=req.query.username;
  var sql="delete from shelf where username='"+username+"'";
  connection.query(sql,function(err,result){

  });
})
//用户加书籍到书架接口add-book
app.get('/add-book',function(req,res){
  var username=req.query.username;
  var bookname=req.query.bookname;
  var sql="select * from shelf where username='"+username+"' and bookname='"+bookname+"'";

  connection.query(sql,function(err,result){
     if(result.length==0){
    var sql1="insert into shelf value('"+username+"','"+bookname+"')";
       connection.query(sql1,function(err,req){
         res.json({state:1});
       })
     }else{
       res.send({state:0});
     }
  })
})
//用户登录事件
app.post('/land',function(req,res){
  var username=req.body.name;
  var password=req.body.password;
  var sql="select * from user where name='"+username+"'";
  connection.query(sql,function(err,result1){
    if(err){
      console.log(err);
      return;
    }
    if(result1.length==0){
      res.send({state:0});
    }
    if(result1.length>0){
      if(parseInt(password)==(result1[0].password)){
        res.json({state:1,identify:result1[0].identify});
        console.log("成功");
      }else{
        res.json({state:0});
      }
    }
    
  })
})
//用户注册实事件
app.post('/sign',function(req,res){
  var username=req.body.name;
  var password=req.body.password;
  var sql="select * from user where name='"+username+"'";
  connection.query(sql,function(err,result1){
    if(err){
      console.log(err);return;
    }
    if(result1.length>0){
      res.json({state:0});
      return;
    }
    var sql1="insert into user value('"+username+"','"+password+"','普通用户')";
    connection.query(sql1,function(err,result2){
      if(err){
        console.log(err);return;
      }
     res.send({state:1,identify:"普通用户"});
    })

  })
})
const server = app.listen(3003, function () {
      console.log('Express app server listening on port %d', server.address().port);
    });
  