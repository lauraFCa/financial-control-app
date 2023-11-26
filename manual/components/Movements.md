# Movements

O componente React-Native denominado `Movements` é responsável por exibir informações sobre transações financeiras, como descrição, data e valor.  
Este componente é projetado para ser utilizado em uma lista de movimentos financeiros, proporcionando uma representação visual clara e interativa.

## Principais Características

1. **Toque Interativo:**
   - O componente é envolto por um `TouchableOpacity`, permitindo interação com o usuário ao ser pressionado.

2. **Exibição Condicional de Valor:**
   - O valor da transação é inicialmente oculto e é exibido quando o componente é pressionado (`showValue` é alternado).

3. **Formatação de Data:**
   - Utiliza a função `formatarData` para formatar a data da transação. Caso não haja data disponível, exibe "sem data".

4. **Estilo Responsivo:**
   - Utiliza estilos flexíveis para se adaptar a diferentes tamanhos de tela.

5. **Estilos Personalizáveis:**
   - Define estilos específicos para a data, rótulo, valor (receita) e despesas. Os estilos são configurados para melhor legibilidade e apelo visual.

6. **Indicação Visual de Despesas:**
   - O valor é exibido em vermelho (`#e74c3c`) quando se trata de uma despesa, proporcionando uma indicação visual clara do tipo de transação.

## Parâmetros

- `props`: Objeto contendo as propriedades da transação, incluindo `date` (data), `description` (descrição), `value` (valor) e `type` (tipo de transação - 1 para receita, 0 para despesa).

## Observações

- Este componente é flexível e pode ser incorporado em listas ou páginas de movimentações financeiras.
- A formatação do valor considera o tipo de transação para exibição apropriada (receita ou despesa).

![Movements component](asset/mov.png)