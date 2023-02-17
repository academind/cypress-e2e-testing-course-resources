import { Form, Link, useActionData } from '@remix-run/react';

function Auth({ mode }) {
  const validationData = useActionData();
  
  return (
    <Form
      method="post"
      action={`/${mode}`}
      className="bg-slate-800 px-4 rounded-md my-4 max-w-lg mx-auto p-4"
    >
      <p>
        <label
          htmlFor="email"
          className="font-semibold block mb-1 text-slate-400"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mb-2 w-full rounded-sm text-lg px-2 py-1 bg-slate-400 text-slate-900"
          data-cy="auth-email"
        />
      </p>
      <p>
        <label
          htmlFor="password"
          className="font-semibold block mb-1 text-slate-400"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={6}
          className="mb-2 w-full rounded-sm text-lg px-2 py-1 bg-slate-400 text-slate-900"
          data-cy="auth-password"
        />
      </p>
      {validationData && <p className="text-pink-300">{validationData.statusText}</p>}
      <p className="flex justify-end mt-2 gap-4 items-center">
        <Link
          to={mode === 'login' ? '/signup' : '/login'}
          className="text-slate-400 hover:text-slate-500"
        >
          {mode === 'login'
            ? 'Create a new account'
            : 'Log in with existing account'}
        </Link>
        <button
          type="submit"
          className="bg-blue-600 px-5 py-1 rounded-sm text-white hover:bg-blue-500"
          data-cy="auth-submit"
        >
          {mode === 'login' ? 'Login' : 'Create Account'}
        </button>
      </p>
    </Form>
  );
}

export default Auth;
