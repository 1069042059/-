package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)

type Hello1Controllers struct {
	beego.Controller
}

type ReJson struct {
	State int `json:"state"`
	Message string `json:"message"`
	Identify string `json:"identify"`
}

type RJson struct {
	Name   string`json:"name"`
	Writer string`json:"writer"`
}

func (this *Hello1Controllers) Mybook()  {
		this.TplName="my-book.html"
}


func (this * Hello1Controllers) Mybooks(){
	username := this.GetString("name")

	fmt.Println(username)
	use := models.User{}
	var pas []*models.Pa
	o := orm.NewOrm()
	//username="bbb"
	o.QueryTable("User").Filter("username",username).All(&use)
	//fmt.Println(use)
	//注意user后面跟两个下划线_ _
	o.QueryTable("Pa").Filter("user__user__Id",int(use.Id)).All(&pas)
	//fmt.Printf("%q\n",pas)

	data := [20]RJson{}
	//i := 0
	for i:=0;i< len(pas);i++ {

		data[i].Name = pas[i].Bookname
		data[i].Writer = pas[i].Author
		fmt.Printf("%q\n",pas[i])
		fmt.Println(data[i])
	}

	this.Data["json"] = data
	this.ServeJSON()
}