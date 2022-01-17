import {
    Router
} from 'express';
import {
    catchAsync
} from '../middleware/error';

const router = Router();


router.get('/', catchAsync(async (req, res) => {
    res.send('Hello Word')
}));



export default router;
