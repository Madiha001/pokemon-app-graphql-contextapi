import { createContext, useContext, useReducer } from 'react';

/* This context object can be used to share data between components in a React application. */
const PokemonContext = createContext();


/* `initialState` initializes the state of the application.`pokemons` and
`allItems` are arrays that will store lists of Pokemon and items respectively. `pokemon` is an
object that will store information about a single Pokemon. `searchResults` is an array that will
store the results of a search query. `isLoading` is a boolean value that will be used to indicate
whether the application is currently loading data. */
const initialState = { 
  pokemons: [],
  pokemon: {},
  allItems: [],
  searchResults: [],
  isLoading: false
};

//actions
const Loading = "Loading";
const Get_Pokemon = "Get_Pokemon";
const Get_Pokemons = "Get_Pokemons";
const Get_All_Items = "Get_All_Items";
const Get_Search_Results = "Get_Search_Results";

/**
 * The pokemonReducer function is a switch statement that updates the state based on the action type
 * and payload.
 * @returns The pokemonReducer function is returning a new state object based on the action type that
 * is being dispatched. The state properties are updated based on the action type and the payload
 * that is being passed along with it. 
 */
const pokemonReducer = (state, action) => {
  switch (action.type) {
    case Loading:
      return { 
        ...state, 
        isLoading: true 
      };
    case Get_Pokemons:
      return {
        ...state,
        pokemons: action.payload.pokemons.results,
        isLoading: false,
      };
    case Get_Pokemon:
      return { ...state, pokemon: action.payload.pokemon, isLoading: false };

    case Get_All_Items:
      return { ...state, allItems: action.payload.pokemons.results, isLoading: false };

    case Get_Search_Results:
      return { ...state, searchResults: action.payload, isLoading: false };

    default: 
      return state;
  } 
};


/**
 * This is a functional component that provides a Pokemon context to its children.
 * The `PokemonProvider` component is being returned, which wraps its children with the
 * `PokemonContext.Provider` component. The `value` prop of the provider is an object that contains the
 * `state` and `dispatch` values from the `useReducer` hook.
 */
export const PokemonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, initialState);
  
  return (
    <PokemonContext.Provider 
      value={{ 
        state, 
        dispatch 
      }}
    >
        {children}
    </PokemonContext.Provider>
  );
};

/**
 * This function returns the context object for the PokemonContext.
 * This context object can be used to access the
 * state and functions provided by the `PokemonProvider` component.
 */
export const usePokemonContext = () => {
  return useContext(PokemonContext);
};
