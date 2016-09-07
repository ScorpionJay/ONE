import {LOGIN,LOGOUT} from './Actions'
import Config from '../Config'
import {showMessage} from './message'

import {account} from './account'

export function fetchLogin(username,password,redirect){
	return dispatch => { 
	 	fetch(Config.loginUrl,{
          headers: {
            'Username': username,
            'Password': password
          },
          method: 'POST'
        })
        .then((response) => {
              const token = response.headers.get("Auth-Token");
               if(token){
                let user = {
                  username,
                  token
                }
	               dispatch(login(user))
	               // 页面跳转
	               if (redirect) redirect()
               }else{
               	 // dispatch(loginError('帐号或密码错误'))
               	 dispatch(showMessage('帐号或密码错误'))
               }

        })
        .catch(function(ex) {
          console.log('parsing failed', ex)
          dispatch(showMessage('网络繁忙，请稍候重试！'))
        })
	}
}

export function logout(){
  return dispatch => { 
    dispatch(login({}))
     dispatch(account({}))
  }
}

export function login(user){
	return {
		type:LOGIN,user
	}
}