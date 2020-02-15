package routers

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/plugins/cors"
	"pa/controllers"
)

func init() {

	beego.InsertFilter("*", beego.BeforeRouter, cors.Allow(&cors.Options{
		AllowAllOrigins:  true,
		//AllowOrigins:      []string{"https://192.168.0.102"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"},
		ExposeHeaders:    []string{"Content-Length", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Content-Type"},
		AllowCredentials: true,
	}))

    beego.Router("/",&controllers.Main1Controller{})
    beego.Router("/all-books",&controllers.ALLController{},"get:AllBook")

	beego.Router("/my-books", &controllers.Hello1Controllers{},"*:Mybooks")
	beego.Router("/my-book.html", &controllers.Hello1Controllers{},"*:Mybook")
	beego.Router("/search-mybook", &controllers.SMyBookControllers{},"*:SMybook")
	beego.Router("/delete-mybook", &controllers.DMyBookControllers{},"*:DMyBook")
	beego.Router("/delete-allbooks", &controllers.DaMyBookControllers{},"*:DaMyBook")

	beego.Router("/list-books", &controllers.ListControllers{},"*:Lists")
	beego.Router("/list.html", &controllers.ListControllers{},"*:List")

	beego.Router("/rank-books", &controllers.RandControllers{},"*:RankBook")
	beego.Router("/recommend-books", &controllers.RecommendControllers{},"*:RecommendBook")

	beego.Router("/index.html", &controllers.UserController{},"get:Register")
	beego.Router("/sign", &controllers.UserController{},"*:SaveUser")//注册
	beego.Router("/register", &controllers.UserController{},"get:Login")
	beego.Router("/land", &controllers.UserController{},"*:Sign")//登录
	beego.Router("/logout", &controllers.UserController{},"*:Logout")

	beego.Router("/ad.html",&controllers.AdController{},"*:AdHtml")
	beego.Router("/ad-delete",&controllers.AdDeleteController{},"*:AdDelete")
	beego.Router("/ad-change",&controllers.AdchangeController{},"*:AdChange")

	beego.Router("/search.html",&controllers.SEController{},"*:Search")
	beego.Router("/search1",&controllers.SearchallController{},"*:SearchAll")
	beego.Router("/add-book", &controllers.AddControllers{},"*:AddBook")

	beego.Router("/book_new.html",&controllers.NewBookController{},"*:NewBook")
	beego.Router("/search",&controllers.SearchoneController{},"*:SearchOne")

	beego.Router("/page-books",&controllers.PageBookController{},"*:PageBook")
}
