import { Form, Link } from '@remix-run/react';
import NewsletterSignup from './NewsletterSignup';

function Layout({ isLoggedIn, children }) {
  return (
    <>
      <header className="flex justify-between max-w-5xl mx-auto p-8 items-center">
        <div className="text-3xl font-mono">
          <Link to="/">LearnCypress</Link>
        </div>
        <nav>
          <ul className="flex gap-6 items-center">
            <li>
              <Link
                to="/takeaways"
                className="text-slate-300 hover:text-slate-200"
              >
                Takeaways
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link
                  to="/login"
                  className="bg-blue-700 px-4 py-1 rounded-sm hover:bg-blue-600 border-2 border-blue-700 hover:border-blue-600"
                >
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Form method="post" action="/logout">
                  <button className="bg-blue-700 px-4 py-1 rounded-sm hover:bg-blue-600">
                    Logout
                  </button>
                </Form>
              </li>
            )}
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer className='mt-16 text-center'>
        <NewsletterSignup />
      </footer>
    </>
  );
}

export default Layout;
