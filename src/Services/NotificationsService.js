import HttpService from '../Services/HttpService'

export default {
    add,
    getRoom
}


function add(newRoom){
    return HttpService.post(_getUrl(), newRoom)
}

function getRoom(id) {
    return HttpService.get(_getUrl(id))
}

function _getUrl(id = '') {
    return `room/${id}`
}
