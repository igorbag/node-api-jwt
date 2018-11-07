const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				

module.exports = {
	/**Function responsavel por realizar o cadastro do usuário */
	create: function(req, res, next) {
		console.log(req.body);
		userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function (err, result) {
				  if (err) 
				  	next(err);
				  else
				  	res.json({status: "success", message: "Dados cadastrados com sucesso", data: null});
				  
				});
	},

	/**Function responsavel por realizar a autenticacao */
	authenticate: function(req, res, next) {
		userModel.findOne({email:req.body.email}, function(err, userInfo){
					if (err) {
						next(err);
					} else {

						if(userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
						 const token = jwt.sign({id: userInfo._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

						 res.json({status:"success", message: "Dados pesquisados com sucesso", data:{user: userInfo, token:token}});	

						}else{

							res.json({status:"error", message: "Email ou seha inválidos", data:null});

						}
					}
				});
	},

}					
