# Menu

## Descrição

O componente `Menu` exibe um menu horizontal com várias opções de ações que o usuário pode realizar, como adicionar entradas, realizar compras, registrar gastos, acessar configurações, visualizar gráficos e gerenciar moedas. Este componente é projetado para ser utilizado como parte de um aplicativo de controle financeiro.

## Funcionalidades Principais

### 1. Menu Horizontal
- Apresenta um menu horizontal que pode ser navegado arrastando para o lado.

### 2. Opções de Menu
- Inclui várias opções de menu, cada uma representada por um ícone, rótulo e tipo de ação.

### 3. Toque Responsivo
- Cada opção de menu é interativa e responde a toques do usuário.

### 4. Dicas de Ferramentas (Tooltips)
- Integra dicas de ferramentas para fornecer informações contextuais e orientações ao usuário.

### 5. Arraste para Visualizar Mais
- Incentiva o usuário a arrastar o menu horizontalmente para visualizar todas as opções disponíveis.

## Componentes Utilizados

1. **TooltipComp:**
   - Utiliza o componente `TooltipComp` para fornecer dicas de ferramentas informativas.

2. **ScrollView:**
   - Utiliza `ScrollView` do React Native para criar a interface de menu horizontal.

3. **HorizontalMenuOption:**
   - Utiliza o componente `HorizontalMenuOption` para renderizar cada opção no menu.

## Estrutura de Dados

O array `menuOptions` define as opções disponíveis no menu. Cada objeto no array representa uma opção com as seguintes propriedades:

- **actionType:** Tipo de ação a ser realizada (adicionando, configurando, etc.).
- **label:** Rótulo da opção.
- **icon:** Nome do ícone associado à opção.
- **type:** Tipo de ação (entrada, saída, configurações, gráficos, moeda, etc.).

## Uso

O componente `Menu` deve ser integrado em uma tela maior, geralmente como parte de uma estrutura de navegação ou em um contexto mais amplo de um aplicativo financeiro.

```jsx
<Menu
  isRefresh={/* Estado indicando se é necessário atualizar */}
  refresh={/* Função para acionar uma atualização */}
  navigation={/* Objeto de navegação do React Navigation */}
  moneyGraph={/* Dados relacionados a gráficos de dinheiro */}
  showMenuTip={/* Estado indicando se a dica de ferramenta do menu deve ser exibida */}
  setTip={/* Função para configurar o estado da dica de ferramenta do menu */}
  showSettingsTip={/* Estado indicando se a dica de ferramenta de configurações deve ser exibida */}
  setShowSettingsTip={/* Função para configurar o estado da dica de ferramenta de configurações */}
/>
```

## Observações

1. **Responsividade:**
   - O design do menu é responsivo, adaptando-se a diferentes tamanhos de tela.

2. **Intuitividade:**
   - O usuário é incentivado a explorar as opções do menu através de dicas de ferramentas e interações responsivas.

3. **Configurações de Menu:**
   - O componente `HorizontalMenuOption` é utilizado para representar cada opção no menu, facilitando a extensão ou personalização futura.

![menu](asset/menu.png)

