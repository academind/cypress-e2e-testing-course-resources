import { isValidEmail } from '../util/validation.server';
import { wait } from '../util/wait';
import { prisma } from './prisma.server';

export async function addNewsletterContact(email) {
  if (!isValidEmail(email)) {
    throw new Error('Invalid email address.');
  }

  const existingContact = await prisma.newsletterSignup.findUnique({
    where: {
      email,
    },
  });
  await wait(2000);

  if (existingContact) {
    throw new Error('This email is already subscribed.');
  }


  await prisma.newsletterSignup.create({
    data: {
      email,
    },
  });
}
