package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)

type  SearchallController struct {
	beego.Controller
}

func (this *SearchallController) SearchAll()  {
	//获取信息
	bookname := this.GetString("name")
	//writer := "辰机唐红豆"
	//sort := this.GetString("sort")
	//sort :="都市"

	book := []models.Pa{}
	o :=orm.NewOrm()
	o.QueryTable("pa").Filter("bookname__contains",bookname).All(&book)

	data := [10]ResponseJson{}
	//i := 0
	for i:=0;(i< len(book))&&(i<10);i++ {
		data[i].Index = book[i].Id
		data[i].Name = book[i].Bookname
		data[i].Writer = book[i].Author
		data[i].Src = book[i].Img
		//
	}
	//fmt.Println(data)
	/*c.Data["index"]=data.Index
	c.Data["writer"]=data.Writer
	c.Data["name"]=data.Name*/
	this.Data["json"]=data
	this.ServeJSON()
}