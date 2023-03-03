# Todo List App

Este é um aplicativo simples de lista de tarefas construído em React. O aplicativo permite que o usuário adicione, edite e exclua tarefas.

## Como instalar o aplicativo

1. Certifique-se de ter o Node.js instalado em seu computador.
2. Clone este repositório em sua máquina local.
3. Abra o terminal na pasta do projeto e execute o seguinte comando para instalar as dependências:

    ```
    yarn
    ```

4. Para iniciar o aplicativo, execute o seguinte comando:

    ```
    yarn dev
    ```

5. O aplicativo deve ser aberto automaticamente em seu navegador. Se não abrir, acesse http://localhost:5173 em seu navegador.

## Como usar o aplicativo

1. Na página inicial, você verá uma lista de categorias com apenas a categoria geral "All" e uma lista de tarefas vazia.
2. Para adicionar uma categoria, digite o nome da categoria na caixa de texto "Add a new category" e pressione a tecla "Enter".
3. Para adicionar uma tarefa, digite o nome da tarefa na caixa de texto "Add a new task" e pressione a tecla "Enter".
4. Para adicionar uma tarefa a uma categoria, selecione a categoria desejada à esquerda e digite o nome da tarefa na caixa de texto "Add a new task inside the '%NOME_DA_CATEGORIA%' category" e pressione a tecla "Enter".
5. Para excluir uma tarefa, clique no ícone de lixeira ao lado da tarefa que deseja excluir. O ícone de lixeira aparece ao passar o mouse sobre a tarefa.
6. Para excluir uma categoria, clique no ícone de lixeira ao lado da categoria que deseja excluir. A categoria precisa estar selecionada para que o ícone de lixeira apareça. Se a categoria selecionada for excluída, a categoria geral "All" será selecionada automaticamente. Todas as tarefas da categoria excluída serão movidas para a categoria geral "All".
7. Para marcar uma tarefa como concluída, clique na caixa de seleção ao lado da tarefa. A tarefa será marcada como concluída e aparecerá com uma linha horizontal na frente do nome da tarefa. Ele também será movido para o final da lista de tarefas.
8. Para desmarcar uma tarefa como concluída, clique novamente na caixa de seleção ao lado da tarefa. A tarefa será desmarcada como concluída e não aparecerá com uma linha horizontal na frente do nome da tarefa. Ele também será movido para sua posição original na lista de tarefas.

Este é um aplicativo básico de lista de tarefas e pode ser personalizado de acordo com suas necessidades. Espero que este aplicativo seja útil para você!
