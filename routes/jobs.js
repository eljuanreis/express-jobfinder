//Trazendo o express pro contexto das rotas
const express = require('express');

const router = express.Router();

//Trazendo o model
const Job = require('../models/Job');

router.get('/add', (req,res) => {
  res.render('add');
});

//Adicionando job via post
router.post('/add', (req, res) => {
  //Pegando o corpo da requisição
  let {title, salary, company, description, email, new_job} = req.body;

  //fazendo uma validação báisca
  if(title == "" || salary == "" || company == "" || description == "" || email == "" || new_job == "") {
    return res.redirect('/?erro=0');
  }

  //inserção de dados
  Job.create({
    title, 
    salary,
    company,
    description,
    email,
    new_job
  }).then(() => res.redirect('/')).catch(error => console.log(error));
});

//Mostrar vagas especifica
router.get('/view/:id', (req, res) => {
  Job.findOne({
    where:{id: req.params.id} //Recebendo parametros pela rota
  }).then(job => {
    let date = new Date(job.dataValues.createdAt).toLocaleDateString();
    res.render('view', {job, date});
  }).catch(error => console.log(error));
});

module.exports = router;