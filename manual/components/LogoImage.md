# LogoImage

O componente React-Native chamado `LogoImage` é responsável por exibir uma animação com a logomarca da aplicação.  
A animação inclui um efeito de fade-in (opacidade aumentando de 0 para 1) e uma rotação contínua de 360 graus.

## Principais Características

1. **Fade-in:**
   - Utiliza a propriedade `opacity` da animação para criar um efeito de fade-in.
   - O componente começa com uma opacidade de 0 e aumenta para 1 ao longo de 5000 milissegundos.

2. **Rotação Contínua:**
   - Utiliza a propriedade `rotate` da animação para criar uma rotação contínua.
   - A rotação varia de 0 a 360 graus ao longo de 2000 milissegundos.

3. **Promise Delays:**
   - Usa `await new Promise(resolve => setTimeout(resolve, tempo))` para introduzir atrasos entre diferentes etapas da animação.

4. **Estilo Dinâmico:**
   - Aplica estilos dinâmicos para a imagem, incluindo a opacidade e a transformação de rotação.

## Parâmetros
- Não aceita parâmetros externos.

**Configurações de Animação:**
- Configurações específicas para cada animação, como duração e interpolação, são ajustadas para alcançar o efeito desejado.

**Estilos Padrão:**
- Usa estilos padrão para centralizar e alinhar a imagem no centro da tela.

## Observações

- O componente faz uso das bibliotecas `react` e `react-native` para criar a animação.
- É um componente reutilizável que pode ser incluído em uma tela de carregamento ou em outras partes da interface do usuário para uma experiência visual mais dinâmica.

## Exemplo de Uso

```jsx
<LogoImage />
```

**Imagem:**
- A imagem da logomarca é referenciada pelo caminho `./../static/imgs/logo.png`. 

![Logo component](asset/logo.png)
