import {
    Router
} from 'express';
import {
    catchAsync
} from '../middleware/error';
import {getAddressInfo, getAutoCompete, getHourlyWeather, search} from '../services'

const router = Router();


router.get('/autoCompete', catchAsync(async (req, res) => {
    // console.log(req.query)
    const {city} = req.query
    const data = await getAutoCompete(city)
    res.send(data["predictions"])
}));

router.post('/address', catchAsync(async (req, res) => {
    const data = await getAddressInfo(req.body)
    res.send(data["results"][0])
}))

router.get('/search', catchAsync(async (req, res) => {
    const {latlng} = req.query
    const data = await search(latlng)
    res.send(data)
}));

router.get('/hourWeather', catchAsync(async (req, res) => {
    const {latlng} = req.query
    const data = await getHourlyWeather(latlng)
    res.send(data)
}));


export default router;
