<p align="center">
  <img src="logo.png" />
</p>

## Protótipos
<p align="center">
  <img src="prototipo/login.png" />
  <img src="prototipo/cadastro.png" />
  <img src="prototipo/home.png" />
  <img src="prototipo/lista.png" />
</p>

## Instalação das dependências
Para baixar as dependências é necessário executar
o seguinte comando nos diretórios `backend` e `frontend`
```
yarn install
```
Aconselho usar `yarn` devido o seu arquivo de cache das dependências:

## Configurando projeto
#### Backend
No diretório `backend` altere o nome do arquivo `.env.example` para apenas `.env`. Em seguida, abra o arquivo renomeado anteriormente e atribua seu **IP** (e não *localhost*) a variável **DB_HOST=**

#### Frontend
No diretório `frontend/src/config` abra o arquivo `config.js` e atribua a variável `IP_API` o valor **localhost** caso esteja executando localmente ou o **IP público** caso esteja executando na nuvem.

## Executando projeto
Para executar o projeto é necessário ter instalado em sua máquina as seguintes ferramentas:
- docker
- docker-compose

Após verificar a existencias das ferramentas acima, execute o seguinte comando:
```
docker-compose build && docker-compose up
```
Em seguida no diretório `backend` execute o comando
```
yarn migrate
```
Este comando irá criar as tabelas no banco de dados

## Testes
Este projeto aborda testes de integração. Para executar os testes, acesse o diretório `backend` e execute o comando:
```
yarn test:integration
```
Erros de timeout (por parte do Mocha) podem acontecer, caso aconteça, remova os arquivos `*.sqlite3` e execute novamente.

Ao final da execução dos testes é apresentada uma tabela com a cobertura dos testes, boa parte do código que os testes não cobrem são trechos dentro do `catch()`