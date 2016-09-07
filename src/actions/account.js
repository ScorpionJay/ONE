import {FETCH_USER} from './Actions'
import Config from '../Config'
import {showMessage} from './message'

export function fetchAccount(username,token){
	return dispatch => { 
	 	fetch(Config.accountUrl + '/'+username,{
          headers: {
             'Auth-Token': token,
          }
        })
      .then((response) => response.json())
      .then((responseData) => {
            if(responseData.status === 401){
              // token过期 重新登录
            }

            if(responseData.code === 0){
              responseData.data.img = Config.fileUrl +responseData.data.img
              dispatch(account(responseData.data))
            }else{
              console.log('error');
            }
        })
        .catch(function(ex) {
          console.log('parsing failed', ex)
          dispatch(showMessage('网络繁忙，请稍候重试！'))
        })
	}
}

export function account(data){
	return {
		type:FETCH_USER,data
	}
}



