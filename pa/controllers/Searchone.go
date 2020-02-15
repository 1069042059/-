package controllers

import(
	"fmt"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/orm"
     "pa/models"
)
type  SearchoneController struct {
	beego.Controller
}

func (this *SearchoneController) SearchOne()  {
	//获取信息
	bookname := this.GetString("name")
	//bookname := "大国战隼"
	fmt.Println(bookname)

	book := models.Pa{Bookname:bookname}
	o :=orm.NewOrm()
	o.QueryTable("pa").Filter("bookname",bookname).One(&book)

	data := [2]ResponseJson{}
	//i := 0

		data[0].Index = book.Id
		data[0].Name = book.Bookname
		data[0].Writer = book.Author
		data[0].Src = book.Img
		//

	//fmt.Println(data)
	/*c.Data["index"]=data.Index
	c.Data["writer"]=data.Writer
	c.Data["name"]=data.Name*/
	this.Data["json"]=data
	this.ServeJSON()
}