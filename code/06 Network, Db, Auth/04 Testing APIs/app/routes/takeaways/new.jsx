import { json, redirect } from '@remix-run/node';
import { Form, Link, useNavigate } from '@remix-run/react';

import Modal from '../../components/Modal';
import { requireUserSession } from '../../data/auth.server';
import { prisma } from '../../data/prisma.server';

function NewTakewayRoute() {
  const navigate = useNavigate();

  return (
    <Modal onClose={() => navigate('..', { relative: 'path' })}>
      <Form method="post">
        <p>
          <label
            htmlFor="title"
            className="block mb-1 font-semibold text-slate-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            maxLength={200}
            className="px-2 py-1 bg-slate-200 w-full"
            data-cy="title"
          />
        </p>
        <p>
          <label
            htmlFor="body"
            className="block mb-1 font-semibold text-slate-600"
          >
            Body
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={5}
            className="px-2 py-1 bg-slate-200 w-full"
            data-cy="body"
          />
        </p>
        <p className="flex gap-4 justify-end items-center">
          <Link to=".." className="text-slate-600 hover:text-slate-500">
            Cancel
          </Link>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded-sm hover:bg-blue-400"
            data-cy="create-takeaway"
          >
            Create
          </button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewTakewayRoute;

export function loader({ request }) {
  return requireUserSession(request);
}

export async function action({ request }) {
  const fd = await request.formData();
  const title = fd.get('title');
  const body = fd.get('body');

  if (!title || !body) {
    return json({ message: 'Title and body are required.' }, { status: 400 });
  }

  await prisma.takeaway.create({
    data: {
      title,
      body,
    },
  });

  return redirect('/takeaways');
}
