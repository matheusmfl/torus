# 🎟️ API de Eventos - Documentação das Rotas

Este documento descreve as rotas disponíveis na API do backend, incluindo autenticação, gerenciamento de eventos, lotes, ingressos e usuários.

## 📌 Rotas de Autenticação (`/auth`)

### ➤ Criar um usuário  
`POST /auth/register`  
**Descrição:** Registra um novo usuário na plataforma.  

### ➤ Login do usuário  
`POST /auth/login`  
**Descrição:** Autentica um usuário e retorna um token de acesso.  

### ➤ Criar um administrador  
`POST /auth/admin`  
**Descrição:** Cria um usuário administrador.  
**Observação:** Essa rota não possui interface e só pode ser acessada via API.  

---

## 📌 Rotas de Eventos (`/events`)

### ➤ Listar eventos  
`GET /events`  
**Descrição:** Retorna a lista de eventos disponíveis.  

### ➤ Criar um evento (Admin)  
`POST /events`  
**Descrição:** Permite a criação de um evento. Apenas administradores podem acessar esta rota.  

### ➤ Obter detalhes de um evento  
`GET /events/:id`  
**Descrição:** Retorna detalhes de um evento específico.  

---

## 📌 Rotas de Lotes (`/batches`)

### ➤ Criar lote de ingressos (Admin)  
`POST /events/:eventId/batches`  
**Descrição:** Cria um novo lote de ingressos para um evento. Apenas administradores podem acessar esta rota.  

### ➤ Atualizar informações do lote (Admin)  
`PATCH /batches/:batchId`  
**Descrição:** Atualiza as informações de um lote existente. Apenas administradores podem acessar esta rota.  

### ➤ Remover lote (Admin)  
`DELETE /batches/:batchId`  
**Descrição:** Exclui um lote de ingressos. Apenas administradores podem acessar esta rota.  

---

## 📌 Rotas de Ingressos (`/tickets`)

### ➤ Comprar ingresso  
`POST /tickets/buy`  
**Descrição:** Permite que um usuário compre um ingresso para um evento.  

### ➤ Listar ingressos comprados  
`GET /tickets/mine`  
**Descrição:** Retorna a lista de ingressos adquiridos pelo usuário autenticado.  

### ➤ Validar ingresso (Admin)  
`POST /tickets/:ticketId/validate`  
**Descrição:** Valida um ingresso para entrada no evento. Apenas administradores podem acessar esta rota.  

### ➤ Transferir titularidade do ingresso  
`POST /tickets/:ticketId/transfer`  
**Descrição:** Permite a transferência de titularidade de um ingresso para outro usuário.  

### ➤ Solicitar estorno do ingresso  
`POST /tickets/:ticketId/refund`  
**Descrição:** Solicita o reembolso de um ingresso comprado.  

---

## 📌 Rotas do Usuário (`/users`)

### ➤ Ver perfil do usuário  
`GET /users/me`  
**Descrição:** Retorna os dados do usuário autenticado.  

### ➤ Atualizar dados do usuário  
`PATCH /users/me`  
**Descrição:** Atualiza as informações do usuário autenticado.  

### ➤ Deletar conta  
`DELETE /users/me`  
**Descrição:** Remove permanentemente a conta do usuário.  

---

## ⚠️ Observações  
- Todas as rotas protegidas exigem autenticação via token JWT.  
- Rotas com permissão de **admin** só podem ser acessadas por usuários com a role `ADMIN`.  
- A API segue um padrão RESTful para facilitar a integração com frontend e mobile.  
