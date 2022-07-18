import { rest } from 'msw';
import { setupServer } from 'msw/node';

export default setupServer(
  rest.get('https://pokeapi.co/api/v2/pokemon/:pokemonId', (req, res, ctx) => res(
    ctx.json({ sprites: { front_default: `http://image-path-${req.params.pokemonId}` } }),
    ctx.delay(150),
  )),
  rest.get('https://pokeapi.co/api/v2/item/4/', (req, res, ctx) => res(
    ctx.json({ sprites: { default: 'pokeballImage' } }),
    ctx.delay(150),
  )),
);
