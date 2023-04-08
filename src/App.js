import './App.css';
import { PokemonProvider } from './context/PokemonContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pokemons from './pages/pokemons';
import Pokemon from './pages/pokemon';

/**
 * This is a React component that sets up routes for displaying a list of Pokemons and individual Pokemon 
 * details. The first `Route` component has an exact path of "/" and renders the `Pokemons` component. 
 * The second `Route` component has a path of "/:pokemonName" and renders the `Pokemon` component.*/
const App = () => {
  return (
      <PokemonProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Pokemons />} />
            <Route path="/:pokemonName" element={<Pokemon />} />
          </Routes>
        </Router>
      </PokemonProvider>
  );
};

export default App;
