// seed prisma database

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.newsletterSignup.deleteMany({});
  await prisma.takeaway.deleteMany({});

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

main().then(() => {
  console.log('seeded database');
  process.exit(0);
});
