import React, {useEffect, useState} from 'react';
import SearchPanel from "../Organisms/SearchPanel";
import FavoritePokemonsTable from "../Organisms/FavoritePokemonsTable";

function fetchPokemon(name) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(r => r.json()).then(pokemon => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: `https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`,
      thumbnail: pokemon.sprites.front_default,
      weight: pokemon.weight,
      height: pokemon.height,
      mainType: pokemon.types[0].type.name
    }
  })
}

const BACKUP_POKEMONS = localStorage.getItem('PokemonList') ? JSON.parse(localStorage.getItem('PokemonList')) : []
console.log(BACKUP_POKEMONS)

// https://pokeres.bastionbot.org/images/pokemon/${indice + 1}.png

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [favoritePokemons, setFavoritePokemons] = useState(BACKUP_POKEMONS);

  const [wasFound, setWasFound] = useState(true);


  async function handleFecthPokemonButton(name) {
    try {
      const pokemon = await fetchPokemon(name);
      setPokemon(pokemon);
      setWasFound(true)
    } catch (error) {
      setWasFound(false)
    }
  }

  function removeFavorite(id) {
    const filteredList = favoritePokemons.filter(_pokemon => {
      console.log({id, _pokemon},id === _pokemon.id);
      return id !== _pokemon.id
    })

    localStorage.setItem('PokemonList', JSON.stringify(filteredList));
    setFavoritePokemons(filteredList);
  }

  function addAsFavorite() {
    const alreadyExist = favoritePokemons.find(_pokemon => {
      return pokemon.id === _pokemon.id
    })

    if (alreadyExist) {
      return
    }
    localStorage.setItem('PokemonList', JSON.stringify([...favoritePokemons, pokemon]));
    setFavoritePokemons(pokemons => ([...pokemons, pokemon]))
  }

  console.log({pokemon, wasFound})

  useEffect(() => {
    handleFecthPokemonButton(1);
  }, [])

  return (
    <div>
      <div className="container">
        <div id="navMenu" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              Pokemon seek and love
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-dark" href="https://github.com/GeDiez">Github</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="hero is-link is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column">
                <article className="panel is-success">
                  <p className="panel-heading">
                    Find your favorite pokemon
                  </p>

                  <div className="panel-block">
                    <div className="field has-addons" style={{width: '100%'}}>
                      <div className="control" style={{width: '100%'}}>
                        <input className="input" type="text" placeholder="ej: pikachu" value={pokemonName} onChange={({target}) => setPokemonName(target.value)} />
                      </div>
                      <div className="control">
                        <button className="button is-success" onClick={() => handleFecthPokemonButton(pokemonName)}>
                          find my folk
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="panel-block">
                    <h6 className="title is-5 m-1">
                      Quick search
                    </h6>
                    <div className="buttons">
                      <button className="button is-small is-info" onClick={() => handleFecthPokemonButton('charizard')}>charizard</button>
                      <button className="button is-small is-info" onClick={() => handleFecthPokemonButton('pikachu')}>pikachu</button>
                      <button className="button is-small is-info" onClick={() => handleFecthPokemonButton('snorlax')}>snorlax</button>
                      <button className="button is-small is-info" onClick={() => handleFecthPokemonButton('mewtwo')}>mewtwo</button>
                    </div>
                  </div>

                  {!wasFound && (
                    <div className="panel-block">
                      <div className="box m-4">pokemon not found, check the name you typed</div>
                    </div>
                  )}

                  {wasFound && pokemon ? (
                    <SearchPanel pokemon={pokemon} addAsFavorite={addAsFavorite}></SearchPanel>
                  ) : null}
                </article>
              </div>
              <div className="column">
                <FavoritePokemonsTable favoritePokemons={favoritePokemons} removeFavorite={removeFavorite}></FavoritePokemonsTable>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home;
