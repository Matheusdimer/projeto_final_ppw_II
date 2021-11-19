# Projeto Final PPW II - UNESC

##Links
- [Repositório GitHub](https://github.com/Matheusdimer/projeto_final_ppw_II)
- URL da API: [https://projeto-final-ppw-ii.herokuapp.com/](https://projeto-final-ppw-ii.herokuapp.com/api/)


## Rotas disponíveis

### Autenticação
`POST /api/auth`

```json
{
  "username": "matheus",
  "password": "123"
}
```

### Usuários
`GET /api/users`

`GET /api/users/{id}`

`POST /api/users`

`PUT /api/users/{id}`

`DELETE /api/users/{id}`