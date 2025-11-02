//solo se encarga de la base de datos

import userModel from "./users-model.js";

// Busca un usuario por su id y excluye el campo de contraseña
const getUserProfile = async (id) => {
  const user = await userModel.findOne({ userId: id }).select("-password");
  return user;
};

// Busca un usuario por su email y devuelve solo los campos necesarios
const getUserByEmail = async (email) => {
  return await userModel.findOne({ email }).select("-__v -updatedAt").lean();
};

// Exporta las funciones para que sean usadas por los controladores
export default { getUserProfile, getUserByEmail };
