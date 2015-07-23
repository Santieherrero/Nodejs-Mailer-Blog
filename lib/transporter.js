var nodemailer,nconf, generator,transporter;

nodemailer = require('nodemailer'); 
nconf = require('./nconf');

generatorToken = require('xoauth2').createXOAuth2Generator({
    user: nconf.get('userGm'),
    clientId: nconf.get('CID_GOOGLE'),// CID_GOOGLE
    clientSecret: nconf.get('C_GSECRET'),// C_GSECRET
    refreshToken: nconf.get('C_GRTOKEN')// C_GRTOKEN
});

transporter = nodemailer.createTransport(({
    service: 'gmail',
    auth: {
        xoauth2: generatorToken
    }
}));


module.exports = transporter;