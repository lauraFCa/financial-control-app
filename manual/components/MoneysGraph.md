# MoneysGraph

O componente React-Native denominado `MoneysGraph` é responsável por exibir gráficos de barras relacionados a transações financeiras.  
Utiliza a biblioteca `react-native-chart-kit` para criar gráficos de barras interativos e visualmente atrativos.  
Este componente é ideal para representar dados financeiros de maneira clara e compreensível.

## Principais Características

1. **Gráfico de Barras:**
   - Utiliza o componente `BarChart` da biblioteca `react-native-chart-kit`.
   - Representa graficamente os dados financeiros em um gráfico de barras.
   - A largura e altura do gráfico são configuráveis para se adaptarem a diferentes tamanhos de tela.

2. **Configuração do Gráfico:**
   - `chartConfig` define a configuração do gráfico, como as cores, opacidade e largura da linha.
   - A cor das barras é definida dinamicamente com base na opacidade e em uma escala de verde.

3. **Texto Descritivo:**
   - Exibe um texto descritivo acima do gráfico, indicando o nome da categoria ou período representado no gráfico.
   - O texto é centralizado e estilizado para melhor legibilidade.

4. **Personalização de Estilos:**
   - Utiliza estilos específicos para aprimorar a apresentação visual.
   - Define margens, bordas e espaçamentos para melhor organização e apelo visual.

## Parâmetros

- `bardata`: Dados do gráfico de barras. Deve ser um array contendo objetos com propriedades `data` (valores das barras) e `color` (cor das barras).
- `name`: Nome da categoria ou período representado no gráfico.

## Observações

- Este componente é projetado para ser reutilizado em diferentes partes do aplicativo onde gráficos de barras relacionados a finanças sejam necessários.
- A biblioteca `react-native-chart-kit` oferece opções adicionais de personalização que podem ser exploradas conforme necessário para atender aos requisitos específicos de design.

![MoneyGraph Screen](asset/moneyGraph.png)
