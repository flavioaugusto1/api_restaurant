import { Router } from 'express'
import { TablesSessionsController } from '@/controllers/tables-sessions-controller'

export const tableSessionsRoutes = Router()
const tableSessionsController = new TablesSessionsController()

tableSessionsRoutes.get('/', tableSessionsController.index)
tableSessionsRoutes.post('/', tableSessionsController.create)
tableSessionsRoutes.patch('/:id/close', tableSessionsController.update)
