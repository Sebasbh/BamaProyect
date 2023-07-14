import { Pedido } from "../models/AllModels.js";

// Métodos para el CRUD de pedido

// Mostrar todos los pedidos con filtros y ordenamiento
export const getAllPedidos = async (req, res) => {
   try {
     const { search, sortBy, sortOrder } = req.query;
 
     let query = Pedido.find();
 
     if (search) {
       query = query.find({
         $or: [
           { fecha_de_pedido: { $regex: search, $options: "i" } },
           { cliente_id: { $regex: search, $options: "i" } }
         ]
       });
     }
 
     if (sortBy && sortOrder) {
       query = query.sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 });
     }
 
     const pedidos = await query.exec();
     res.status(200).json(pedidos);
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 };

// Mostrar un Pedido
export const getPedidos = async (req, res) => {
   try {
      const id = req.params.id;
      const pedido = await Pedido.findById(id);
      res.status(200).json(pedido);
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Crear un pedido
export const createPedido = async (req, res) => {
   try {
      const ultimoPedido = await Pedido.findOne().sort({ numero_de_pedido: -1 }).exec();
      const numeroPedido = ultimoPedido ? ultimoPedido.numero_de_pedido + 1 : 1;
      const pedido = await Pedido.create({ ...req.body, numero_de_pedido: numeroPedido });
      
      res.status(200).json({
         message: "¡Pedido creado correctamente!", pedido
      });
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Obtener el próximo número de pedido
export const getNextPedidoNumber = async (req, res) => {
   try {
       const ultimoPedido = await Pedido.findOne().sort({ numero_de_pedido: -1 }).exec();
       const nextPedidoNumber = ultimoPedido ? ultimoPedido.numero_de_pedido + 1 : 1;

       res.status(200).json({
           nextPedidoNumber
       });
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

// Actualizar un pedido
export const updatePedido = async (req, res) => {
   try {
      const id = req.params.id;
      await Pedido.updateOne({ _id: id }, req.body);
      res.status(200).json({
         message: "¡Pedido actualizado correctamente!"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
};

// Eliminar un pedido
export const deletePedido = async (req, res) => {
   try {
      const id = req.params.id;
      await Pedido.deleteOne({ _id: id });
      res.status(200).json({
         message: "¡Pedido eliminado correctamente!"
      });
   } catch (error) {
      res.json({ message: error.message });
   }
};