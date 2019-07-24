import HttpService from './HttpService'

export default {
    getById,
    save,
    query
}

function query(){
    return HttpService.get(_getUrl())
}

function getById(id){
  return HttpService.get(_getUrl(id))
}

function save(user){
  return HttpService.put(_getUrl(), user)
}


function _getUrl(endpoint = '') {
    return `user/${endpoint}`
}
