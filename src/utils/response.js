//creamos dos funciones una para mensajes de error y otra para mensajes de exito

// Envía una respuesta exitosa con mensaje, datos y código de estado opcional
function sendSuccess(res, message, data = null, status = 200) {
    return res.status(status).json({ mensaje: message, data })
}

// Envía una respuesta de error con mensaje y código de estado opcional
function sendError(res, message, status = 500) {
    return res.status(status).json({ mensaje: message })
}

// Exporta ambas funciones para su uso en controladores
export default {
    sendSuccess,
    sendError
};
