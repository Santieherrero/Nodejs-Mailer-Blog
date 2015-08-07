var nconfg = require('nconf');

nconfg.argv()
       .env()
       .file({ file: './config/config.json' });

if(process.env.NODE_EVN === 'test'){ nconfg.file({ file: './config/env.json' }); }

module.exports = nconfg;