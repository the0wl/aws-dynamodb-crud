<p align="center"><img src="/assets/dynamodb.jpg" alt="dynamodb logo" style=""/></p>

# CRUD DynamoDB utilizando Node.js

## Introdução

Amazon DynamoDB é um serviço de base de dados NoSQL totalmente gerido e oferecido pela Amazon Web Services (AWS). Ele requer uma certa quantia de configuração e manutenção por parte de um programador, mas oferece em contrapartida, um grande desempenho e escalabilidade.   

Na estrutura de tabelas DynamoDB não existe um único servidor a alojar a sua tabela DynamoDB. Em vez disso, os dados são distribuídos por muitas máquinas - isto garante escalabilidade e alto desempenho. Ele suporta transações, backups automatizados, e replicação entre regiões.   

Sendo um armazenamento de valores-chave, o DynamoDB é especialmente fácil de se usar nos casos em que um único item numa única tabela DynamoDB contém todos os dados de que necessita para uma ação discreta na sua aplicação. Por exemplo, se o painel da sua aplicação mostrar um utilizador e os livros que leu, o DynamoDB terá o melhor desempenho e o menor custo por pedido se esses livros residirem no objecto do utilizador. Mas armazenar os utilizadores numa tabela e os livros em outra, onde carregar a página requer obter um utilizador e dez registos de livros diferentes, pode fazer com que o DynamoDB não se ajuste de maneira eficaz. Neste caso, as consultas extras custam-lhe mais e tornam mais lenta a sua experiência global de aplicação em comparação com uma datastore relacional.   

No modelo de negócio do AirBnb, por exemplo, foi optado por implementar o DynamoDB na estrutura de  armazenamento do histórico de pesquisas do usuário. Deste modo, se encaixa com a proposta do banco NoSQL, trazendo uma escrita única na maioria dos casos e somente fazendo a consulta dos dados na maior parte do tempo.

## Estudo

Para a definição do modelo, com base na estrutura aceita pelo DynamoDB, foi criado um protótipo de estrutura, simulando o armazenamento de avaliações em relação às propriedades e também em relação aos usuários locatários.

<p align="center"><img src="/assets/table_example.png" alt="table example" style=""/></p>

## Endpoints

Todos os endpoints esperam receber um body no formato `json`.

<span style="color: green"><b>GET</b></span> `/modelo_airbnb/`
* <b>STRING</b> <i>primaryKey</i> - Atributo primário da tabela.
* <b>STRING</b> <i>sortKey</i> - Atributo de ordenação da tabela.
* <b>STRING</b> <i>condition</i> -  Condição aplicada na chave primária e de ordenação.
* <b>OBJECT</b> <i>atributes</i> - Outros atributos do item (Opcional).
* <b>STRING</b> <i>filter</i> - Filtro aplicado nos demais atributos da tabela (Opcional).

---

Retorna um valor do tipo <b>OBJECT</b> 

<span style="color: green"><b>POST</b></span> `/modelo_airbnb/`
* <b>STRING</b> <i>primaryKey</i> - Atributo primário da tabela.
* <b>STRING</b> <i>sortKey</i> - Atributo de ordenação da tabela.
* <b>OBJECT</b> <i>atributes</i> - Outros atributos do item (Opcional).

Retorna um valor do tipo <b>OBJECT</b> 

---

<span style="color: green"><b>PUT</b></span> `/modelo_airbnb/`
* <b>STRING</b> <i>primaryKey</i> Atributo primário da tabela.
* <b>STRING</b> <i>sortKey</i> Atributo de ordenação da tabela.
* <b>OBJECT</b> <i>expressionNames</i> Nomes dos atributos manipulados.
* <b>OBJECT</b> <i>expressionValues</i> Valores dos atributos manipulados.
* <b>STRING</b> <i>updateExpression</i> Quais atributos serão manipulados.
* <b>STRING</b> <i>condition</i> Demais regras que devem ser consideradas (Opcional).

Retorna um valor do tipo <b>OBJECT</b> 

---

<span style="color: green"><b>DELETE</b></span> `/modelo_airbnb/`
* <b>STRING</b> <i>primaryKey</i> Atributo primário da tabela.
* <b>STRING</b> <i>sortKey</i> Atributo de ordenação da tabela.

Retorna um valor do tipo <b>OBJECT</b> 

---

## Testes

As rotas da API criada podem ser testadas através do aplicativo Insomnia. Na pasta `tests` está disponível um arquivo chamado `Insomnia.json`, basta importá-lo.
