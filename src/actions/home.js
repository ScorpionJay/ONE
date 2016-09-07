import {FETCH_LIST,FETCH_LIST_ITEM} from './Actions'

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


export function fetchList(){
	return dispatch => {
	 	fetch('https://gist.githubusercontent.com/ScorpionJay/de11dc5bacefea9cee5394b73f456688/raw/e86fd421e4bce5c85dd87d29ddc7315ec1d33eed/list.json',{
			//mode: "cors"
		}).then(function(response) {
	    	return response.json()
	    }).then(function(json) {
	     	dispatch(addTodo(json))
	  	}).catch(function(ex) {
	    	console.log('parsing failed', ex)
	  	})}
}


export function fetchListItemApi(id){
	 return dispatch => {
	 	fetch('https://gist.githubusercontent.com/ScorpionJay/de11dc5bacefea9cee5394b73f456688/raw/e86fd421e4bce5c85dd87d29ddc7315ec1d33eed/list.json',{
			//mode: "cors"
		}).then(function(response) {
	    	return response.json()
	  	})
		.then(function(json) {
	     	dispatch(fetchListItem(json[id-1]))
	  	}).catch(function(ex) {
	   		console.log('parsing failed', ex)
	 	})
	}
}