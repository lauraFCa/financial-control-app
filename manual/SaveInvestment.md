# SaveInvestment

## Funcionalidades Principais

A tela de Cadastro de Ações de Interesse permite ao usuário adicionar uma nova ação à sua lista de investimentos. As principais funcionalidades incluem:

### Principais Funcionalidades:

1. **Cadastro de Nova Ação:**
   - Permite ao usuário cadastrar uma nova ação de interesse.
   - Requer a inserção da descrição da ação, seu valor atual e o status (crescimento ou queda).

2. **Escolha de Status:**
   - Oferece opções para o usuário selecionar o status da ação, indicando se está em crescimento ou queda.

3. **Envio do Cadastro:**
   - Após preencher os campos necessários, o usuário pode enviar o cadastro para ser salvo.

4. **Navegação Rápida:**
   - Inclui um botão para retornar à página de Investimentos.

## Componentes Utilizados

A tela utiliza diversos componentes do React Native para criar uma interface intuitiva. Alguns dos principais componentes incluem:

1. **TextInput:**
   - Componente para a entrada de texto, utilizado para inserir a descrição e o valor da ação.

2. **TouchableOpacity:**
   - Componente que possibilita a criação de botões clicáveis.

3. **Button:**
   - Botão nativo do React Native utilizado para acionar a submissão do cadastro.

4. **AntDesign e Ionicons:**
   - Ícones utilizados para representar as opções de crescimento e queda da ação, bem como para a navegação de retorno.

## Pré-requisitos

Para utilizar a tela de Cadastro de Ações de Interesse, é necessário garantir que o aplicativo tenha acesso à API do Firebase Firestore para recuperar e armazenar dados do usuário. Além disso, o AsyncStorage deve estar configurado para armazenar informações localmente.

## Observações

1. **Escolha do Status:**
   - A tela permite ao usuário escolher entre "Crescimento" e "Queda" como status da ação.

2. **Interação com o Usuário:**
   - Oferece uma interface simples e interativa para facilitar o cadastro de novas ações.

3. **Atualização Automática:**
   - A tela atualiza automaticamente a lista de investimentos após o cadastro de uma nova ação.

4. **Estilo Visual:**
   - Utiliza estilos visuais para proporcionar uma experiência agradável ao usuário.

5. **Botão de Retorno:**
   - Inclui um botão para retornar à página de Investimentos após o cadastro ser concluído.


![Save Investments screen](asset/save-invest.png)
