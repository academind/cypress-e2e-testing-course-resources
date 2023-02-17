import { defineConfig } from 'cypress';

import { seed } from './prisma/seed-test';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        async seedDatabase() {
          await seed();
          return null;
        }
      })
    },
  },
});
