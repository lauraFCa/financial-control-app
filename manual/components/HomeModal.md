# HomeModal

## Funcionalidades Principais

O `HomeModal` é um componente utilizado para adicionar transações de receitas ou despesas de forma interativa. As funcionalidades principais incluem:

### Principais Funcionalidades:

1. **Entrada de Dados:**
   - Permite ao usuário inserir dados, como descrição, valor e data para a transação.

2. **Seleção de Data:**
   - Oferece um seletor de data para escolher a data da transação.

3. **Visualização de Ação:**
   - Exibe a ação que está sendo realizada (adicionar receita ou despesa) e a categoria correspondente.

4. **Botões de Ação:**
   - Botões de navegação permitem voltar à tela anterior ou salvar a transação.

## Componentes Utilizados

O `HomeModal` utiliza vários componentes do React Native para criar uma interface interativa e amigável. Alguns dos componentes-chave incluem:

1. **Modal:**
   - Utiliza o componente `Modal` do `react-native-modal` para exibir uma janela modal.

2. **DateTimePicker:**
   - Incorpora o `DateTimePicker` para selecionar a data da transação.

3. **Ionicons:**
   - Ícones fornecidos pelo conjunto Ionicons para representar visualmente os botões de ação.

4. **TextInput:**
   - Componente `TextInput` para a entrada de dados como descrição e valor.

## Pré-requisitos

Para utilizar o `HomeModal`, é necessário garantir que os estilos e temas de cores estejam configurados de acordo com a aparência geral da aplicação. Certifique-se de que as dependências externas, como `@react-native-community/datetimepicker` e `react-native-modal`, estejam instaladas corretamente.

## Observações

1. **Estilo Consistente:**
   - O componente segue o estilo visual da aplicação, garantindo uma experiência consistente para o usuário.

2. **Entrada de Dados Validada:**
   - O valor digitado para a quantia é validado para garantir que apenas números válidos sejam aceitos.

3. **Seleção de Data Intuitiva:**
   - A interface de seleção de data é intuitiva e oferece uma experiência fácil para o usuário.

4. **Botões de Ação Claros:**
   - Os botões de navegação são claramente representados por ícones reconhecíveis, facilitando a compreensão do usuário sobre as ações disponíveis.

5. **Layout Responsivo:**
   - O layout é responsivo para diferentes tamanhos de tela, proporcionando uma experiência consistente em dispositivos variados.
  

![Input screen](asset/entrada.png)
