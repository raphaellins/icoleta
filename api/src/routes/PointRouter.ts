import { Router } from 'express';
import multer from 'multer'
import PointsController from '../controllers/PointsController';
import uploadConfig from '../config/upload'

import CreatePointValidator from '../validators/CreatePointValidator'

const router = Router();
const upload = multer(uploadConfig)

router.get('/', PointsController.index);
router.get('/:id', PointsController.show);
router.post('/create', upload.single('image'), CreatePointValidator, PointsController.store);

export default router;
