import { Link, Outlet, useLoaderData } from '@remix-run/react';

import Takeaways from '../components/Takeaways';
import { requireUserSession } from '../data/auth.server';
import { prisma } from '../data/prisma.server';

function TakewaysLayoutRoute() {
  const takeaways = useLoaderData();

  return (
    <>
      <Outlet />
      <h1 className="text-center text-3xl font-bold text-slate-400">
        Your key takeaways
      </h1>
      <div className="text-right my-8 max-w-2xl mx-auto">
        <Link
          to="/takeaways/new"
          className="border-blue-300 px-4 py-3 border-2 text-blue-300 hover:bg-blue-300 hover:text-blue-900"
        >
          + Add a new takeaway
        </Link>
      </div>
      {takeaways.length === 0 && <p className='text-center my-16 text-xl'>You have no key takeaways yet!</p>}
      <Takeaways items={takeaways} />
    </>
  );
}

export default TakewaysLayoutRoute;

export async function loader({ request }) {
  await requireUserSession(request);

  return prisma.takeaway.findMany();
}
