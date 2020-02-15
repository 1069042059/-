package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
	"strconv"
)

type RandControllers struct {
	beego.Controller
}

type RankJson struct {
	Id     string`json:"id"`
	Name   string`json:"name"`

}

func (this *RandControllers) RankBook() {
	o := orm.NewOrm()
	var book = []*models.Tjian{}
	qs := o.QueryTable("tjian")
	qs.OrderBy("-id").All(&book)
/*
	if err == nil && n > 0 {
		for i := 0; i < len(book); i++ {
			this.Ctx.WriteString( book[i].Bookname+strconv.Itoa(book[i].Id)+"\n")
		}
	} else {
		this.Ctx.WriteString("查询失败")
	}
*/
	data := [6]RankJson{}
	//i := 0
	for i:=0;i< len(book);i++ {


		data[i].Name = book[i].Bookname
		data[i].Id = strconv.Itoa(i+1)
		//fmt.Printf("%q\n",book[i])
		fmt.Println(data[i])
	}

	this.Data["json"] = data
	this.ServeJSON()
}