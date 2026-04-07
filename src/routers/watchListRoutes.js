import express from 'express';
import { addToWatchList, removeFromWatchList, updateWatchList } from '../controllers/watchListController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validatorRequest } from '../middlewares/validatorRequest.js';
import { addToWatchListValidator, updateWatchListValidator, watchListParamsValidator } from '../validators/watchListValidator.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', validatorRequest(addToWatchListValidator), addToWatchList);
router.put('/:id', validatorRequest(watchListParamsValidator, "params"), validatorRequest(updateWatchListValidator), updateWatchList);
router.delete('/:id', validatorRequest(watchListParamsValidator, "params"), removeFromWatchList);

export default router;
