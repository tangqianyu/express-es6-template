import {
    myHttp
} from '../utils/my-http';


const GEOCODING_API_KEY = "AIzaSyCNQwXoV1xj5CE3Z511j7EDVZF0BLJxrx4"
const TOMORROW_KEY = "irTIHQeuUats8szeUulM0vlqgZIIY4Vg"
const IP_INFO_TOKEN = "f5d280cac53109"
const weather_url = "https://api.tomorrow.io/v4/timelines"
const weather_code_status_map = {
    4201: "Heavy Rain",
    4001: "Rain",
    4200: "Light Rain",
    6201: "Heavy Freezing Rain",
    6001: "Freezing Rain",
    6200: "Light Freezing Rain",
    6000: "Freezing Drizzle",
    4000: "Drizzle",
    7101: "Heavy Ice Pellets",
    7000: "Ice Pellets",
    7102: "Light Ice Pellets",
    5101: "Heavy Snow",
    5000: "Snow",
    5100: "Light Snow",
    5001: "Flurries",
    8000: "Thunderstorm",
    2100: "Light Fog",
    2000: "Fog",
    1001: "Cloudy",
    1102: "Mostly Cloudy",
    1101: "Partly Cloudy",
    1100: "Mostly Clear",
    1000: "Clear"
}

const weather_code_icon_map = {
    4201: "rain_heavy.svg",
    4001: "rain.svg",
    4200: "rain_light.svg",
    6201: "freezing_rain_heavy.svg",
    6001: "freezing_rain.svg",
    6200: "freezing_rain_light.svg",
    6000: "freezing_drizzle.svg",
    4000: "drizzle.svg",
    7101: "ice_pellets_heavy.svg",
    7000: "ice_pellets.svg",
    7102: "ice_pellets_light.svg",
    5101: "snow_heavy.svg",
    5000: "snow.svg",
    5100: "snow_light.svg",
    5001: "flurries.svg",
    8000: "tstorm.svg",
    2100: "fog_light.svg",
    2000: "fog.svg",
    1001: "cloudy.svg",
    1102: "mostly_cloudy.svg",
    1101: "partly_cloudy_day.svg",
    1100: "mostly_clear_day.svg",
    1000: "clear_day.svg"
}


export const getAutoCompete = async (city) => {

    return await myHttp.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&language=en-us&key=${GEOCODING_API_KEY}`)
};


export const search = async (latlng) => {
    const all_fields = 'weatherCode,temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,weatherCode,precipitationProbability,precipitationType,sunriseTime,sunsetTime,visibility,moonPhase,cloudCover'
    let params = {
        location: latlng,
        fields: all_fields,
        units: "imperial",
        timesteps: "1d",
        timezone: "America/Los_Angeles",
        apikey: TOMORROW_KEY
    }

    let timeline = (await myHttp.get(weather_url, params))['data']['timelines'][0]['intervals']
    console.log('timeline',timeline)
    timeline = timeline.map(line => {
        return {
            ...line,
            icon: weather_code_icon_map[line['values']['weatherCode']],
            weather: weather_code_status_map[line['values']['weatherCode']]
        }
    })
    params['fields'] = "weatherCode,temperature,humidity,pressureSeaLevel,windSpeed,visibility,cloudCover,uvIndex"
    params['timesteps'] = "current"
    let current = (await myHttp.get(weather_url, params))['data']['timelines'][0]['intervals'][0]['values']
    current['icon'] = weather_code_icon_map[current['weatherCode']]
    current['weather'] = weather_code_status_map[current['weatherCode']]
    return {
        "timeline": timeline,
        "current": current,
    }

}


export const getAddressInfo = async (params) => {
    const formattedLocation = `${params.street.split(' ').join('+')},${params.city.split(' ').join('+')},${params.state.split(' ').join('+')}`
    return await myHttp.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedLocation}&key=${GEOCODING_API_KEY}`)
}

export const getHourlyWeather = async (latlng) => {
    const all_fields = 'weatherCode,temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,weatherCode,precipitationProbability,precipitationType,visibility,cloudCover'
    const params = {
        "location": latlng,
        "fields": all_fields,
        "units": "imperial",
        "timesteps": "1h",
        "timezone": "America/Los_Angeles",
        "apikey": TOMORROW_KEY,
    }
    return (await myHttp.get(weather_url, params))["data"]["timelines"]

}






