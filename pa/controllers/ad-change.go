package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)

type  AdchangeController struct {
	beego.Controller
}

func (this *AdchangeController) AdChange()  {
	//获取信息
	bookname := this.GetString("pre_name")
	booknames := this.GetString("after_name")
	fmt.Println(bookname,booknames)
	//bookname := "大国战隼"
	writer := this.GetString("after_writer")
	fmt.Println(writer)
	//writer:="蔡瑞金"



	book := models.Pa{Bookname:bookname}
	o :=orm.NewOrm()
	o.QueryTable("pa").Filter("bookname",bookname).One(&book)

	//在这里改变内容
	if len(writer)>0{     //改作者
		book.Author=writer
	}
	if len(booknames)>0{
		book.Bookname=booknames//改书名
	}


	n ,err:= o.Update(&book)
	response := ReJson{State:0,Message:"ok"}
	if err != nil {
		response.Message="no"
		response.State=500
	}else {
		response.State=int(n)
	}

	//fmt.Println(book,n)
	this.Data["json"] = response
	this.ServeJSON()
}