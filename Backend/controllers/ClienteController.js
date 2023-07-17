//importamos el metodo
import ClienteModel from "../models/ClienteModel.js";

// Metodos para el CRUD

//Mostrar todos los clientes

export const getAllClientes = async(req, res) =>{
   try {
      const clientes = await ClienteModel.find()
      res.status(200).json(clientes)

   }catch (error){
      res.json ({message: error.message})
   }
} 


//Mostrar un cliente

export const getCliente = async(req, res) =>{
   try {
      const id = req.params.id
      await ClienteModel.findById( {_id:id}).then ( (cliente) => {
         res.status(200).json(cliente)
      })  
   }catch (error){
      res.json ({message: error.message})
   }
} 

//Crear un cliente

export const createCliente = async (req,res) => {
   try {
      await  ClienteModel.create(req.body)
      res.status(200).json({
         "message":"¡Cliente creado correctamente"
      })
   } catch (error) {
      res.json ({message: error.message})
   }
}

//Actualizar un cliente

export const updateCliente = async (req,res) => {
   try {
      const id = req.params.id

      await ClienteModel.updateOne( {_id:id}, req.body).then(res =>{
         console.log(res)
      })
      res.status(200).json({
         "message":"¡Cliente actualizado correctamente!"
      })
   } catch (error) {
      res.json({message: error.message})
   }
}

//Eliminar un cliente 

export const deleteCliente = async(req, res) => {
   try {
      const id = req.params.id
      await ClienteModel.deleteOne ({_id:id}).then (res =>{
         console.log(res)
      })
      res.status(200).json({
         "message":"¡Cliente eliminado correctamente!"
      })
      
   } catch (error) {
      res.json({message: error.message}) 
   }
}