const pokemonModel = require('./pokemon.model.js');


const pokemonController = {
    listPokemons: (req, res) => {
        pokemonModel.find()
            .then(
                (pokemons) => {
                    res.status(200).json(pokemons);
                }
            )
            .catch(
                (error) => {
                    res.status(404).json(error);
                }
            );
    },
    getPokemonById: (req, res) => {
        pokemonModel.findById(req.params.id)
            .then(
                (pokemon) => {
                    res.status(200).json(pokemon);
                }
            )
            .catch(
                (error) => {
                    res.status(404).json(error);
                }
            );
    },
    createPokemon: (req, res) => {
        const pokemon = new pokemonModel(req.body);
        pokemon.save()
            .then(
                (pokemon) => {
                    res.status(201).json(pokemon);
                }
            )
            .catch(
                (error) => {
                    res.status(400).json(error);
                }
            );
    },
    updatePokemon: (req, res) => {
        pokemonModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
            .then(
                (pokemon) => {
                    res.status(200).json(pokemon);
                }
            )
            .catch(
                (error) => {
                    res.status(400).json(error);
                }
            );
    },

    deletePokemon: (req, res) => {
        pokemonModel.findByIdAndDelete(req.params.id)
            .then(
                (pokemon) => {
                    if (!pokemon) {
                        return res.status(404).json({
                            message: "Pokemon not found with id " + req.params.id
                        });
                    }
                    else {
                        res.status(200).json({message: "Pokemon deleted successfully!"});
                    }
                }
            )
            .catch(
                (error) => {
                    res.status(400).json(error);
                }
            );
    }

}
module.exports = pokemonController;