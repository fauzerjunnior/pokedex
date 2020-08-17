import mongoose from 'mongoose';

const PokemonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    generation: {
      type: String,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
    attackQuantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Pokemon', PokemonSchema);
