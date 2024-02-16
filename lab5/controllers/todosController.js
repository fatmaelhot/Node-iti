const Todos =require('../models/todosModel')
const mongoose=require('mongoose')



//Get all todos
const gettodos=async(req,res)=>{
  try {
  const user_id=req.userId
  console.log(user_id);
    const todos=await Todos.find({user_id})
    console.log(todos)
    res.status(200).json(todos)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

//Get a single todo
const gettodo =async(req,res)=>{
    const {id} =req.params
    const todo=await Todos.findById(id)

    if(!todo){
        return res.status(404).json({error:"no such todo"}) //use return to stop the function
    }

    res.status(200).json(todo)
}

 

// Controller method to get todos of a specific user
 const getTodosByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const todos = await Todos.find({ userId });
    res.json(todos);
  } catch (error) {
    res.status(400).json({error:error.message})
  }
};


//post a new todo
 const createtodo =async(req,res)=>{
  const {
    title, status,  tags,
  } = req.body;

    
    try{
      const user_id=req.userId;
      const todo = await Todos.create({
       userId:user_id, title,  tags
      })
      res.status(200).json(todo)
    } catch(error) {
      res.status(400).json({error:error.message})
    }
     
}

//Delete a todo
const deletetodo = async(req,res)=>{
    const{id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){ 
       return res.status(404).json({error:"invalid id"})
     }  
     
    const todo =await Todos.findOneAndDelete({_id:id})
    
    if(!todo){
        return res.status(404).json({error:"no such todo"})
    }
    res.status(200).json(todo)
    
}
//Update a todo
const updatetodo=async(req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)){ 
        return res.status(404).json({error:"no such todo"})
      }  
      
     const todo =await Todos.findOneAndUpdate({_id:id},{...req.body})
     
     if(!todo){
         return res.status(404).json({error:"no such todo"})
     }
     res.status(200).json(todo)

}

//filters

 
const filters= async (req, res) => {
  try {
      const { status, limit=10 , skip=0 } = req.query;

    
      const todos = await Todos.find({ status })
          .skip(parseInt(skip))
          .limit(parseInt(limit))
          .exec();

          res.status(200).json(todos)
  } catch (error) {
      res.status(404).json({error:"not found"})
  }
};


module.exports ={
    createtodo,
    gettodos,
    gettodo,
    deletetodo,
    updatetodo,
    getTodosByUserId,
    filters
}