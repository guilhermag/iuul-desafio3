# IUUL - Desafio 3

O objetivo desse projeto foi a realização do primeiro desafio da residência em desenvolvimento de software da [iUUL](https://iuul.com.br/). O projeto foi a resolução de um desafio com objetivo exercitar conceitos de orientação a objetos na prática utilizando typescript.

## Desenvolvimento de aplicação Orientada a Objetos utilizando Typescript

O diagrama de classes utilizadas para esse projeto foi.

![diagrama classes](./img/esquemaPOO.png)

### Requisitos

Os requisitos foram detalhados [aqui](markdown/requisitos.md).

## Tecnologias utilizadas

- Typescript.

## Como testar o projeto

Para testar o projeto é necessário possuir o [Node.js](https://nodejs.org/en/) instalado, junstamente com o [npm](https://www.npmjs.com/).

```bash
#Clonar o projeto e installar as dependências
git clone https://github.com/guilhermag/iuul-desafio3.git

cd iuul-desafio3/

npm install

# Iniciar o servidor de desenvolvimento
npm run start:dev

# Caso queira gerar os arquivos javascript
npm run build
```

**_O comando de build pode gerar erros no Windows, por causa do rimraf, usuários de Windows deverão deletar a pasta /build manualmente (caso ela ja exista) e rodar o comando novamente._**

## Créditos

Desenvolvido por Guilherme de Araujo Gabriel.
