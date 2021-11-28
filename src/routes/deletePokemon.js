const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon === null){
        const message = "Le pokemon demandé n'existe pas. Essayez de nouveau avec un autre identifiant."
        return res.status(404).json({message}) //return important pour interrompre le code
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({ // return permet de factoriser la gestion de l'erreur 500
        where: { id: pokemon.id }
      })
      .then(_ => {
        const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
        res.json({message, data: pokemonDeleted })
      })
      .catch(error => {
        const message = "Le pokémon n'a pas pu être récupéré. Essayez de nouveau dans quelques instants."
        res.status(500).json({message, data : error})
      })
    })
  })
}