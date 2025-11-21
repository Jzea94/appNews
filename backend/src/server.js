import app from './app.js';
import { connectDB } from './config/db.js';
import { router } from './router/index.js';
import { createInitialSuperAdmin } from './config/createSuperAdmin.js'
import 'dotenv/config';


// Init Server
const PORT = process.env.PORT || 4000

// Permite gestionar un grupo de rutas bajo un prefijo especifico
// http://localhost:4000/
  app.use('/', router)
  
  app.listen(PORT, () => {
    console.log(`🚀 Backend server running on PORT: ${PORT}`)
  })  
  
  // Connection DB
  connectDB().then(() => {
    createInitialSuperAdmin()
  })