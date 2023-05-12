const express = require('express');
const router = express.Router();
const pokemonController = require('./pokemon.controller.js');
const verifyJWT = require('../common/jwt.middleware.js');


router.get('/',pokemonController.listPokemons);

router.get('/:id', pokemonController.getPokemonById);

router.post('/', verifyJWT, pokemonController.createPokemon);

router.patch('/:id', verifyJWT,(_req, res) => pokemonController.updatePokemon(_req, res));

router.delete('/:id', verifyJWT,(req, res) => pokemonController.deletePokemon(req,res));

module.exports = router;