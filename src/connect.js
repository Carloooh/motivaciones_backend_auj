const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

async function connectToMongoDB() {
  // Estoy utilizando una credencial temporal directamente en el código en lugar de ponerla en un archivo .env 
  // para que los contribuyentes puedan probar la API sin tener que pedirme el enlace y credenciales.
  // una vez realizadas las contribuciones, cambiaré el código para usar el .env
  const uri = "mongodb+srv://auj:Ku9Bhfr2bpKuUoqS@auj-postulacion-backend.ezusd.mongodb.net/?retryWrites=true&w=majority&appName=auj-postulacion-backend";
  return mongoose.connect(uri);
}

module.exports = {
  connectToMongoDB,
};
