const express = require('express');
const path = require('path');
const userRoute = express();


userRoute.set('view engine', 'ejs');
userRoute.set('views', './views/pages');


userRoute.use(express.json());
userRoute.use(express.urlencoded({extended:true}));


const myController = require ('../controllers/myController');



userRoute.get('/', myController.loadHome);
userRoute.get('/contact', myController.loadContact);
userRoute.post('/send-message', myController.sendMessage);
userRoute.get('/projects', myController.loadProjects);
userRoute.get('/about', myController.loadAbout);
userRoute.get('/journals', myController.loadJournal);
userRoute.get('/email', myController.loadEmailMessage);
userRoute.get('*', myController.load404);



module.exports = userRoute;