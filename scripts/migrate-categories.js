#!/usr/bin/env node

const { migrateCategories } = require('../lib/migrateCategories.js');

console.log('🎨 Category Migration Script\n');

migrateCategories()
  .then(() => {
    console.log('\n✅ Migration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }); 