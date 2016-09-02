import {LOGIN,LOGOUT} from '../ConstantsAction'
import Config from '../Config'
import {showMessage} from './message'

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
              const authToken = response.headers.get("Auth-Token");
               if(authToken){
	               dispatch(login(username,authToken))
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
    dispatch(login(''))
  }
}

export function login(username,token){
	return {
		type:LOGIN,username,token
	}
}