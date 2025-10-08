//solo se encarga de la base de datos

import userModel from "./users-model.js";


const getUserProfile = async (id) => {

    const user = await userModel.findOne({userId : id}).select("-password")
    return user
}

const getUserByEmail = async (email) => {
    return await userModel.findOne({ email }).select("-__v -updatedAt").lean()

}

export default {getUserProfile,  getUserByEmail}