import { destroyUserSession } from '~/data/auth.server';
import { BadRequestErrorResponse } from '../util/errors';

export function action({ request }) {
  if (request.method !== 'POST') {
    throw new BadRequestErrorResponse('HTTP method not allowed.');
  }

  return destroyUserSession(request);
}
