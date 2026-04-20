# Consulta Autores & Livros

Projeto front-end construido utilizando **React**, **TypeScript**, **Vite**, **Ant Design**, **Dayjs**, **IndexedDB (localForage)**, e **Docker**.

O principal objetivo deste projeto é fornecer uma aplicação web de gerenciamento simples e bem estruturada para **Livros** e **Autores**.

---
## Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **Ant Design**
- **Dayjs**
- **React Router DOM**
- **localForage** (IndexedDB)
- **Docker**

## Executando com Docker
> **Docker é a forma recomendada de executar este projeto**.

### Requisitos

- Docker Desktop instalado e rodando

### Rodando o projeto

    docker compose up --build
    
    http://localhost:5173

---
## Extra: Executando sem o Docker

### Requisitos

-   Node.js 18+ or 20+
-   npm

### Rodando o projeto

    npm install
    npm run dev
    http://localhost:5173

---

## Funcionalidades

### Autores
- Criar autor (modal)
- Vizualizar autores (tabela)
- Vizualizar um autor específico (modal)
- Excluir um autor (alerta)

### Livros
- Criar livro (modal)
- Vizualizar livros (tabela)
- Vizualizar um livro específico (modal)
- Excluir um livro (alerta)

---

## Regra de negócio

- Um **autor não pode ser excluído** se houver um ou mais livros vinculados a ele.

Essa validação foi implementada para preservar a relação entre autores e livros.

---

## Persistência de dados


Todos os dados do aplicativo são armazenados no navegador usando o **IndexedDB**, por meio da biblioteca `localForage`.

Isso significa que:
- os dados são mantidos entre as atualizações da página
- não é necessário nenhum backend nem API externa
- o armazenamento ocorre no lado do cliente, conforme solicitado no desafio

---
### Organização de pastas do projeto

-   **components/** → Elementos reutilizaveis de UI como modais e layout
-   **pages/** → Orquestração de funcionalidades e lógica de tela (páginas principais)
-   **services/** → Regras de negócio e validação
-   **storage/** → logica de persistência do IndexedDB
-   **types/** → Definição de entidades do TypeScript
-   **utils/** → utilitários auxiliares

----------

## Notas de arquitetura


O projeto foi organizado com foco na **clareza**, na **separação de responsabilidades** e na **manutenção**.

Algumas decisões tomadas:

-   As **páginas** são responsáveis pelo fluxo de funcionalidades e pela coordenação de estados
-   Os **componentes** foram extraídos quando a interface do usuário tinha uma responsabilidade específica (como janelas modais)
-   O **armazenamento** foi isolado para centralizar a lógica de persistência do navegador
-   Os **Serviços** foram utilizados para regras de domínio, como validação de exclusão
-   O **Dayjs** foi utilizado para geração e formatação de datas
-   O **Ant Design** foi utilizado para layout, tabelas, formulários, modais e feedback

----------
## Notas Adicionais

Este projeto foi desenvolvido com foco em:

-   cumprimento dos requisitos
-   implementação simples e fácil de manter
-   estrutura organizada
-   legibilidade
-   interface de usuário consistente utilizando o Ant Design
