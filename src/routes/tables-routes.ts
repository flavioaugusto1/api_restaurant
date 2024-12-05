import { Router } from 'express'
import { TablesController } from '@/controllers/tables-controller'

export const tableRoutes = Router()
const tableController = new TablesController()

tableRoutes.get('/', tableController.index)
