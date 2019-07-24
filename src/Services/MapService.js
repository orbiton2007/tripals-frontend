

export default {
    setMap,
    getCoordsByLocation,
    // initAutocomplete
}


async function setMap(){
    
}



function getCoordsByLocation(pos) {
    pos = pos.replace(/,|'| /, "+")
    const API_KEY = 'AIzaSyAY3sSuIsbs3ZDKn_2_-xGEJHgOW8Wmrdk'
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pos}&key=${API_KEY}`)
        .then(res => {
            return res.json()
                .then(res => {
                    
                    return res.results[0].geometry.location
                })
        })
}

// function initAutocomplete(){
//     return new google.maps.places.Autocomplete(
//         (this.$refs.autocomplete),
//         {types: ['geocode']}
//         );
// }



