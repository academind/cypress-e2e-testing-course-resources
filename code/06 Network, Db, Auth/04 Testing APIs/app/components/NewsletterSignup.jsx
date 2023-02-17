import { useFetcher } from '@remix-run/react';

function NewsletterSignup() {
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === 'submitting';
  let result;

  if (fetcher.data && fetcher.data.status !== 201) {
    result = 'error';
  }

  if (fetcher.data && fetcher.data.status === 201) {
    result = 'success';
  }

  return (
    <div>
      {result !== 'success' && (
        <fetcher.Form method="post" action="/newsletter">
          <p>
            <input
              type="email"
              name="email"
              placeholder="email@example.com"
              className="px-2 py-1 rounded-l-sm text-slate-900"
              data-cy="newsletter-email"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3 py-1 text-white bg-blue-500 rounded-r-sm"
              data-cy="newsletter-submit"
            >
              {isSubmitting ? <span className="loader" /> : 'Sign up'}
            </button>
          </p>
          {result === 'error' && (
            <p className="mt-2 text-slate-400">
              {fetcher.data.message || 'Something went wrong'}
            </p>
          )}
        </fetcher.Form>
      )}
      {result === 'success' && <p>Thanks for signing up!</p>}
    </div>
  );
}

export default NewsletterSignup;
