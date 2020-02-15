package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)

type PageBookController struct {
	beego.Controller
}

func (this *PageBookController)PageBook()  {
	page,_ := this.GetInt("page")
	response := []models.Pa{}
	orm.Debug =true
	o := orm.NewOrm()
	qs:=o.QueryTable("Pa")
	qs.All(&response)
	data := [9]ResponseJson{}
	//i := 0
	t:=0
	fmt.Println(page)
	for i:=((page-1)*9);i< (page*9)&&(page*9<len(response));i++{

		data[t].Index = response[i].Id
		data[t].Name = response[i].Bookname
		data[t].Writer = response[i].Author
		data[t].Src = response[i].Img
		//fmt.Println(i)
		t++
	}
	this.Data["json"]=data
	this.ServeJSON()
}
