const Sequelize=require('sequelize');
const sequelize=require('../database/connection');

module.exports=sequelize.define('Teacher',{
    name:{
        type:Sequelize.STRING(30),
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
        minlength:6
    },
});