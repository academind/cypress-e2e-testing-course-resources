import { json } from '@remix-run/node';

import Auth from '../components/Auth';
import { signup } from '../data/auth.server';
import { isValidEmail, isValidPassword } from '../util/validation.server';

function SignupRoute() {
  return <Auth mode="signup" />;
}

export default SignupRoute;

export async function action({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  if (
    !isValidEmail(credentials.email) ||
    !isValidPassword(credentials.password)
  ) {
    return json({ message: 'Invalid credentials entered.' }, { status: 400 });
  }

  return signup(credentials);
}
