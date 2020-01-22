const fs = require('fs');
const path = require('path');

function createModsDirectory() {
  const modsPath = path.join(process.cwd(), 'mods');

  if (fs.existsSync(modsPath)) {
    console.log('Found mods directory.');
    return;
  }

  console.log('Mods directory not found.');
  fs.mkdirSync(modsPath);
  console.log('Mods directory created.');
}

module.exports = { createModsDirectory };
