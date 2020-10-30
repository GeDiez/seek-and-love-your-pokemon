import React from 'react';

function FavoritePokemonsTable(props) {
  const {favoritePokemons, removeFavorite} = props;

  return (
    <table class="table is-striped" style={{width: '100%'}}>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          favoritePokemons.map(pokemon => {
            return (
              <tr>
                <td>
                  <figure class="image is-32x32">
                    <img src={pokemon.thumbnail} />
                  </figure>
                </td>
                <td>{pokemon.name}</td>
                <td>{pokemon.type}</td>
                <td>
                  <button onClick={() => removeFavorite(pokemon.id)} class="button is-danger is-rounded">Quit, I dont like more</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  );
}

export default FavoritePokemonsTable;
