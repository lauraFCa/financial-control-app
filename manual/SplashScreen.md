# SplashScreen

Este componente React-Native, denominado `SplashScreen`, representa a tela inicial do aplicativo exibida durante a inicialização.  
A função principal é realizar operações assíncronas, como a obtenção de dados do banco de dados Firebase, enquanto exibe o logotipo do aplicativo.  
Após a conclusão das operações, redireciona para a tela principal (`Home`).

## Funcionalidades Principais

1. **Obtenção de Dados do Banco de Dados:**
   - Utiliza o contexto `useLoading` para obter a string de autenticação e criar uma instância de `Storage` para interagir com o Firebase.
   - Utiliza a função `getFullDoc` de `Storage` para obter dados completos do usuário no Firebase.
   - Armazena os dados obtidos localmente utilizando o `AsyncStorage` para posterior referência no aplicativo.

2. **Temporização de Exibição:**
   - Utiliza `setTimeout` para simular uma breve pausa (5.5 segundos) antes de prosseguir para a próxima tela. Isso é comum em telas de introdução ou splash para exibir o logotipo por um curto período.

3. **Navegação para a Próxima Tela:**
   - Utiliza `useNavigation` para obter o objeto de navegação.
   - Após a conclusão das operações, navega para a tela principal (`Home`).

4. **Componente de Logotipo:**
   - Inclui o componente `LogoImage` para exibir o logotipo do aplicativo, centralizado na tela.

5. **Armazenamento Local de Dados:**
   - Utiliza o `AsyncStorage` para armazenar dados obtidos do banco de dados de forma local, permitindo o acesso rápido e offline.

6. **Tratamento de Erros:**
   - Registra e trata erros que possam ocorrer durante a obtenção de dados do banco de dados Firebase.

7. **Estilo e Layout:**
   - Utiliza estilos simples para centralizar o logotipo na tela durante a exibição da SplashScreen.

## Componentes Utilizados

- `React`, `useEffect` para gerenciar o ciclo de vida.
- `View` do React-Native para estrutura de layout.
- `useNavigation` do `@react-navigation/native` para navegação.
- `useLoading` e `Storage` para interação com Firebase.
- `AsyncStorage` para armazenamento local de dados.
- Componente `LogoImage` para exibição do logotipo.

## Observações

- Este componente é crucial para proporcionar uma experiência inicial ao usuário, exibindo o logotipo e realizando operações iniciais necessárias antes de redirecionar para a tela principal.

![SplashScreen](asset/splash.png)
