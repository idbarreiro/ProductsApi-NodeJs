import {Router} from 'express';
import { updateProductById, deleteProductById } from '../controllers/products.controller';

const router = Router();

router.put('/api/Product/UpdateProduct/:id', updateProductById)
router.delete('/api/Product/DeleteProduct/:id', deleteProductById)

export default router;