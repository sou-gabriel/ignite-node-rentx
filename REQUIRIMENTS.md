**RF** => Requisitos funcionais
Funcionalidades da aplicação:

Ex.: Usuário vai conseguir criar uma nova categoria.

**RNF** => Requisitos não funcionais
Requisitos que não estão ligados com a regra de negócio da aplicação.

Ex.: Os dados devem ser armazenados no banco de dados Postgresl.

**RN** => Regra de negócio
Regras por trás dos requisitos

Ex.: Não deve ser possível cadastrar uma categoria com um nome já existente ou com tamanho menor do que 4.

---

# Cadastro de carro

**RF**
- Deve ser possível cadastrar um novo carro.

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado, por padrão, com disponibilidade.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
- Deve ser possível listar todos os carros disponíveis.
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
- Deve ser possível lsitar todos os carros disponíveis pelo nome do carro.

**RN**
- O usuário não precisa estar logado no sistema.

# Cadastro de especificação do carro

**RF** 
- Deve ser possível cadastrar uma especificação para um carro.

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**RNF**
- Utilizar o multer para upload dos arquivos.

**RN**
- O usuário deve conseguir cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**RF**
- Deve ser possível cadastrar um aluguel.

**RNF**

**RN**
- O aluguel deve ter duração minínima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo alguel caso já exista um aberto para o mesmo carro.
- O usuário deve estar logado na aplicação
- Ao realizar um aluguel o status do carro deverá ser alterado para indisponível.

# Devolução do carro

**RF** 
Deve ser possível realizar a devolução de um carro.

**RN**
- Se o carro devolvido com menos de 24 horas, deverá ser cobradoa  taxa diária completa.
- Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- Ao realizar a devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
- O usuário deverá estar conectado na aplicação.

# Listagem de alugueis para usuário

**RF**
- Deve ser possível realizar a busca de todos os alugueis para o usuário.

**RN**
- O usuário deve estar logado na aplicação.

# Recuperar senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail.
- O usuário deve recuperar um e-mail com o passo a passo para a recuperação de senha.
- O usuário deve conseguir inserir uma nova senha.

**RN**
- O usuário precisa informar uma nova senha.
- O link para recuperação de senha deve expirar em 3 horas.