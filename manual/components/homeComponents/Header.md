# Header

## Funcionalidades Principais

O componente `Header` é responsável por exibir o cabeçalho da aplicação, incluindo informações do usuário e botão de perfil.

### Principais Funcionalidades:

1. **Slide In Down Animation:**
   - Utiliza a animação `Slide In Down` do pacote `react-native-animatable` para uma entrada suave quando o componente é montado.

2. **Exibição do Nome do Usuário:**
   - Apresenta o nome do usuário obtido do objeto `userData`.

3. **Botão de Perfil:**
   - Oferece um botão para acessar a tela de perfil do usuário ao ser pressionado.

## Componentes Utilizados

O `Header` utiliza os seguintes componentes principais:

1. **Animatable.View:**
   - Utiliza o componente `Animatable.View` para aplicar animações de entrada.

2. **Feather:**
   - Ícone do pacote `@expo/vector-icons` utilizado para representar o botão de perfil.

## Pré-requisitos

Para integrar o `Header` corretamente, certifique-se de que as dependências, como `react-native-animatable` e `@expo/vector-icons`, estejam instaladas e configuradas em seu projeto.

## Observações

1. **Estilo Coeso:**
   - O componente segue um estilo coeso com o tema visual da aplicação, utilizando cores e tamanhos de fonte consistentes.

2. **Animação de Entrada:**
   - A animação de entrada proporciona uma transição suave, melhorando a experiência do usuário.

3. **Botão de Perfil Intuitivo:**
   - O botão de perfil é intuitivo, permitindo que o usuário acesse facilmente a tela de perfil ao pressioná-lo.

4. **Design Responsivo:**
   - O design é responsivo e ajustável a diferentes tamanhos de tela, garantindo uma aparência consistente em dispositivos variados.

5. **Personalização de Estilo:**
   - O componente fornece uma estrutura flexível para personalização adicional de estilo, se necessário.