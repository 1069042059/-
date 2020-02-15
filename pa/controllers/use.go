package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	"pa/models"
	"strings"
)
type UserController struct {
	beego.Controller
}

func (c *UserController) Register() {
	c.TplName = "index.html"
}

func (c *UserController) SaveUser() {
	user := models.User{}
	user.Username = c.Input().Get("name")
	user.Password = c.Input().Get("password")

	response := ReJson{State:0,Message:"ok"}
	if id, err := user.SaveOne(); err != nil {
		response.State = 500
		response.Message = "保存失败，请稍后再试"
	} else {
		response.State = id
	}
	fmt.Println(response)
	c.Data["json"] = response
	c.ServeJSON()
	//c.Ctx.WriteString(user.Name + " : " + user.Password)
	//return
}

func (c *UserController) Login() {
	c.TplName = "index.html"
}

func (c *UserController) Sign() {
	user := models.User{}
	user.Username = c.Input().Get("name")
	user.Password = c.Input().Get("password")

	response := ReJson{State:500,Message:"ok"}
	if user.Username == "" || user.Password == ""{
		response.State = 0
		response.Message = "用户名或密码不能为空"
	}else {
		if id,err := user.GerOne(); err != nil || id == 0 {
			response.State = 0
			response.Message = err.Error()
		} else {
			if strings.EqualFold(user.Username,"manage"){
				response.Identify="管理员"
			}
			c.SetSession("Username",user.Username)
		}
	}
	fmt.Println(response)
	c.Data["json"] = response
	c.ServeJSON()
}

func (c *UserController) Logout() {
	c.DelSession("Username")
	response := ReJson{State:0,Message:"ok"}
	c.Data["json"] = response
	c.ServeJSON()
}
