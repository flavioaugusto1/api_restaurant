import { ProductController } from '@/controllers/products-controller'
import { Router } from 'express'

const productRoutes = Router()
const productController = new ProductController()

productRoutes.get('/', productController.index)
productRoutes.post('/', productController.create)
productRoutes.get('/:id', productController.listById)

export { productRoutes }
