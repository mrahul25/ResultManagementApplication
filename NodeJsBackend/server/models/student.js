const Sequelize=require('sequelize');
const sequelize=require('../database/connection');

module.exports=sequelize.define('Student',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    rollNo:{
        type:Sequelize.INTEGER,
        allowNull:false,
        unique:true
    },
    name:{
        type:Sequelize.STRING(30),
        allowNull:false
    },
    dob:{
        type:Sequelize.DATE,
        allowNull:false
    },
    score:{
        type:Sequelize.INTEGER,
        allowNull:false     
    }
});