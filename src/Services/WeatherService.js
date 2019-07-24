export default {

    getWheaterByCoords,
    getCoordsByLocation,
    minimizeWeatherObj
}


function getWheaterByCoords({ lat, lng }) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&APPID=68f3770369e99d0300fcc0989c7c0098`)
        .then(res => {
            return res.json()
                .then(res => {
                    return res;
                })
        })

}

function getCoordsByLocation(pos) {
    pos = pos.replace(/,|'| /, "+")
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${pos}&key=AIzaSyAY3sSuIsbs3ZDKn_2_-xGEJHgOW8Wmrdk`)
        .then(res => {
            return res.json()
                .then(res => {

                    return res.results[0].geometry.location
                })
        })
}

function minimizeWeatherObj(weather) {
    var forecastWeather = weather.list.map(item => {
        const img = require(`../assets/img/${item.weather[0].icon}.png`)
        return {
            minTemp: Math.round(item.main.temp_min),
            maxTemp: Math.round(item.main.temp_max),
            humidity: Math.round(item.main.humidity),
            img: img
        }
    })

    var weatherObj = [];
    for (var i = 0; i < 30; i += 6) {
        weatherObj.push(forecastWeather[i])
    }
    return weatherObj

}