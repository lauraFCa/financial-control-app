# MovementRegister

## Descrição

O componente `MovementRegister` é responsável por exibir registros de movimentação, como entradas, saídas ou gastos, em um formato de lista. Cada registro exibe detalhes como data, descrição e valor, sendo possível ocultar ou exibir o valor ao tocar no registro.

## Funcionalidades Principais

### 1. Exibição de Registros
- Apresenta os registros de movimentação em um formato de lista.

### 2. Ocultar/Exibir Valor
- Permite ao usuário ocultar ou exibir o valor associado a cada registro ao tocar no item.

### 3. Animação de Transição
- Utiliza uma animação de transição suave para mostrar ou esconder o valor do registro.

## Propriedades

- **props:** Objeto contendo as propriedades do registro, como data, descrição, valor e tipo.

## Estrutura do Componente

O componente `MovementRegister` consiste em um `TouchableOpacity` que envolve a exibição dos detalhes do registro. Ele possui a seguinte estrutura:

1. **Data:** Exibe a data do registro.
2. **Descrição:** Apresenta a descrição associada à movimentação.
3. **Valor:** O valor da movimentação, podendo ser ocultado/exibido ao tocar no registro.

## Uso

```jsx
<MovementRegister props={{ date: '01/01/2023', description: 'Compra de mantimentos', value: 50.0, type: 1 }} />
```

## Estilos

O componente possui estilos definidos para cada elemento, como data, descrição e valor, bem como estilos para animações de transição e esqueleto.

## Observações

1. **Cores:**
   - Utiliza cores diferentes para valores positivos (`#2ecc71`) e negativos (`#e74c3c`).

2. **Estilos de Transição:**
   - Aplica uma animação de transição suave para mostrar ou esconder o valor do registro.

3. **Sinalização Visual:**
   - Utiliza um esqueleto (skeleton) para indicar visualmente a presença do valor, mesmo quando está oculto.

4. **Responsividade:**
   - Projetado para se adaptar a diferentes tamanhos de tela e proporcionar uma experiência de usuário consistente.


![mov regis](asset/entrada.png)
