const express = require('express');
const Sequelize = require('sequelize')
const app = express();

app.use(express.json());

const dbUrl = 'postgres://webadmin:LGQysh29684node65887-bank-app.proen.app.ruk-com.cloud:11474/Books'

const sequelize = new Sequelize(dbUrl);