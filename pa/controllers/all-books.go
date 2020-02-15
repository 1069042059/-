package controllers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
	"pa/models"
)


type ALLController struct{
	beego.Controller
}

type ResponseJson struct {
	Index  int `json:"index"`
	Name   string`json:"name"`
	Writer string`json:"writer"`
	Src    string`json:"src"`
}

func (c *ALLController) AllBook() {

	c.Ctx.ResponseWriter.Header().Set("Access-Control-Allow-Origin", c.Ctx.Request.Header.Get("Origin"))
	response := []models.Pa{}
	orm.Debug =true
	o := orm.NewOrm()
	qs:=o.QueryTable("Pa")
	qs.All(&response)

	data := [120]ResponseJson{}
	//i := 0
	for i:=0;i< len(response);i++ {
		data[i].Index = response[i].Id
		data[i].Name = response[i].Bookname
		data[i].Writer = response[i].Author
		data[i].Src = response[i].Img
		//
	}
	//fmt.Println(data)
	/*c.Data["index"]=data.Index
	c.Data["writer"]=data.Writer
	c.Data["name"]=data.Name*/
	c.Data["json"]=data
	c.ServeJSON()


}



