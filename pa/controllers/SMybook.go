package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)

type SMyBookControllers struct {
	beego.Controller
}

func (this *SMyBookControllers) SMybook()  {
	//获取信息
	bookname := this.GetString("bookname")
	username := this.GetString("username")
	//bookname := "大国战隼"
	fmt.Println(bookname)

	var pas []*models.Pa
	book := models.Pa{Bookname:bookname}
	use := models.User{Username:username}
	o :=orm.NewOrm()
	o.QueryTable("pa").Filter("bookname",bookname).One(&book)
	o.QueryTable("user").Filter("username",username).One(&use)

	o.QueryTable("Pa").Filter("user__user__Id",int(use.Id)).All(&pas)


	data := [2]RJson{}
	for i:=0;i< len(pas);i++ {
		if pas[i].Id==book.Id{
			data[i].Name = book.Bookname
			data[i].Writer = book.Author
			//fmt.Println(data)
		}
	}
	//fmt.Println(data)
	this.Data["json"]=data
	this.ServeJSON()


}