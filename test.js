var request,app, nconf;

request = require('supertest');
app = require('./app');
nconf = require('./lib/nconf');

describe('Request to the root path', function() {
	it('Returns a 200 status code', function(done) {
		request(app)
			.get('/')
			.expect(200)
			.end(function(error) {
				if(error) throw error;
				done();
			})		
	});
});

// curl -X POST -H "Content-Type: application/json" -i 'http://localhost:3000/mailer?name=Springfield&description=simpson+live'
//Gmail Recaptcha body response { success: false, 'error-codes': [ 'missing-input-response' ] }

describe('Create a email on emailer path', function() {
	it('Unvalid recaptcha without inputs fields', function(done) {
		 request(app)
		 	.post('/mailer')
		 	.send('name=&email=&url_user=&message=&g-recaptcha-response=')
		 	.expect(400)
		 	.expect({"success":false},done);
	});

	it('Validates name, email, message from contact form with valid recaptcha', function(done) {
				request(app)
		 	.post('/mailer')
		 	.send('name=&email=&url_user=&message=&g-recaptcha-response=validresponse')
		 	.expect(400,done);
	});

	it('Returns a 201 status code', function(done) {
		request(app)
		 	.post('/mailer')
		 	.send('name=Simpson&email=simpos&url_user=&message=bienvieniu&g-recaptcha-response=validresponse')
		 	.expect(201,done);
	});

	it('Return the status of email sended', function(done) {
		request(app)
		 	.post('/mailer')
		 	.send('name=Simpson&email=simpos&url_user=notgo.com&message=bienvieniu&g-recaptcha-response=validresponse')
		 	.expect({'email_send' : true},done);
	});
});



