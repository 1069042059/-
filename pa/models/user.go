package models

import (
	"errors"
	"fmt"
	"github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
	"log"
)




/**
  查询单个用户信息
*/
func (user User) GerOne() (int,error) {
	o := orm.NewOrm()
	if err := o.Read(&user,"username","password"); err != nil || user.Id <= 0 {
		return 0, errors.New("用户名或密码错误")
	} else {
		return user.Id,nil
	}
}

/**
  添加一条数据
*/
func (user User) SaveOne() (int, error) {
	o := orm.NewOrm()
	if created, id, err := o.ReadOrCreate(&user,"username"); err == nil {
		if created {
			return int(id) , nil
		} else {
			//更新
			user.Id = int(id)
			if num, err := o.Update(&user); err == nil && num > 0 {
				return int(id) , nil
			}
		}
	}
	return 0 , fmt.Errorf("save fail")
}

/**
  根据用户名查询用户id
*/
func (user *User)GetUserId() error {
	o := orm.NewOrm()
	if user.Username == "" {
		return errors.New("用户未登录，请先登录")
	}
	if err := o.Read(user, "username"); err != nil {
		log.Printf("read user %v error,error info is %v \n", user, err)
		return errors.New("用户不存在")
	}
	return nil
}
