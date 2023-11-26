# Home

Este componente React-Native, chamado de `Home`, é uma representação da tela principal de um aplicativo financeiro.  
Inclui funcionalidades como exibição do saldo, últimas movimentações, opções de menu horizontal, e interações animadas.

## Funcionalidades Principais

1. **Atualização de Dados:**
   - O componente possui um estado `isRefresh` que controla a atualização dos dados ao ser acionado. A função `refresh` é responsável por obter os dados do usuário autenticado e atualizar o estado.

2. **Animação de Saldo:**
   - O componente utiliza a biblioteca `Animated` do React-Native para criar uma animação de fade in/fade out no bloco de informações de saldo. A animação é acionada pelo toque do usuário.

3. **Obtenção de Dados do Usuário:**
   - Utiliza o contexto `useLoading` para exibir e ocultar indicadores de carregamento.
   - Utiliza a AsyncStorage para armazenar e recuperar os dados do usuário, como nome, receitas, despesas, etc.

4. **Ordenação de Movimentações:**
   - As últimas movimentações do usuário são ordenadas por data antes de serem exibidas, utilizando a função `parseDate`.

5. **Integração com Firebase:**
   - Utiliza o módulo `Storage` para interagir com o Firebase e obter dados do usuário.

6. **Componentes Filhos:**
   - O componente inclui outros componentes como `HorizontalMenu` para exibir um menu horizontal com opções específicas e `Movements` para mostrar as últimas movimentações financeiras.

7. **Interação com Navegação:**
   - Navegação entre telas é possível através da navegação passada como propriedade (`{ navigation }`).

8. **Estilo e Layout:**
   - O componente utiliza um layout flexível, animações visuais e estilos específicos para cada parte da tela, proporcionando uma experiência visual agradável.

## Componentes Utilizados

- `React`, `useState`, `useEffect`, `useRef` para gerenciar o estado e ciclo de vida.
- `AsyncStorage` para armazenamento local de dados.
- `Animatable` para animações.
- `Feather` para ícones.
- Componentes customizados como `HorizontalMenu` e `Movements`.

**Pré-requisitos:**
- Necessita de um contexto de carregamento (`useLoading`) para gerenciar o estado de carregamento.

## Observações

- Este componente pode ser integrado a um aplicativo financeiro para oferecer funcionalidades essenciais de visualização de saldo, últimas movimentações e navegação entre diferentes seções.

![Home screen](asset/home.png)