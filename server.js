const express = require('express')
const app = express()
const axios = require('axios')

/*
Verbos HTTP
    GET: Recebe dados de um Resource.
    POST: Envia dados ou informações para serem processados por um Resource.
    PUT: Atualiza dados de um Resource.
    DELETE: Deleta dados de um Resource.

    http://localhost:3000/films
                          ^^^^^^^ <<<<< Resource
*/

getFilmById = async (id) => {
    let film = await axios.get(`http://swapi.dev/api/films/${id}`)
    return film.data
}

getSwapiJson = async (link) => {
    let result = await axios.get(`${link}`)
    return result.data
}

app.use(express.json())

app.get('/films/:id', async function(req, res){
    let { id } = req.params
    let { enrichFields } = req.query; // planets,species,starships,vehicles,characters
    let enrichFieldsArray = enrichFields ? enrichFields.split(',') : []
    let film = await this.getFilmById(id)
    enrichFieldsArray.forEach(enrichField => {
        console.log('enrichField >>>>>', enrichField)
        let links = film[enrichField]
        console.log('links >>>>>', links)
        links.forEach(async link => {
           let result = await this.getSwapiJson(link)
           console.log('result >>>>>', result)
        })
    })
    // TODO - Buscar o json de cada link da lista
    // TODO - Substituir cada link pelo json respectivo
    console.log('>>>> finish')
    res.json(film)
})

app.listen(3000, function() {
    console.log('Server is running')
})
