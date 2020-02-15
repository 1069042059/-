package controllers

import (
	"database/sql"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)

type DMyBookControllers struct {
	beego.Controller
}


func (this *DMyBookControllers) DMyBook()  {
	bookname := this.GetString("name")
	username := this.GetString("username")
	//bookname:="诸天谍影"
	//username:="aaa"

	book := models.Pa{Bookname:bookname}
	use := models.User{Username:username}
	o :=orm.NewOrm()
	o.QueryTable("pa").Filter("bookname",bookname).One(&book)
	o.QueryTable("user").Filter("username",username).One(&use)


	db, _ := sql.Open("mysql", "root:App123@tcp(localhost:3306)/godbdemo?charset=utf8")
	stmt,_:=db.Prepare("select * from pa_users where pa_id=?")
	rows ,_ :=stmt.Query(book.Id)

	for rows.Next(){ //循环显示所有的数据
		var id,books,name int
		rows.Scan(&id, &books,&name)
		//fmt.Println(name)
		if name==use.Id{

			db.Exec("delete from pa_users where id = ?", id);
		}
	}
		db.Close()
}
