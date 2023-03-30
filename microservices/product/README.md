# Micro serviço de produto
Micro serviço de produto com [GRPC](https://grpc.io/) e [Express](https://expressjs.com/)

## Requisitos para rodar a aplicação
- [NodeJS latest](https://nodejs.org/pt-br/)
- [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
- [Docker](https://www.docker.com/)
- [Docker-compose](https://docs.docker.com/compose/)

## Iniciando a aplicação
- Instale as dependências executando o comando `yarn`
- Execute o comando `sudo make up` para subir os containers
- Execute o comando `sudo make database-cli` e digite a senha da variável de ambiente `DATABASE_ROOT_USER`.
- No terminal do mysql execute o comando `GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'DATABASE_USER'@'%'; FLUSH PRIVILEGES;`
- Saia do terminal do mysql executando o comando `\q`
- Execute o comando `yarn prisma migrate dev`

## Testes
- Para testes Unitários execute o comando `yarn test`
- Para testes ponta a ponta (e2e) execute o comando `yarn test:e2e`
- Para usar o modo de observação execute o comando `yarn test:watch`
- Para usar o modo de cobertura execute o comando `yarn test:cov`

## Comandos para manusear os containers
- Para subir os containers execute o comando `sudo make up`
- Para derrubar os containers execute o comando `sudo make down`
- Para listar os containers execute o comando `sudo make list-containers`
- Para entrar no container do banco de dados execute o comando `sudo make database-cli`
- Para reiniciar o container do micro serviço execute o comando `sudo make restart-microservice`
- Para reiniciar o container do banco de dados execute o comando `sudo make restart-database`
- Para derrubar o container do micro serviço execute o comando `sudo make down-product-microservice`
- Para visualizar os logs do container do micro serviço execute o comando `sudo make logs-microservice` 
- Para visualizar os logs do container do banco de dados execute o comando `sudo make logs-database`
