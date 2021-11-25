# Projeto Final PPW II - UNESC

## Links
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

### Viagens
`GET /api/viagens`

`GET /api/viagens/{id}`

`POST /api/viagens`

`PUT /api/viagens/{id}`

`DELETE /api/viagens/{id}`

#### Exemplo:

```json
{
  "id": 1,
  "viajante": {
    "id": 87102,
    "cpf": "***.157.645-**",
    "nome": "ROSE MARY SILVEIRA MENEZES",
    "cargo": "ASSISTENTE EM ADMINISTRAçãO",
    "funcao": "FG-0001",
    "descricao_funcao": "FG-0001"
  },
  "situacao": "NAO_REALIZADA",
  "urgente": "NAO",
  "justificativa_urgencia": "Sem informação",
  "orgao": {
    "id": 42,
    "codigo": 26000,
    "nome": "Ministério da Educação"
  },
  "destinos": "Fortaleza/CE",
  "motivo": "Participação no XXI Congresso Nacional de Secretariado e Reunião de Diretoria",
  "data_inicio": "2021-05-11T00:00:00.000Z",
  "data_fim": "2021-05-16T00:00:00.000Z",
  "valor_passagens": 1179.77,
  "valor_diarias": 0
}
```

### Pessoas

`GET /api/pessoas`

`GET /api/pessoas/{id}`

`POST /api/pessoas`

`PUT /api/pessoas/{id}`

`DELETE /api/pessoas/{id}`

#### Exemplo:

```json
{
    "id": 87101,
    "cpf": "***.980.641-**",
    "nome": "VILIDIANA MORAES MOURA",
    "cargo": "ENGENHEIRO",
    "funcao": "FCT-03",
    "descricao_funcao": "Função Comissionada Técnica"
  }
```

### Órgãos
`GET /api/orgaos`

`GET /api/orgaos/{id}`

`POST /api/orgaos`

`PUT /api/orgaos/{id}`

`DELETE /api/orgaos/{id}`

#### Exemplo:

```json
{
  "id": 54,
  "codigo": 63000,
  "nome": "Advocacia-Geral da União"
}
```
