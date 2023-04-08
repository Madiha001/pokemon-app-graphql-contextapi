import React, { useEffect } from "react";
import { usePokemonContext } from "../context/PokemonContext";
import { useLazyQuery } from "@apollo/client";
import { GET_POKEMON } from "../graphql/query";
import "../styles/pokemon.css";
import '../styles/global.css';


function Pokemon() {

    /* This line is getting the name of the Pokemon from the URL path. This assumes that the
    last element of the array is the name of the Pokemon. */

    const pokemonName = window.location.pathname.split('/').pop();

    /* Using the custom hook to access the state and dispatch function from the PokemonContext. This 
    allows the component to read and update the global state of the application. */
    const { state, dispatch } = usePokemonContext();

    /* Using the `useLazyQuery` hook from the Apollo Client library to define a function `fetchPokemon` 
    that will execute a GraphQL query defined in the `GET_POKEMON` constant. */
    
    const [fetchPokemon, { loading : pokemonLoading, data : pokemonItem }] = useLazyQuery(GET_POKEMON);

    useEffect(() => {
        if (pokemonName) {
            if(pokemonLoading){
                dispatch({ type: "Loading" });
            }
            fetchPokemon({
                variables: { name: pokemonName },
            })
            if(pokemonItem){
                dispatch({ type: "Get_Pokemon", payload: pokemonItem });
            }
        }
    }, [pokemonItem]);

    console.log(state.pokemon)
  //pokemon bg colors
  const pkColors = [
    "#f8d5a3",
    "#f5b7b1",
    "#c39bd3",
    "#aed6f1",
    "#a3e4d7",
    "#f9e79f",
    "#fadbd8",
    "#d2b4de",
    "#a9cce3",
    "#a2d9ce",
    "#f7dc6f",
    "#f5cba7",
    "#bb8fce",
    "#85c1e9",
    "#76d7c4",
  ];

  const randomColor = pkColors[Math.floor(Math.random() * pkColors.length)];

  console.log(randomColor);

  return (
    <div
      className="pokemon-bg"
      style={{
        background: !pokemonLoading && randomColor,
      }}
    >
      {!pokemonLoading ? (
        state.pokemon && (
          <>
            <div className="pokemon-image">
              <img
                src={state.pokemon?.sprites?.front_default}
                alt={state.pokemon?.name}
              />
            </div>
            <div className="pokemon-body">
              <h2>{state.pokemon?.name}</h2>
              <div className="pokemon-info">
                <div className="pokemon-infoitem">
                  <h5>Name:</h5>
                  <p>{state.pokemon?.name},</p>
                </div>

                <div className="pokemon-infoitem">
                  <h5>Type:</h5>
                  {state.pokemon?.types?.map((type) => {
                    return <p key={type.type.name}>{type.type.name},</p>;
                  })}
                </div>

                <div className="pokemon-infoitem">
                  <h5>Height:</h5>
                  <p>{state.pokemon?.height}</p>
                </div>

                <div className="pokemon-infoitem">
                  <h5>Weight:</h5>
                  <p>{state.pokemon?.weight}</p>
                </div>

                <div className="pokemon-infoitem">
                  <h5>Abilities:</h5>
                  {state.pokemon?.abilities?.map((ability) => {
                    return (
                      <p key={ability.ability.name}>{ability.ability.name},</p>
                    );
                  })}
                </div>

                <div className="pokemon-infoitem">
                  <h5>Some Stats:</h5>
                  {state.pokemon?.stats?.slice(0, 3).map((stat) => {
                    return <p key={stat.stat.name}>{stat.stat.name},</p>;
                  })}
                </div>

                <div className="pokemon-infoitem">
                  <h5>Some Moves:</h5>
                  {state.pokemon?.moves?.slice(0, 3).map((move) => {
                    return <p key={move.move.name}>{move.move.name},</p>;
                  })}
                </div>
              </div>
            </div>
          </>
        )
      ) : (
        <div className="loader">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Pokemon;