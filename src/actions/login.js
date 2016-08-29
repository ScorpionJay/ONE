import {LOGIN,LOGIN_ERROR} from '../ConstantsAction'
import Config from '../Config'
export function addTodo(text){
	return {
		type: FETCH_LIST,text
	}
}

export function fetchListItem(value){
	return {
		type:FETCH_LIST_ITEM,value
	}
}

export function loginError(text){
	return {
		type:LOGIN_ERROR,text
	}
}

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
        	console.log(authToken)
              const authToken = response.headers.get("Auth-Token");
               if(authToken){
                	// 持久化
	               //Storage.put('token',authToken)
	               storage.save({
                      key: 'loginState', 
                      rawData: { 
                        from: 'some other site',
                        userid: username,
                        token: authToken
                      },
                      expires: 1000 * 3600
                    });  

	               dispatch(login(authToken))
	               // 页面跳转
	               if (redirect) redirect()
               }else{
               	 dispatch(loginError('帐号或密码错误'))
               }

        })
        .catch(function(ex) {
          console.log('parsing failed', ex)
        })
	}
}

export function login(token){
	return {
		type:LOGIN,token
	}
}