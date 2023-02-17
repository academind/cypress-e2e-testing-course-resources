import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';

import Layout from './components/Layout';
import { getUserFromSession } from './data/auth.server';
import mainStyles from './styles/main.css';
import tailwindStyles from './styles/tailwind.css';

export const meta = () => ({
  charset: 'utf-8',
  title: 'Cypress Requests',
  viewport: 'width=device-width,initial-scale=1',
});

export const links = () => [
  { rel: 'stylesheet', href: tailwindStyles },
  { rel: 'stylesheet', href: mainStyles },
  { rel: 'icon', href: '/favicon.ico' },
];

export default function App() {
  const isLoggedIn = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gradient-to-br from-slate-900 to-slate-800 h-screen text-slate-300">
        <Layout isLoggedIn={isLoggedIn}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export async function loader({ request }) {
  const userId = await getUserFromSession(request);
  return !!userId;
}
