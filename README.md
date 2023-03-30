# grpc microservice
Estudos básicos sobre o grpc

## Requisitos para rodar a aplicação
 - [NodeJS latest](https://nodejs.org/pt-br/)
 - [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable)
 - [Docker](https://www.docker.com/)
 - [Docker-compose](https://docs.docker.com/compose/)

## Instalando as dependências
- Execute o comando `yarn`

## Subindo os contêineres do docker
- Entre no diretório `microservices/products` e execute o comando `sudo make up`

- Entre no diretório `microservices/pharmacy` e execute o comando `sudo make up`

- Entre no diretório `api` e execute o comando `sudo make up`

### Concedendo privilégios para o usuário do banco de dados
Isso é necessário porquê o mariadb não concede permissão de `CREATE, ALTER, DROP` na criação de novos usuários, e sem essas permissões, não será possível realizar as migrações para o banco de dados.
- Execute o comando `sudo make database-cli` e digite a senha da variável de ambiente `DATABASE_ROOT_USER`.

- No terminal do mysql execute o comando `GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'DATABASE_USER'@'%'; FLUSH PRIVILEGES;`

- Saia do terminal do mysql executando o comando `\q`

## Realizando as migrações do prisma para o banco de dados
### Para o micro-serviço de produtos
 - Entre no diretório microservices/products e execute o comando `yarn prisma migrate dev`
 
### Para o micro-serviço de farmácia
 - Entre no diretório microservices/pharmacy e execute o comando `yarn prisma migrate dev`

### Pronto, a configuração da aplicação com docker está completa. 🚀

## Iniciando a aplicação sem o docker
- Instalando as dependências: entre no diretório api, microservice/pharmacy, microservice/products e execute o comando `yarn`

- Realizar as migrações para o banco de dados: execute o comando `yarn prisma migrate dev`

- Executando o projeto em desenvolvimento: execute o comando `yarn dev`

## Consumindo o micro serviço
Para isso, você vai precisar de um cliente de requisições, você pode utilizar o insomnia, postman ou outro de sua preferência para isso.

Aqui está o arquivo em `.json` para você importar no seu cliente de requisições [insomnia enviroment collection](.github/).

## Visualizando os dados no banco de dados
Entre no diretório microservices/pharmacy, microservices/products e execute `yarn prisma studio`.

O prisma vai abrir uma guia em seu navegador, lá você poderá visualizar os dados.

## Rotas para a farmácia
 
| MÉTODO  | ROTA |
| ------------- | ------------- |
| POST  | /createPharmacy  |
| GET  | /getPharmacyByName  |
| GET  | /getAllPharmacys  |
| PUT  | /updatePharmacyData/1  |
| DELETE  | /deletePharmacy/1  |

## Rotas para a filial
 
| MÉTODO  | ROTA |
| ------------- | ------------- |
| POST  | /createSubsidiary/1  |
| GET  | /getSubsidiaryByName  |
| GET  | /getAllSubsidiarys  |
| PUT  | /updateSubsidiaryData/1  |
| DELETE  | /deleteSubsidiary/1  |

## Rotas para o produto
 
| MÉTODO  | ROTA |
| ------------- | ------------- |
| POST  | /createProduct  |
| POST  | /cloneProduct/1  |
| GET  | /getProductsByName  |
| GET  | /getAllProducts  |
| PUT  | /updateProductData/1  |
| DELETE  | /deleteProduct/1  |
