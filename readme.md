# App para controle financeiro

<!--  [![Publish Docs to Github Pages](https://github.com/lauraFCa/finalproj-devmovel/actions/workflows/docs.yml/badge.svg)](https://github.com/lauraFCa/finalproj-devmovel/actions/workflows/docs.yml)

<a target="_blank" href="https://laurafca.github.io/finalproj-devmovel/">Documentação</a> -->


**Telas:**

- Login / Cadastro
- Home
- Perfil
- Configurações
- Gráficos
- Cotações (moedas)
- Lista de Investimentos
- Alteração dos investimentos

## Home

- Dados do usuário (nome e foto)  
  - Obtidos do banco
  - Animações de entrada
  - Foto do usuário

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

- Acessar perfil 
- Cadastrar:
  - Nova receita (entrada)
  - Nova compra
  - Novo gasto

- Ir para Perfil
- Ir para Configurações
- Ir para Gráficos
- Ir para Cotaçõess

## Perfil 

- Dados do usuário
- Ver foto de usuário
- Alterar foto de usuário
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

## Cotações

Gráficos de Barras com a comparação de valores das moedas: Peso argentino, Dolar USA e Euro, em relação ao Real (BR)

Realiza uma requisição de API para obter essas cotações.

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
- Expo-camera
- React-Native Progress
- React-Native Toast Message

**Gerar documentação:**  
``` ./node_modules/.bin/esdoc ```

**Gerar APK**
s
``` npm install -g eas-cli ```  
(instalar eas-cli globalmente, caso não esteja)

``` eas build -p android ```  
OBS: Expo account is required
