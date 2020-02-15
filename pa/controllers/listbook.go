package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)

type ListControllers struct {
	beego.Controller
}

func (this * ListControllers) List()  {
	this.TplName="list.html"
}

func (this * ListControllers) Lists()  {
	this.Ctx.ResponseWriter.Header().Set("Access-Control-Allow-Origin", this.Ctx.Request.Header.Get("Origin"))
	sort := this.GetString("list_name")
	//sort := "历史"
	var pas []*models.Pa
	o := orm.NewOrm()
	//
	o.QueryTable("Pa").Filter("sort", sort).All(&pas)
	data := [3]ResponseJson{}
	//i := 0
	for i:=0;i< len(pas);i++ {

		data[i].Index=pas[i].Id
		data[i].Name = pas[i].Bookname
		data[i].Writer = pas[i].Author
		data[i].Src=pas[i].Img
		//fmt.Printf("%q\n",pas[i])
		fmt.Println(data[i])
	}
	this.Data["json"] = data
	this.ServeJSON()
}