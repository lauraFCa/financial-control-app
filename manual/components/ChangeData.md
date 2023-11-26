# ChangeData

Este componente React-Native, denominado `ChangeData`, oferece a funcionalidade de modificar dados específicos do usuário, como nome, email, profissão ou perfil de investimento.  
Inclui um modal interativo para a entrada de novos dados e interage com o Firebase para atualizar as informações.

## Funcionalidades Principais

1. **Modal de Alteração de Dados:**
   - Utiliza o pacote `react-native-modal` para criar um modal de alteração de dados.
   - Exibe um modal com entrada de texto para modificar o valor associado ao rótulo fornecido (`label`).
   - O modal possui botões de confirmação e cancelamento para realizar ou descartar as alterações.

2. **Interação com o Firebase:**
   - Utiliza o contexto `useLoading` para obter a string de autenticação e criar uma instância de `Storage` para interagir com o Firebase.
   - Na montagem do componente, carrega os dados do usuário do Firebase utilizando `getFullDoc` e armazena em `userData`.

3. **Atualização de Dados:**
   - Ao confirmar as alterações no modal, utiliza a função `updateData` para atualizar os dados no Firebase.
   - A função decide qual campo de dados deve ser atualizado com base no rótulo fornecido (`label`).

4. **Estilo e Layout Responsivos:**
   - Utiliza estilos específicos para proporcionar uma experiência visual agradável e responsiva.
   - Apresenta um estilo de borda que separa visualmente instâncias consecutivas do componente.

## Componentes Utilizados

- `TouchableOpacity` e `View` do React-Native para interação e estrutura de layout.
- `Modal` do pacote `react-native-modal` para a criação de um modal.
- `Ionicons` do `@expo/vector-icons` para ícones.
- `Storage` para interação com o Firebase.
- Componentes `Text` e `TextInput` para exibição e entrada de texto.

## Observações

- Este componente é destinado a ser utilizado em configurações ou telas de perfil, permitindo ao usuário editar informações pessoais de maneira simples.

![ChangeData Screen](asset/changeData.png)
