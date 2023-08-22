import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function PokeInfo(req: NextApiRequest, res: NextApiResponse<PokeCardData>) {
  if(req.method === 'GET') {
    const pokeName = req.query.name
    let response = <PokeCardData>{}
    let pokemonData = <PokeData>{}
    if(req.query.name) {
      const { data } = await axios.get(`https://dev-api-teste.mandarin.com.br/pokemons?name=${pokeName}`)
      pokemonData = data[0]
    } else {
      const { data } = await axios.get('https://dev-api-teste.mandarin.com.br/pokemons')
      pokemonData = data[Math.floor((Math.random()*14))]
    }
    
    switch(pokemonData.category) {
      case 'Ice':
        response.bgColor = '#b0e0e6'
        response.cardColor = '#74b6be'
        response.type = 'Gelo 🧊'
        response.effectiveness = ['Dragão', 'Planta', 'Terrestre', 'Voador']
        response.weakness = ['Aço', 'Fogo', 'Lutador', 'Pedra']
        break
      case 'Grass':
        response.bgColor = '#a1d083'
        response.cardColor = '#6ab04c'
        response.type = 'Planta 🌱'
        response.effectiveness = ['Água', 'Pedra', 'Terrestre']
        response.weakness = ['Fogo', 'Gelo', 'Inseto', 'Venenoso', 'Voador']
        break
      case 'Psychic':
        response.bgColor = '#649c9c'
        response.cardColor = '#457a7a'
        response.type = 'Psíquico 💫'
        response.effectiveness = ['Lutador', 'Venenoso']
        response.weakness = ['Fantasma', 'Inseto', 'Sombrio']
        break
      case 'Fire':
        response.bgColor = '#d19e99'
        response.cardColor = '#d07f76'
        response.type = 'Fogo 🔥'
        response.effectiveness = ['Aço', 'Gelo', 'Inseto', 'Planta']
        response.weakness = ['Água', 'Pedra', 'Terrestre']
        break
      case 'Water':
        response.bgColor = '#a8bde7'
        response.cardColor = '#6c92e7'
        response.type = 'Água 💧'
        response.effectiveness = ['Fogo', 'Pedra', 'Terrestre']
        response.weakness = ['Elétrico', 'Planta']
        break
      case 'Bug':
        response.bgColor = '#b2ba7f'
        response.cardColor = '#8e9763'
        response.type = 'Inseto 🦗'
        response.effectiveness = ['Planta', 'Psíquico','Sombrio']
        response.weakness = ['Fogo', 'Pedra', 'Voador']
        break
      case 'Electric':
        response.bgColor = '#f5d485'
        response.cardColor = '#f3c856'
        response.type = 'Elétrico ⚡'
        response.effectiveness = ['Água', 'Voador']
        response.weakness = ['Terrestre']
        break
      case 'Rock':
        response.bgColor = '#99aeb8'
        response.cardColor = '#74858f'
        response.type = 'Pedra 🌑'
        response.effectiveness = ['Fogo', 'Gelo','Inseto', 'Voador' ]
        response.weakness = ['Água', 'Aço', 'Lutador', 'Planta', 'Terrestre']
        break
      case 'Normal':
        response.bgColor = '#e0b8a9'
        response.cardColor = '#d69b85'
        response.type = 'Normal ⭐'
        response.effectiveness = ['Nenhum']
        response.weakness = ['Lutador']
        break
      case 'Ground':
        response.bgColor = '#d4d1a1'
        response.cardColor = '#c0bd7e'
        response.type = 'Terrestre 🛕'
        response.effectiveness = ['Aço', 'Elétrico', 'Fogo', 'Pedra', 'Venenoso']
        response.weakness = ['Água', 'Gelo', 'Planta']
        break
    }

    response = {
      ...response,
      name: pokemonData.name,
      gifUrl: pokemonData.image_url,
      bgUrl: pokemonData.background_image_url,
    };

    res.status(200).json(response)

  }  else {
    res.status(405).json({
      name: 'wrong method',
      type: '',
      gifUrl: '',
      bgUrl: '',
      bgColor: '',
      cardColor: '',
      effectiveness: [],
      weakness: []
      })
  }
}
