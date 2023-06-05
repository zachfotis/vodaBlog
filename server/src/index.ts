import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  console.log('JWT_KEY: ', process.env.JWT_KEY);
  console.log('MONGO_URI: ', process.env.MONGO_URI);
  console.log('NODE_ENV: ', process.env.NODE_ENV);
  console.log('CORS_ORIGIN: ', process.env.CORS_ORIGIN);
  console.log('PORT: ', process.env.PORT);

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}!!!`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
