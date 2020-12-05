import Task from '../models/Task'
import {getPagination} from '../libs/getPagination'

 export const findAllTasks = async (req,res) => {
  try {
        const {size, page, title} = req.query
        const condition = title ? {
            title: {$regex: new RegExp(title), $options:"i"},
        }: {};

        const {limit, offset} = getPagination(page, size)
        const data = await Task.paginate(condition, {offset, limit})
        res.json({
            totalItems: data.totalDocs,
            tasks: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page - 1 
        });
  } catch (error) {
      res.status(500).json({
          message: error.message || 'Algo salió mal'
    });
  }
}

export const createTask = async (req,res) => {
        const {title, description, done} = req.body;
            if(!title){
                return res.status(400).send({message: 'el titulo es requerido'})
            }
   try {
    const newTask = new Task({
        title,
        description,
        done: done ? done : false 
    })
    const taskSaved = await newTask.save();
    console.log(taskSaved);

    res.json(taskSaved);    

   } catch (error) {
       res.status(500).json({
           message: error.message || "Error al crear la tarea"
       })
   }
}

export const findOneTask = async ( req,res) => {
    const {id} = req.params;
    try {
        const task = await Task.findById(id);

        if(!task) {
        return res
            .status(404)
            .json({message: `La tarea con id ${id} no existe`
            })
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message || `Error devolviendo id: ${id}`
        })
        
    }
}

export const deleteTask = async (req,res) => {
    const {id} = req.params;
    try {
        await Task.findByIdAndDelete(id)
        res.json({
            message:"Tarea eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || `Mo se encontro la tarea ${id}`
        })
    }
}
//tasks done
export const findAllDoneTasks = async (req,res) => {
    const tasks = await Task.find({done : true});
    res.json(tasks);
}  

export const updateTask = async (req,res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body); //busco por id, actualizo body
    res.json(updatedTask);
}