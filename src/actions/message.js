import * as Actions from '../ConstantsAction'

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
