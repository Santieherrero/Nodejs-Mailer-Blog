var nconfg = require('nconf');

nconfg.argv()
       .env()
       .file({ file: './config/config.json' });

module.exports = nconfg;