import * as Yup from 'yup';

import api from '../../config/api';
import Pokemon from '../schemas/Pokemon';

class PokemonController {
  async index(req, res) {
    const { page = 1 } = req.query;
    let pokemons;

    if (req.params.id) {
      const pokemonById = await Pokemon.findById(req.params.id);
      return res.status(200).json(pokemonById);
    }

    let response = await Pokemon.find();
    if (!response.length > 0) {
      response = await api.get();
      pokemons = response.data;
    } else {
      pokemons = response;
    }

    Object.keys(pokemons).forEach(async function (key) {
      const fastAttack = pokemons[key]['Fast Attack(s)'];
      const specialAttack = pokemons[key]['Special Attack(s)'];

      if (fastAttack !== undefined && specialAttack !== undefined) {
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          generation: Yup.string().required(),
          types: Yup.array().required(),
          attackQuantity: Yup.number(),
        });

        if (
          !(await schema.isValid({
            name: pokemons[key].Name,
            generation: pokemons[key].Generation,
            types: pokemons[key].Types,
            attackQuantity: fastAttack.length + specialAttack.length,
          }))
        ) {
          return res.status(400).json({ error: 'Validation fails' });
        }

        await Pokemon.create({
          name: pokemons[key].Name,
          generation: pokemons[key].Generation,
          types: pokemons[key].Types,
          attackQuantity: fastAttack.length + specialAttack.length,
        });
      }
    });

    const pokemonListAfterInsert = await Pokemon.find()
      .limit(9)
      .skip((page - 1) * 9);

    return res.status(200).json(pokemonListAfterInsert);
  }

  async store(req, res) {
    const { name, generation, types, attackQuantity } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      generation: Yup.string().required(),
      types: Yup.array().required(),
      attackQuantity: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    await Pokemon.create({
      name,
      generation,
      types,
      attackQuantity,
    });

    return res.status(200).json();
  }

  async update(req, res) {
    const pokemon = await Pokemon.findById(req.params.id);

    const { name, generation, types, attackQuantity } = await pokemon.updateOne(
      req.body
    );

    return res.status(200).json(name, generation, types, attackQuantity);
  }

  async delete(req, res) {
    await Pokemon.findByIdAndRemove(req.params.id);

    return res.status(200).json();
  }
}

export default new PokemonController();
