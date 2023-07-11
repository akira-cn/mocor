const fs = require('node:fs/promises');

module.exports = async function(template, args = {}) {
  const content = await fs.readFile(template, 'utf-8');
  return (new Function(...['app', ...Object.keys(args)], `return \`${content}\``)(this, ...Object.values(args)));
};
