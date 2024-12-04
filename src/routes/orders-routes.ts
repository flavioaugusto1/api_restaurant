import { Router } from 'express'
import { OrdersController } from '@/controllers/orders-controller'

export const orderRoutes = Router()
const ordersController = new OrdersController()

orderRoutes.post('/', ordersController.create)
