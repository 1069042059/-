package models

import (
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)
type Pa struct {
	Id  	  int	`orm:"pk;auto"`
	Author    string `orm:"size(255)"`
	Bookname  string	`orm:"size(255)"`
	Sort      string	`orm:"size(255)"`
	Img       string `orm:"size(255)"`
	User []*User `orm:"rel(m2m)"`//many to many
}

type User struct {
	Id int `orm:"pk;auto"`
	Username string `orm:"size(255)"`
	Password string `orm:"size(50)"`
	Pa []*Pa `orm:"reverse(many)"`
}

type Tjian struct {
	Id int `orm:"pk;auto"`
	Bookname  string	`orm:"size(255)"`
}



func init() {
	orm.RegisterDriver("mysql", orm.DRMySQL) //设置驱动
	orm.RegisterDataBase("default", "mysql", "root:App123@tcp(localhost:3306)/godbdemo?charset=utf8")//连接数据库
	orm.RegisterModel(new(Pa),new(User),new(Tjian)) //注册模型
	//orm.RunSyncdb("default", true, true)
}

