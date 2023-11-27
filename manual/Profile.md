# Página Perfil

## Funcionalidades Principais

A página Perfil apresenta informações detalhadas sobre o usuário, incluindo dados pessoais, preferências de investimento e ações de interesse. Possui funcionalidades para modificar a foto do usuário, visualizar e alterar informações pessoais e de investimentos.

### Principais Funcionalidades:

1. **Visualização de Dados Pessoais:**
   - Exibe o nome, e-mail, profissão e perfil de investimento do usuário.
   - Permite a modificação da foto do perfil (ainda não implementada).

2. **Ações de Interesse:**
   - Mostra as ações marcadas como interesse pelo usuário.
   - Possibilita a alteração dessas ações.

3. **Alteração de Ações de Interesse:**
   - Permite ao usuário modificar suas escolhas de ações de interesse.
   - Ao clicar em "Alterar", redireciona para a página de seleção de ações.

4. **Navegação Rápida:**
   - Inclui um botão para retornar à página inicial (Home) do aplicativo.

## Componentes Utilizados

A página Perfil utiliza componentes do React Native para criar uma interface amigável e interativa. Alguns dos principais componentes incluem:

1. **Feather e MaterialIcons:**
   - Ícones utilizados para representar ações e navegação.
  
2. **TouchableOpacity:**
   - Componente que possibilita a criação de botões clicáveis.

3. **ScrollView:**
   - Utilizado para criar uma área rolável para a lista de ações de interesse.

## Observações

1. **Modificação de Foto do Perfil:**
   - A funcionalidade para modificar a foto do perfil ainda não foi implementada.

2. **Atualização Automática:**
   - A página realiza atualizações automáticas conforme necessário para garantir dados precisos.

3. **Interatividade:**
   - Oferece uma experiência interativa ao clicar em botões e modificar a lista de ações de interesse.

4. **Estilo Visual:**
   - Utiliza estilos visuais para proporcionar uma aparência atraente e coesa ao usuário.

5. **Código Organizado:**
   - O código fonte está organizado de forma a facilitar a manutenção e extensão do aplicativo.

## Exemplo de Uso

```jsx
<Perfil navigation={navigation} />
```

**Referências de Ícones:**
- `Feather`: Ícone de usuário para a alteração de foto de perfil.
- `MaterialIcons`: Ícone de casa para o botão de navegação de volta à página inicial.
- `AntDesign`: Ícone de adição para adicionar novos investimentos.


![Profile Screen](asset/perfil.png)
