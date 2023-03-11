// src/mocks/handlers.js
import {rest} from 'msw';

export const handlers = [
  // Handles a POST /login request
  rest.get('https://api.math.tools/numbers/fact', (req, res, ctx) => {
    const number = req.url.searchParams.get('number');
    return res(
      ctx.json({
        contents: {
          fact: `Fact for ${number}`,
        },
      }),
    );
  }),
];
