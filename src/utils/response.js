//creamos dos funciones una para mensajes de error y otra para mensajes de exito

function sendSucess(res,message,data=null,status=200){
    return res.status(status).json({mensaje : message, data})
}



function sendError(res,message,status=500){
    return res.status(status).json({mensaje : message})
}

export {sendSucess, sendError};
