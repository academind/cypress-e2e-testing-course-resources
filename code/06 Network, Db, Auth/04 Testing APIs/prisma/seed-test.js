// seed prisma database

const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

export async function seed() {
  console.log('Seeding...');
  await prisma.user.deleteMany({});
  await prisma.newsletterSignup.deleteMany({});
  await prisma.takeaway.deleteMany({});

  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: await hash('testpassword', 12),
    },
  });
  await prisma.newsletterSignup.create({
    data: {
      email: 'test2@example.com',
    },
  });
  await prisma.takeaway.create({
    data: {
      title: 'Cypress queues commands',
      body:
        "Your commands (e.g., cy.get()) don't run immediately. They are scheduled to run at some point in the future.",
    },
  });
  await prisma.takeaway.create({
    data: {
      title: 'Cypress acts on subjects',
      body:
        'You can use then() to get direct access to the subject (e.g., HTML element, stub) of the previous command.',
    },
  });
}
