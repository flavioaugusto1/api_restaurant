import { Router } from 'express'
import { OrdersController } from '@/controllers/orders-controller'

export const orderRoutes = Router()
const ordersController = new OrdersController()

orderRoutes.post('/', ordersController.create)
orderRoutes.get('/session-table/:table_session_id', ordersController.index)
orderRoutes.get('/session-table/:table_session_id/total', ordersController.show)
