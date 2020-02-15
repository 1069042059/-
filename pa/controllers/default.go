package controllers

import (
	"github.com/astaxie/beego"
)

type Main1Controller struct {
	beego.Controller
}

func (c *Main1Controller) Get() {
	c.Data["index"] = "beego.me"
	c.Data["name"] = "astaxie@gmail.com"
	c.Data["writer"]="crk"
	c.TplName = "index1.tpl"
}
