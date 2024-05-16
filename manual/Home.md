# Home

## Funcionalidades Principais

A página Home é responsável por exibir informações financeiras essenciais para o usuário, oferecendo uma visão geral de seu saldo, movimentações financeiras recentes e acesso rápido a funcionalidades adicionais.

### Principais Funcionalidades:

1. **Exibição de Saldo:**
   - Apresenta o saldo atual do usuário.
   - Oferece uma dica para explicar a seção de saldo.

2. **Movimentações Financeiras Recentes:**
   - Mostra as últimas transações financeiras do usuário.
   - Permite visualizar detalhes de receitas e despesas.

3. **Menu de Navegação:**
   - Facilita o acesso a diferentes seções do aplicativo.
   - Fornece uma dica para orientação sobre o menu.

4. **Atualização Automática:**
   - Atualiza automaticamente os dados quando necessário.

## Componentes Utilizados

A página Home utiliza vários componentes personalizados para organizar e exibir informações de forma clara e amigável. Os componentes principais incluem:

1. **Balance:**
   - Responsável por exibir o saldo do usuário.
   - Apresenta uma dica interativa.

2. **Header:**
   - Renderiza a seção de cabeçalho com detalhes do usuário.

3. **Menu:**
   - Exibe opções de navegação para diferentes seções do aplicativo.
   - Inclui uma dica para orientar o usuário.

4. **Movements:**
   - Renderiza as movimentações financeiras recentes.
   - Oferece detalhes sobre receitas e despesas.

## Pré-requisito

Para usar a página Home, é necessário garantir que o aplicativo tenha acesso à API do Firebase Firestore para recuperar dados do usuário. Além disso, o aplicativo deve ter o AsyncStorage configurado para armazenar informações localmente.

## Observações

1. A página Home utiliza o conceito de Hooks do React para gerenciar estados e efeitos colaterais.
2. A atualização automática dos dados é acionada quando necessário, garantindo informações precisas.
3. As dicas interativas são fornecidas para orientar os usuários nas seções de saldo e menu de navegação.
4. O código está organizado de forma modular, facilitando a manutenção e escalabilidade.


![Home screen](asset/home.png)