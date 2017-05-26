
import Dispatcher from './Dispatcher'

export function updateCats(){
  const params = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  }

  fetch("http://localhost:4000/cats", params).then(function(response){
    if(response.status === 200){
      response.json().then(function(body){
        Dispatcher.dispatch({
          type: 'UPDATE_CATS',
          cats: body.cats
        })
      })
    }
  }).catch(function(error){
  })
}
