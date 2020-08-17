import mongoose from 'mongoose';

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    const env = process.env.MONGO_URL || 'mongodb://localhost:27017/pokedex';
    this.mongoConnection = mongoose.connect(env, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
