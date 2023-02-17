import { hash, compare } from 'bcryptjs';
import { createCookieSessionStorage, json, redirect } from '@remix-run/node';

import { prisma } from './prisma.server';

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    secrets: [SESSION_SECRET],
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set('userId', userId);
  return redirect(redirectPath, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  const userId = session.get('userId');

  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  });
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect('/login');
  }

  return userId;
}

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    return json({ status: 409, statusText: 'User exists already.' });
  }

  const passwordHash = await hash(password, 12);

  const user = await prisma.user.create({
    data: { email: email, password: passwordHash },
  });
  return createUserSession(user.id, '/takeaways');
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    return json({ status: 400, statusText: 'Invalid credentials.' });
  }

  const passwordCorrect = await compare(password, existingUser.password);

  if (!passwordCorrect) {
    return json({ status: 400, statusText: 'Invalid credentials (pw).' });
  }

  return createUserSession(existingUser.id, '/takeaways');
}
