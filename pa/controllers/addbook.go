package controllers

import (
	"database/sql"
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)

type  AddControllers struct {
	beego.Controller
}

func (this * AddControllers) AddBook()  {
	username := this.GetString("username")
	bookname := this.GetString("bookname")
	//username := "aaa"
	//bookname := "诸天谍影"
	fmt.Println(username,bookname)

	response := ReJson{State:500,Message:"ok"}

	use := models.User{}
	book := models.Pa{}
	o := orm.NewOrm()
	o.QueryTable("User").Filter("username",username).All(&use)
	o.QueryTable("Pa").Filter("bookname",bookname).All(&book)
	//用用户名得到用户id，用书名得到书的id

	if book.Id!=0{
		db, _ := sql.Open("mysql", "root:App123@tcp(localhost:3306)/godbdemo?charset=utf8")
		stmt,_ := db.Prepare("INSERT pa_users SET pa_id=?,user_id=?")
		_, err :=stmt.Exec(book.Id,use.Id)
		//将书的id和用户的id存入多对多的表单中
		db.Close()
		if err != nil {
			response.Message="no"
			response.State=0
		}
	}else{
		response.Message="no"
		response.State=500
	}
	this.Data["json"] = response
	this.ServeJSON()




}