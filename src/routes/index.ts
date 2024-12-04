import { Router } from 'express'
import { productRoutes } from './products-routes'
import { tableRoutes } from './tables-routes'
import { tableSessionsRoutes } from './tables-sessions-routes'
import { orderRoutes } from './orders-routes'

export const routes = Router()

routes.use('/products', productRoutes)
routes.use('/tables', tableRoutes)
routes.use('/table-session', tableSessionsRoutes)
routes.use('/orders', orderRoutes)
