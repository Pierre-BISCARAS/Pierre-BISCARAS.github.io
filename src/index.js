const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pokemonRoutes = require('./pokemons/pokemon.route.js')
const userRoutes = require('./users/user.route.js')

const swagerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


dotenv.config();
const port = process.env.PORT;


const server = express();
server.use(express.json());
server.use('/api-docs', swagerUi.serve, swagerUi.setup(swaggerDocument));


mongoose.connect(`mongodb://localhost:27017/pokedex`)
    .then(
        (res) => {
            console.log('Connection to MongoDB successful');
        }
    )
    .catch( 
        (error) => {
            console.log('Connection to MongoDB failed');
            console.log(error);
        }
    );


server.use('/pokemon', pokemonRoutes);
server.use('/user', userRoutes);





server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


