import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Ruta de salud — verifica que el servidor está corriendo
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'TaskFlow API running',
    environment: process.env.NODE_ENV,
  });
});

// Conectar DB e iniciar servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });

export default app;