package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)

type  AdDeleteController struct {
	beego.Controller
}

type AdController struct {
	beego.Controller
}

func (c *AdController)AdHtml()  {
	c.TplName="ad.html"
}

func (this *AdDeleteController) AdDelete(){
	bookname := this.GetString("name")
	//bookname := "影视世界当神探"
	fmt.Println(bookname)

	book := models.Pa{Bookname:bookname}
	o := orm.NewOrm()
	o.QueryTable("pa").Filter("bookname",bookname).One(&book)
	n ,err:= o.Delete(&book)
	response := ReJson{State:0,Message:"ok"}
	if err != nil {
		response.Message="no"
		response.State=500
	}else {
		response.State=int(n)
	}

	//fmt.Println(book,n)
	//this.Data["json"] = response
	//this.ServeJSON()
}