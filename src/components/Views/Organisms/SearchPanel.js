import React from 'react';

function SearchPanel(props) {
  const {pokemon, addAsFavorite} = props;

  return (
    <div className="panel-block">
      <div class="card is-full-width" style={{width: '100%'}}>
        <div class="card-image">
          <figure class="image is-4by3">
            <img src={pokemon.image} alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img src={pokemon.thumbnail} alt="Placeholder image" />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4 has-text-grey-dark">{pokemon.name}</p>
              <p class="subtitle is-6 has-text-grey-dark">{pokemon.mainType}</p>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button  onClick={addAsFavorite} class="card-footer-item">like</button>
        </footer>
      </div>
    </div>
  );
}

export default SearchPanel;
