# HorizontalMenuOption

## Funcionalidades Principais

A `HorizontalMenuOption` representa uma opção no menu horizontal da aplicação, proporcionando funcionalidades específicas relacionadas às diferentes categorias. As funcionalidades incluem:

### Principais Funcionalidades:

1. **Acesso a Páginas Específicas:**
   - Redireciona o usuário para páginas específicas com base na categoria selecionada.
   - Pode direcionar para as páginas de Configurações, Gráficos ou Finanças, conforme a categoria.

2. **Exibição de Modal Interativo:**
   - Exibe um modal interativo para adicionar transações de receitas ou despesas.
   - Facilita a entrada de dados diretamente do menu.

3. **Adição de Receitas ou Despesas:**
   - Permite ao usuário adicionar novas receitas ou despesas diretamente do menu.

4. **Atualização Automática:**
   - Atualiza automaticamente os dados ao adicionar novas transações.

## Componentes Utilizados

A tela utiliza diversos componentes do React Native para proporcionar uma experiência amigável ao usuário. Alguns dos principais componentes incluem:

1. **TouchableOpacity:**
   - Componente que possibilita a criação de botões clicáveis.

2. **AntDesign e Fontisto:**
   - Ícones fornecidos pelos conjuntos AntDesign e Fontisto para representar visualmente as categorias.

3. **HomeModal Component:**
   - Um modal personalizado utilizado para a entrada de dados, como descrição, valor e data, ao adicionar novas transações.

## Pré-requisitos

Para utilizar a `HorizontalMenuOption`, é necessário garantir que a tela de configurações, gráficos e finanças esteja corretamente configurada. Além disso, o AsyncStorage deve ser configurado para armazenar informações localmente.

## Observações

1. **Simplicidade Visual:**
   - O componente foi projetado para oferecer uma interface visual simples e intuitiva.

2. **Interação Rápida:**
   - Facilita a adição rápida de transações diretamente do menu, sem a necessidade de navegar para outras páginas.

3. **Modal Interativo:**
   - Utiliza um modal interativo para proporcionar uma experiência de entrada de dados mais amigável.

4. **Atualização Automática:**
   - As alterações realizadas na adição de transações são automaticamente atualizadas na visualização principal.


![Menu](asset/menu.png)