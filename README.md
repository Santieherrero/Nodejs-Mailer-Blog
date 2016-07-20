# Node-Emailer Blog

A mailer app for my blog with nodejs.

Checks reCAPTCHA to google and send a email if all it's ok !

Uses **env variables** for Google keys and other important keys.

## Libraries

* express
* nodemailer
* xoauth2
* request
* nconf
* body-parser

## Test Libraries

* mocha
* supertest


## Deploy

This app its deploy with heroku for free dyno. 


### *TODOS* 

* Fix test for ReCaptcha Google
* Clean and refactory test
* Log emails that were sent from app (only address and time)
* ....