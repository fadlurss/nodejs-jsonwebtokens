var express             = require('express'),
    app                 = express(),
    bodyParser          = require('body-parser'),
    morgan              = require('morgan'),
    mongoose            = require('mongoose'),


    jwt                 = require('jsonwebtoken'),
    config              = require('./config'),
    User                = require('./app/models/user');


    //configurations
    mongoose.connect(config.url, { useNewUrlParser: true });
    app.set('superSecret', config.secret);
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    apiRoutes = express.Router();

    //ROUTES
    // app.get("/", function(req,res){
    //     res.send("Hello");
    // });

    // app.get("/setup", function(req,res){
    //     //create a sample user
    //     var nick = new User({
    //         name : "Nick Jonas",
    //         password: "password",
    //         admin: true
    //     });

    //     //save the sample user
    //     nick.save(function(err){
    //         if(err) throw err;
    //         console.log("User saved succesfully");
    //         res.json({success: true});
    //     });
    // });

    
    apiRoutes.post('/authenticate', function(req,res){

        //find the user
        User.findOne({
            name: req.body.name 
        }, function(err, hasil_user){
            if(err) throw err; //kondisi pertama

            if (!hasil_user){ //kondisi kedua
                res.json({success: false, message: "Authentication failed, user not found"});
            } else if(hasil_user){ //kondisi ketiga

                //check if password matched
                if(hasil_user.password != req.body.password){
                    res.json({success: false, message: "Authentication failed, Wrong password"});
                } else {
                    //if user is found and password matched
                    //create a token with only our given payload
                    var payload = {
                        admin: hasil_user.admin
                    };
                        var token = jwt.sign(payload, app.get('superSecret'), {
                            expiresIn: 86400 //expires in 24 hours
                        });

                        //return the information
                        res.json({
                            success: true,
                            message: 'Enjoy your token!',
                            token: token
                        });
                }
            }
        });
    });


    apiRoutes.use(function(req,res,next){
         // check header or url parameters or post parameters for token
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];


        //decode token
        if(token) {
            //verifies secret and checks exp
            jwt.verify(token, app.get('superSecret'), function(err, decoded){
                if(err){
                    return res.json({success: false, message: "Failed to authenticate token"});
                }else {
                // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.' 
            });
        }
        
    });

    apiRoutes.get("/", function(req,res){ //routes to show a random message
        res.json({message: "Welcome to the coolest API on earth!"});
    });

    //showing our users
    apiRoutes.get("/users",function(req,res){ // route to return all users
        User.find({}, function(err, users){
            res.json({users});
        });
    });

    apiRoutes.get('/check', function(req, res) {
        res.json(req.decoded);
    });
    

    app.use("/api", apiRoutes); // apply the routes to our application with the prefix / api
    //klw ngejalanin localhost:3000/api keluarnya sama kayak welcome to the coolest api

    app.get("*", function(req,res){
        res.send("404");
    });
    
    app.listen(3000, function(req,res){
        console.log("Server nodejs jwt telah dimulai!");
    });