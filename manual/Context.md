# Context

## Descrição

O contexto de carregamento (`LoadingContext`) é utilizado para gerenciar o estado de carregamento na aplicação. Ele fornece funções que permitem mostrar ou ocultar um indicador de carregamento, bem como a capacidade de sinalizar se uma atualização ou refresh é necessário.

## Componentes

### `LoadingProvider`

O componente `LoadingProvider` é um provedor de contexto que envolve a aplicação. Ele fornece o estado de carregamento e funções relacionadas para os componentes filhos.

#### Propriedades

- **children:** Componentes filhos envolvidos pelo provedor.

#### Funções do Contexto

1. **`showLoading()`**
   - Exibe o indicador de carregamento.

2. **`hideLoading()`**
   - Oculta o indicador de carregamento.

3. **`getShouldRefresh(): boolean`**
   - Retorna o estado atual de sinalização para refresh.

4. **`setShouldRefresh(should: boolean)`**
   - Atualiza o estado de sinalização para refresh.

### `useLoading()`

O hook `useLoading` é utilizado pelos componentes filhos para acessar as funções e o estado do contexto de carregamento.

### `LoadingIndicator`

O componente `LoadingIndicator` é um indicador de carregamento exibido enquanto o estado de carregamento está ativo.

## Uso

```jsx
// Dentro do componente pai mais externo da aplicação
import { LoadingProvider } from './caminho/para/o/seu/arquivo';

function App() {
  return (
    <LoadingProvider>
      {/* Seus componentes aqui */}
    </LoadingProvider>
  );
}

// Em qualquer componente filho que precise acessar o contexto de carregamento
import { useLoading } from './caminho/para/o/seu/arquivo';

function SeuComponente() {
  const { showLoading, hideLoading, getShouldRefresh, setShouldRefresh } = useLoading();

  // Lógica do componente usando as funções e o estado do contexto
}
```

## Estilos

### `container`

O estilo `container` é aplicado ao componente `LoadingIndicator` para posicionar o indicador de carregamento no centro da tela, com um fundo semitransparente.

## Observações

1. **Indicador de Carregamento:**
   - O componente `LoadingIndicator` utiliza o componente `ActivityIndicator` do React Native para exibir um indicador de carregamento.

2. **Sinalização para Refresh:**
   - A função `setShouldRefresh` e `getShouldRefresh` permite que os componentes filhos sinalizem a necessidade de atualização ou refresh para o componente pai.