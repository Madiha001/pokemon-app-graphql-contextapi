import { gql } from "@apollo/client";


/* defining a GraphQL query called `GET_POKEMONS` that retrieves a list of Pokemon with
their `id`, `name`, and `image`. The query takes two variables, `limit` and `offset`, which are used
to limit the number of results returned and to paginate through the list of Pokemon. */
export const GET_POKEMONS = gql`
  query pokemons($limit: Int!, $offset: Int!) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      results {
        id
        name
        image
      }
    }
  }
`;

/*GET_POKEMON` is defining a GraphQL query called that retrieves detailed
information about a specific Pokemon based on its name. The query takes a
variable called `name` of type `String` which is used to specify the name of the Pokemon*/
export const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      height
      weight
      types {
        type {
          name
        }
      }
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      stats{
        stat{
          name
        }
      }
      sprites{
        front_default
      }
    }
  }
`;
