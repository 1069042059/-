package main

import (
	"github.com/astaxie/beego"
	_ "pa/controllers"
	_ "pa/routers"
)

func main() {

	beego.Run()
}

//127.0.0.1:8080