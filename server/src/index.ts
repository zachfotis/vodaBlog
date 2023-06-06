import mongoose from 'mongoose';
import { app } from './app';
import { populateDB } from './services/populate-db';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to MongoDB');

    // Populate database with users and posts from JSONPlaceholder, if there are none
    populateDB();

    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}!!!`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
