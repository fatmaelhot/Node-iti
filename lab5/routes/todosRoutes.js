const express = require('express')
const{
  createtodo,
  gettodos,
  gettodo,
  deletetodo,
  updatetodo,
  getTodosByUserId,
  filters
} =require('../controllers/todosController')
const requireAuth = require('../middleware/requireAuth')
 

const router = express.Router()
router.use(requireAuth)
 
router.get('/',gettodos)

 
router.get('/:id',gettodo)

router.get('/:userId/todos', getTodosByUserId)

router.get('/todos',filters)

 
router.post('/', createtodo)

 
router.delete('/:id',deletetodo)

 
router.patch('/:id',updatetodo)


module.exports = router