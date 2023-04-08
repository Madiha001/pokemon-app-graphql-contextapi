import { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_POKEMONS } from "../graphql/query";
import { usePokemonContext } from "../context/PokemonContext";
import { debounce } from "lodash";
import '../styles/global.css';

export default function Pokemons() {

    /* initializing state variables and a dispatch function using the `usePokemonContext`
    hook from a custom context. */
    const { state, dispatch } = usePokemonContext();
    const [search, setSearch] = useState("");
    const [offset] = useState(0);
    const [limit] = useState(20);

   /* using the `useQuery` hook from the apollo react-hooks library to fetch data from the 
   GraphQL server using the specific query. */

    const { loading : pokemonsLoading, data : pokemons } = useQuery(GET_POKEMONS, {
        variables: { limit: limit, offset: offset },
    });

    const { data : allPokemons } = useQuery(GET_POKEMONS, {
        variables: { limit: 1279, offset: 0 },
    });

    /* These are two `useEffect` hooks that are used to update the state of the component based on the
    data fetched from the GraphQL server using the `useQuery` hook. */

    useEffect(()=>{
        if(pokemonsLoading){
            dispatch({ type: "Loading" });
        }
        if(pokemons){
            dispatch({ type: "Get_Pokemons", payload: pokemons });
        }
    },[pokemons])

    useEffect(()=>{
        if(allPokemons){
            dispatch({ type: "Get_All_Items", payload: allPokemons });
        }
    },[allPokemons])

    

    /* `This function delay the execution of the search function by 500 milliseconds. It takes in a `search`
    parameter and dispatches a loading action to the state using the `dispatch` function from the
    custom context. It then filters through the `state.allItems` array to find any items whose name
    includes the `search` parameter (converted to lowercase). This function
    is used to perform a real-time search as the user types in the search input field. */

    const realTimeSearch = debounce(async (search) => {
        dispatch({ type: "Loading" });
        //search from all pokemons 
        const res = state.allItems.filter((pokemon) => {
          return pokemon.name.includes(search.toLowerCase());
        });
        console.log(res)
        dispatch({ type: "Get_Search_Results", payload: res });
      }, 500);

    const handleChange = (e) => {
        setSearch(e.target.value);
        realTimeSearch(search)
    };

    const handleSearch = (e) => {
        e.preventDefault();
        realTimeSearch(search)
    };

    /**
     * The function displays a list of clickable Pokemon names based on the search results stored in
     * the state object.*/
    
    const displaySearchResults = () => {
        return state.searchResults.map((pokemon) => {
          return (
            <div
              key={pokemon.id}
              onClick={() => {
                window.location.href = `/${pokemon.name}`
              }}
              className="pokemon-name"
            >
              {pokemon.name}
            </div>
          );
        });
      };    

    return (
    <>
        <form action="" className="search-form" onSubmit={handleSearch}>
            <div className="input-control">
                <input
                    type="text"
                    value={search}
                    onChange={handleChange}
                    placeholder="Enter name of pokemon to seacrh"
                />
                <button className="submit-btn" type="submit">
                    Search
                </button>
            </div>
        </form>

        {search && state.searchResults.length > 0 && (
            <div className="search-results">{displaySearchResults()}</div>
        )}

        <div className="all-pokemon">
            {state.pokemons ? (
             state.pokemons.map((pokemon) => {
                return (
                    <div key={pokemon.id} 
                        className="card" 
                        onClick={() => {
                            window.location.href = `/${pokemon.name}`;
                        }}
                    >
                        <div className="card-image">
                            <img
                                src={pokemon.image}
                                alt={pokemon.name}
                            />
                        </div>
                        <div className="card-body">
                            <h3>{pokemon.name}</h3>
                            <p>More Details &nbsp; &rarr;</p>
                        </div>
                    </div>
                );
            })
            ) : (
            <h1>Loading...</h1>
            )}
        </div>

        <div className="next">
            {state.pokemons.length > 0 && (
            <button className="next-btn" >
                Load More &darr;
            </button>
            )}
        </div>
    </>
    );
}
