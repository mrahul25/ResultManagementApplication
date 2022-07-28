const express=require('express');
const route=express.Router();
const {verifyToken}=require('../../middleware/authMiddleware');
const controller=require('../controllers/controller');

//apis
route.post('/students',verifyToken,controller.create);
route.get('/students',verifyToken,controller.find);
route.put('/students/:id',verifyToken,controller.update);
route.delete('/students/:id',verifyToken,controller.delete);
route.get('/students/:id',controller.findStudent);
route.post('/login',controller.login);
route.post('/register',controller.register);
route.post('/find',controller.check);


module.exports=route;