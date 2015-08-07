var transporter, request, nconf;

transporter = require('./../lib/transporter.js');
resque = require('request');
nconf = require('./../lib/nconf');


/**
* Check Captcha google
*/
exports.check = function(req,res,next) {

	// Testing for now... need mockup
	if(process.env.NODE_EVN === 'test'){
		if(req.body["g-recaptcha-response"] === ""){
			res.status(400).json({success: false})
		}else{
			next()
		}

	}else {
		resque.post({url: nconf.get('urlCaptcha'),
		 form: {
		 		secret:  nconf.get('CAPTCHATOK') ,
		 		response: req.body["g-recaptcha-response"]
		 		} 
		 	},
		 	function(err,httpResponse,body){ 
					if(err)throw err;
					var gbody;
		 			
		 			gbody= JSON.parse(body);
		 			
		 			if(gbody.success != "false"){ 
		 				next();
		 		  }else{
		 		  	res.status(400).json(gbody);
		 		  }
 	 });
	}
};


/**
* Validate input form of body response 
*/
exports.validate = function(req,res,next) {
	var dataEmail = req.body;
	
	// Validation
	if( !dataEmail.name || !dataEmail.email || !dataEmail.message){
		res.status(400).json({ not_valid: true });
		return false;
	}

	next();
}


/**
* Send Email with data form
*/
exports.sendEmail = function(req,res,next) {
	var dataEmail = req.body;
	
	// Setup e-mail data
	if(dataEmail["url_user"]){ 
		dataEmail["url_user"] = '\n\n ' + dataEmail["url_user"] + ' -> Pagina web de ' + dataEmail.name;
	}

	var mailOptions = {
	    from: 'Santieherrero Node Mailer <santiemailer@gmail.com>', // sender address
	    to: 'Santieherrero <santieherrero@gmail.com>', // list of receivers
	    subject: dataEmail.name + ' quiere ponerse en contacto contigo.', // Subject line
	    text: dataEmail.message + " " + dataEmail["url_user"], // plaintext body
	}
	

	// Sending email
	transporter.sendMail(mailOptions, function(error, info){
    if(error){
    	res.status(400).json({message: error});
      return error;
    }    
    // console.log(info); // TODO : Log for emails on file server;
   	res.status(201).json({email_send: true}); 
	});
};


