import { Link, useLoaderData } from '@remix-run/react';
import Takeaways from '../components/Takeaways';
import { prisma } from '../data/prisma.server';

export default function Index() {
  const takeways = useLoaderData();

  return (
    <>
      <section className="text-center max-w-5xl mx-auto my-4">
        <h1 className="font-bold text-2xl my-4">Learn Cypress</h1>
        <p>Cypress is an amazing end-to-end testing software and framework.</p>
        <p>
          Manage your key Cypress takeaways and concepts with our learning app.
        </p>
      </section>
      <section className="text-center max-w-5xl mx-auto my-4">
        <Takeaways items={takeways}/>
      </section>
      <section>
        <p className='text-center'>
          <Link to="/takeaways/new" className='bg-blue-700 text-blue-50 rounded-sm px-8 py-4 text-lg hover:bg-blue-600'>+ Add a new takeaway</Link>
        </p>
      </section>
    </>
  );
}

export function loader() {
  return prisma.takeaway.findMany({ take: 2 });
}
