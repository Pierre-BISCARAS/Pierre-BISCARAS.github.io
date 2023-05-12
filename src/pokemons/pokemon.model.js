const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
    pokedexId : {type:Number, required: true, unique: true},
    name : {type:String, required: true, unique: true},
    type : {type:[String,String], required: true, enum : ["acier", "combat", "dragon", "eau", "électrik", "feu", "fée", "glace", "insecte", "normal", "plante", "poison", "psy", "roche", "sol", "spectre", "ténèbres", 'vol']},
    height : {type : Number},
    weight : {type : Number},
});


module.exports = mongoose.model('pokemon', pokemonSchema);