
# SOS GR

## Objetivo da Aplicação

Nossa aplicação foi desenvolvida com o objetivo de fornecer uma plataforma para solicitações de ajuda comunitária em situações de emergência. O usuário pode criar, editar e excluir solicitações de ajuda, bem como visualizar as solicitações existentes. A plataforma foi integrada com uma API desenvolvida em .NET para gerenciar dados, e o Firebase foi utilizado para a autenticação dos usuários.

## Funcionalidades

- **Cadastro de Usuário**: Permite que os usuários se registrem com e-mail e senha utilizando o Firebase Authentication.
- **Login**: Realiza o login dos usuários com a validação através do Firebase.
- **CRUD de Solicitações de Ajuda**: Permite que os usuários criem, atualizem, visualizem e excluam solicitações de ajuda comunitária.
- **Integração com API em .NET**: A comunicação com a API em .NET permite realizar as operações de CRUD com o banco de dados.

## Tecnologias Utilizadas

- **React Native**: Para o desenvolvimento do aplicativo móvel.
- **Expo**: Para facilitar o desenvolvimento e o build do app.
- **Firebase**: Para a autenticação de usuários.
- **API em .NET**: Para gerenciar as solicitações e usuários.
- **Axios**: Para fazer requisições HTTP entre o app e a API.

## O que é necessário para rodar

1. **Clone o repositório**:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**:
   ```bash
   npx expo start
   ```

4. **Rode o app** no seu emulador ou dispositivo físico:
   - Para Android: Use `npx expo start --android`.
   - Para iOS: Use `npx expo start --ios`.

## Integrantes

- **RM553764**: Rebeca Silva Lopes
- **RM553369**: Giovanna Lima Giantomaso

## Video Demonstrativo

[Link para o vídeo demonstrativo](<https://youtu.be/tnKuvCu-Vs0?si=SOA57IPGB1Z_viF8
>)
