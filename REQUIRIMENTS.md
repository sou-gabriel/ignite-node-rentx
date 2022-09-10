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