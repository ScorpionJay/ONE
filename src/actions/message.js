import * as Actions from './Actions'

export function showMessage(text){
	return {
		type: Actions.SHOW_MESSAGE,text
	}
}

export function hideMessage(){
	return {
		type: Actions.HIDE_MESSAGE
	}
}
