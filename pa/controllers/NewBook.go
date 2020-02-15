package controllers

import "github.com/astaxie/beego"

type NewBookController struct {
	beego.Controller
}

func (this * NewBookController) NewBook()  {
	this.TplName="book_new.html"
}