# HorizontalMenu

Este componente React-Native, denominado `HorizontalMenu`, oferece uma barra horizontal de ações para realizar operações específicas.  
Exibe ícones representativos para cada ação, permitindo ao usuário navegar para diferentes seções do aplicativo.  
Além disso, o componente inclui a capacidade de adicionar dados relacionados a finanças, como despesas e receitas, por meio de um modal interativo.

## Funcionalidades Principais

1. **Barra de Ações Horizontais:**
   - Exibe uma barra de ações horizontais com ícones representativos.
   - Cada ação possui um rótulo associado, indicando sua finalidade.
   - Toque em uma ação para executar a operação correspondente.

2. **Modal de Adição de Dados Financeiros:**
   - Permite adicionar dados financeiros (despesas ou receitas) por meio de um modal.
   - O modal exibe campos para descrição, valor e data da transação.
   - Utiliza o componente `DateTimePicker` para selecionar a data da transação.
   - A função `saveData` é acionada para salvar os dados no Firebase e atualizar a interface.

3. **Interação com o Firebase:**
   - Utiliza o contexto `useLoading` para obter a string de autenticação e criar uma instância de `Storage` para interagir com o Firebase.
   - As funções `appendToIncomes` e `appendToExpenses` são chamadas para adicionar dados financeiros ao Firebase.

4. **Navegação para Outras Telas:**
   - Navega para diferentes telas do aplicativo com base na ação selecionada.
   - Navega para 'Settings', 'Graphs' e 'Money' dependendo do tipo de ação.

5. **Estilo e Layout Responsivos:**
   - Utiliza estilos específicos para proporcionar uma experiência visual agradável e responsiva.
   - Adota ícones específicos (`AntDesign` e `Fontisto`) para representar visualmente cada ação.

## Componentes Utilizados

- `TouchableOpacity`, `View`, `Text`, e `TextInput` do React-Native para interação e estrutura de layout.
- `DateTimePicker` do `@react-native-community/datetimepicker` para seleção de data.
- `Modal` do pacote `react-native-modal` para a criação de um modal.
- Ícones `AntDesign`, `Ionicons`, e `Fontisto` do `@expo/vector-icons` para representação visual.

## Observações

- Este componente é destinado a fornecer uma barra de navegação rápida e acessível para ações comuns no aplicativo.
- A inclusão de funcionalidades financeiras permite ao usuário adicionar transações diretamente da barra de ações, facilitando o registro de despesas e receitas.

![Menu](asset/menu.png)

![Input screen](asset/entrada.png)
