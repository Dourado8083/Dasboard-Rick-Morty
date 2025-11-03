# 🚀 Desafio Front-End: Rick and Morty Dashboard

## 🎯 Objetivo

[cite_start]Criar um dashboard consumindo a API do Rick and Morty [cite: 4][cite_start], utilizando Angular 17+ com standalone components, Bootstrap, HTML e SCSS[cite: 4].

[cite_start]A ideia é avaliar sua organização, entendimento do framework, uso de RxJS e Signals, e sua atenção à estrutura do projeto[cite: 5].

## 💻 Tecnologias e Boas Práticas Esperadas

[cite_start]O projeto deve ser construído com as seguintes tecnologias e seguir as melhores práticas do Angular[cite: 6]:

* [cite_start]**Framework:** Angular 17+ com standalone components[cite: 7].
* [cite_start]**Reatividade:** Uso de RxJS e Signals[cite: 8].
* [cite_start]**Estilização:** Bootstrap, HTML e SCSS[cite: 9].
* [cite_start]**Estrutura:** Organização de pastas seguindo boas práticas (core, shared, features)[cite: 10].
* [cite_start]**Dados:** Consumo de API REST [cite: 10] [cite_start](`rickandmortyapi.com/documentation` [cite: 13]).

## [cite_start]✨ Requisitos Essenciais [cite: 11]

### 1. Estrutura e Rotas

* [cite_start]Criar um projeto Angular e subir em um repositório público no GitHub[cite: 12].
* [cite_start]Utilizar a API do Rick and Morty[cite: 13].
* Criar as seguintes rotas:
    * [cite_start]`/characters` [cite: 14]
    * [cite_start]`/locations` [cite: 15]
    * [cite_start]`/episodes` [cite: 16]

### 2. Dashboard (Listagem)

[cite_start]Cada página deve conter um dashboard (tabela/listagem) [cite: 17] com as colunas:

* [cite_start]**Name** [cite: 18]
* [cite_start]**Status** [cite: 19]
* [cite_start]**Details** (com um botão para visualizar informações detalhadas) [cite: 20]

### 3. Funcionalidades Extras na Listagem

* [cite_start]Implementar scroll infinito (ao chegar ao final da página, carregar mais itens na tabela)[cite: 23].
* [cite_start]Implementar uma barra de pesquisa que persista ao trocar de rotas[cite: 24].

### 4. Página de Detalhes

* [cite_start]Criar uma página de detalhes do personagem, com layout livre[cite: 25].
* [cite_start]Exemplo de dados a exibir: foto, status, espécie, gênero e outros dados interessantes[cite: 26].

### 5. Layout Global

* [cite_start]**Header:** Criar header com logo, botão de abrir e fechar sidebar, e dropdown contendo: botão para deslogar, botão para ir para 'Meu Perfil' e o nome do usuário[cite: 27].
* [cite_start]**Sidebar:** Criar sidebar com itens: 'Characters', 'Locations' e 'Episodes'[cite: 28].

## [cite_start]🌟 Seria legal se tivesse... (Funcionalidades Bônus) [cite: 29]

### 1. Página de Login e Autenticação Fake

* [cite_start]Página de Login [cite: 30] [cite_start](não precisa de back-end [cite: 31]).
* [cite_start]Deve usar guards do Angular para proteger as rotas[cite: 32].
* [cite_start]Ao logar, salvar um token fake (JWT) no `localStorage`[cite: 33].
* [cite_start]Caso o usuário já esteja logado e tente acessar `/login`, redirecioná-lo para a página principal[cite: 34, 35].
* [cite_start]Ao clicar em "Sign out", apagar o token e redirecionar para o login[cite: 36].

### 2. Página "Meu Perfil"

* [cite_start]Pode ter o mesmo layout dos detalhes de personagem (ou outro, se preferir)[cite: 37, 38].

### 3. Outras Features

* [cite_start]Qualquer outra feature que você ache interessante é bem-vinda[cite: 39]!

## ❌ Evitar

* [cite_start]Utilizar inteligência artificial[cite: 41]. (Tudo bem utilizar para tirar algumas dúvidas, mas queremos ver o quanto você sabe se virar!) [cite_start][cite: 42].

---
