# Next sneakerfit

> SneakerFit é o protótipo de uma aplicação de e-commerce e painel administrativo desenvolvida em um grupo acadêmico com Next.js 15, TypeScript e Tailwind CSS v4.

<img width="400" alt="sneakerfit-pages" src="https://github.com/user-attachments/assets/38ff68c9-2827-40c7-a6b9-2ce271d6a44f" />

### 🛍️ Loja (Store)

- Exibição e adição de produtos ao carrinho com atendimento pelo WhatsApp

### 🧾 Dashboard Administrativo

- Gestão completa de produtos, clientes, pedidos, funcionários e tarefas
- Criação, edição e exclusão (CRUD) para todas as entidades
- Relações entre entidades, ex: Produtos ⬅️➡️ Pedidos ⬅️➡️ Clientes

### ⚙️ Integração e Banco de Dados

- API REST construída com Next.js Route Handlers
- Persistência de dados com Prisma ORM
- Banco de dados Neon Serverless Postgres (PostgreSQL na nuvem)
- Deploy e conexões seguras com variáveis de ambiente

### 🧠 Tecnologias Utilizadas

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

### 🚀 Guia Rápido de Instalação

Instale as dependências

```bash
npm install
```

Configure as variáveis de ambiente crie um arquivo .env na raiz do projeto e adicione

```.env
DATABASE_URL="<sua url privada para conexão com um banco de dados>"
NEXT_PUBLIC_HOST_URL="http://localhost:3000"
```

O banco de dados utilizado é o [Neon Serverless Postgres](https://neon.com), um serviço gratuito e escalável para PostgreSQL na nuvem.

Execute as migrações do Prisma

```bash
npx prisma migrate dev --name init
```

Inicie o servidor de desenvolvimento

```bash
npm run dev
```

### 🖼️ Recursos Visuais

As imagens/avatares utilizadas no projeto foram obtidas do site
[Vecteezy](https://pt.vecteezy.com), uma plataforma de vetores e fotos livres para uso pessoal e comercial.

### 📂 Estrutura do Projeto (resumo)

```txt
src/
├── app/
│ ├── api/ (rotas com Prisma)
| |
│ ├── store/
│ │ ├── _components/
| | └── tasks/
| |
│ ├── dashboard/
│ │ ├── _components/
│ │ ├── products/
│ │ ├── employees/
│ │ ├── customers/
│ │ ├── orders/
│ │ └── tasks/
| |
├── components/
├── lib/
├── utils/
└── app.types.ts/
```

📜 Licença

Este projeto é de uso educacional e open-source.
Sinta-se à vontade para clonar, adaptar e melhorar conforme suas necessidades. ✨
