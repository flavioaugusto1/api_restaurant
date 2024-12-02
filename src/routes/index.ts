import { Router } from 'express'
import { productRoutes } from './products-routes'

export const routes = Router()

routes.use('/products', productRoutes)
