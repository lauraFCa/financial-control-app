# App para controle financeiro

[Documentação](https://laurafca.github.io/finalproj-devmovel/)

**Telas:**

- Login / Cadastro
- Home
- Perfil
- Configurações
- Gráficos
- Lista de Investimentos
- Alteração dos investimentos

## Home

- Dados do usuário (nome e foto)  
  - Obtidos do banco
  - Animações de entrada

- Saldo da conta  
  - Obtido do banco e calculado
  - Animação de entrada
  - Pode ser "escondido" com um toque

- Menu de ações
  - Novos cadastros e navegação
  - Scroll horizontal

- Transações passadas
  - Lista com as transações cadastradas pelo usuário
  - Valores "escondidos", aparecem com o toque na região cinza

### Ações possíveis

- Cadastrar:
  - Nova receita (entrada)
  - Nova compra
  - Novo gasto

- Ir para [Perfil](#Perfil)
- Ir para [Configurações](##Configurações)
- Ir para [Gráficos](##Gráficos)

## Perfil 

- Dados do usuário
- Lista de ações de interesse
- Permite marcar ou desmarcar ações existentes
- Permite adicionar uma nova ação de interesse

## Configurações

- Todos os dados do usuário (Nome, Email, Profissão, Perfil de Investimento)
- Permite alterar os dados

## Gráficos

- Gráficos relacionados ao financeiro da aplicação:
  - Gráfico de Pizza: Gastos X Receitas
  - Gráfico de Barras: Receitas
  - Gráfico de Linha: Gastos

## Projeto

Bibliotecas chave para o **funcionamento da aplicação**:

- Animation
- AsyncStorage
- Chart Kit
- Checkbox
- DatePicker
- Expo
- Firebase
- Flash Message
- Modal
- React Navigation
- Select-dropdown
- Styled Components

Gerar documentação:  
``` ./node_modules/.bin/esdoc ```
