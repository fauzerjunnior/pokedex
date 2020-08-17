import * as Yup from 'yup';

import api from '../../config/api';
import Pokemon from '../schemas/Pokemon';

class PokemonController {
  async index(req, res) {
    const pokemons = await api.get();

    Object.keys(pokemons.data).forEach(async function (key) {
      const fastAttack = pokemons.data[key]['Fast Attack(s)'];
      const specialAttack = pokemons.data[key]['Special Attack(s)'];

      if (fastAttack !== undefined && specialAttack !== undefined) {
        const schema = Yup.object().shape({
          name: Yup.string().required(),
          generation: Yup.string().required(),
          types: Yup.array().required(),
          attackQuantity: Yup.number(),
        });

        if (
          !(await schema.isValid({
            name: pokemons.data[key].Name,
            generation: pokemons.data[key].Generation,
            types: pokemons.data[key].Types,
            attackQuantity: fastAttack.length + specialAttack.length,
          }))
        ) {
          return res.status(400).json({ error: 'Validation fails' });
        }

        const pokemonList = await Pokemon.find();

        if (!(pokemonList.length > 0)) {
          await Pokemon.create({
            name: pokemons.data[key].Name,
            generation: pokemons.data[key].Generation,
            types: pokemons.data[key].Types,
            attackQuantity: fastAttack.length + specialAttack.length,
          });
        }
      }
    });

    const pokemonListAfterInsert = await Pokemon.find();
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

    const { name, generation, types, attackQuantity } = await pokemon.update(
      req.body
    );

    return res.status(200).json(name, generation, types, attackQuantity);
  }

  async delete(req, res) {
    await Pokemon.updateOne(req.params.id);

    return res.status(200).json();
  }
}

export default new PokemonController();
