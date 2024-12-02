import { ProductController } from '@/controllers/products-controller'
import { Router } from 'express'

const productRoutes = Router()
const productController = new ProductController()

productRoutes.get('/', productController.index)
productRoutes.get('/', productController.create)

export { productRoutes }