#!/usr/bin/env node

const { migrateCategories } = require('../lib/migrateCategories.js');

migrateCategories()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }); 