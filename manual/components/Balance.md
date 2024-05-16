# Balance

## Funcionalidades Principais

O componente `Balance` é responsável por exibir informações de saldo e gastos, permitindo ao usuário ocultar ou exibir esses valores clicando no componente.

### Principais Funcionalidades:

1. **Toggle Balance:**
   - Permite alternar entre a exibição e ocultação dos valores de saldo e gastos ao ser clicado.

2. **Tooltips Informativos:**
   - Utiliza tooltips para fornecer informações contextuais sobre o propósito do componente e instruções de interação.

## Componentes Utilizados

O `Balance` utiliza os seguintes componentes principais:

1. **TooltipComp:**
   - Utiliza o componente `TooltipComp` para exibir dicas informativas sobre o componente.

2. **Animated:**
   - Utiliza a biblioteca `Animated` do React Native para aplicar animações suaves na exibição e ocultação dos valores.

## Pré-requisitos

Certifique-se de que o componente `TooltipComp` esteja devidamente configurado no seu projeto, e que as dependências, como `react-native-reanimated` e `react-native-gesture-handler`, estejam instaladas.

## Observações

1. **Interatividade Intuitiva:**
   - A funcionalidade de alternar entre a exibição e ocultação dos valores é intuitiva para o usuário.

2. **Tooltips Informativos:**
   - Os tooltips fornecem informações úteis e orientações sobre as funcionalidades do componente.

3. **Design Responsivo:**
   - O design do componente é responsivo, ajustando-se a diferentes tamanhos de tela.

4. **Personalização de Estilo:**
   - O componente oferece flexibilidade para personalização adicional de estilo, como cores e tamanhos de fonte.

5. **Animação Suave:**
   - A animação de fade-in e fade-out proporciona uma transição suave, melhorando a experiência do usuário.

6. **Multi-Tooltips:**
   - O componente utiliza tooltips em duas instâncias para fornecer informações sequenciais e contextuais ao usuário.

7. **Liberdade de Interação:**
   - O usuário tem a liberdade de explorar as funcionalidades do componente de acordo com as instruções fornecidas pelos tooltips.