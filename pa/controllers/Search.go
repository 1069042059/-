package controllers

import "github.com/astaxie/beego"

type SEController struct {
	beego.Controller
}

func (this *SEController) Search()  {
	this.TplName="search.html"
}