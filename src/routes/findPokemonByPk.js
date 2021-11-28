const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
          const message = "Le pokemon demandé n'existe pas. Essayez de nouveau avec un autre identifiant."
          return res.status(404).json({message}) //return important pour interrompre le code
        }

        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = "Le pokémon n'a pas pu être récupéré. Essayez de nouveau dans quelques instants."
        res.status(500).json({message, data : error})
      })
  })
}