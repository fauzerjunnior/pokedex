import mongoose from 'mongoose';
import 'dotenv/config';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    const env = process.env.MONGO_URL;

    this.mongoConnection = mongoose.connect(env, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
