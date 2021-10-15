//Trazendo o express pro contexto da aplicação
const express    = require('express');
const exphbs     = require('express-handlebars'); //Motor de views
const path       = require('path'); //Importanto diretório padrão

//Trazendo o sequelize para usar o Op para realizar querys personalizadas
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

//Trazendo o body parser (responsavel pela leitura do corpo de requisições)
const bodyParser = require('body-parser');

//Instanciando o express
const app         = express();

//Módulo de conexão
const db          = require('./db/connection');

//Colocando a porta
const PORT        = 3000;

//Models
const Job         = require('./models/Job');

//Instanciando o app na porta escolhida
app.listen(PORT, function() {

});

//Configurando bodyparser
app.use(bodyParser.urlencoded({extended: false}));

//Setando local da views via handlebars/path
app.set('views', path.join(__dirname, 'views'));
//Arquivo principal de layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars'); //Setando view engine do app

//pasta estática
app.use(express.static(path.join(__dirname, 'public')));

//Conexão com database (o authenticate retorna uma promise)
db.authenticate().then(() => {
  console.log('Conectou ao banco com sucesso');
}).catch(erro => {console.log('Ocorreu um erro: ' + erro)});

//Routes
app.get('/', (req, res) => {

  //Variavel caso seja requisitada pesquisa
  let search = req.query.job;  //Requisicao qndo é get vem do QUERY e nao do body
  let query  = '%' + search + '%'; //PH -> PHP

  //Caso no get passe uma pesquisa
  if(search){
    //Model Job -> método findall
    Job.findAll({
      //Utiliza o Op Like do sequelize que foi trazido acima
      where:{title: {[Op.like]: query}},
      order: [
        ['createdAt', 'DESC']]})
  .then(jobs => {
    res.render('index', {jobs, search});
  }).catch(erro => {console.log('Ocorreu um erro: ' + erro)}); 

  //Caso não seja pesquisa retorna tudo
  }else{
    Job.findAll({order: [['createdAt', 'DESC']]})
    .then(jobs => {
      res.render('index', {jobs});
    }).catch(erro => {console.log('Ocorreu um erro: ' + erro)});  
  }

});

//Rotas de Jobs
app.use('/jobs', require('./routes/jobs'));