import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';

import './App.css';

import trashSVG from './assets/trash.svg';
import { Checkbox } from './components/Checkbox';

type Todo = {
  id: number;
  text: string;
  category?: number;
  done?: number;
  cancelled?: number;
  created: number;
};

type Category = {
  id: number;
  name: string;
};

type FilterTodoListParams = {
  newTodoList?: Todo[];
  categoryId?: number;
};

const App = () => {
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [todoListFiltered, setTodoListFiltered] = useState<Todo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const changeNewTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const keypressHandler = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') {
      return;
    }

    if (newTodo) {
      const id = todoList.sort((a, b) => b.id - a.id)[0]?.id ?? 0;
      const newTodoList = [
        ...todoList,
        {
          id: id + 1,
          text: newTodo,
          category: selectedCategory !== 0 ? selectedCategory : undefined,
          created: Date.now()
        }
      ];
      setTodoList(newTodoList);
      filterTodoList({ newTodoList });
      localStorage.setItem('todoList', JSON.stringify(newTodoList));
      setNewTodo('');
    }
  };

  const getCategoryName = (id?: number) => {
    return categories.find((cat) => {
      return cat.id === id;
    })?.name;
  };

  const checkTodo = (id: number) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        todo.done = todo.done ? undefined : Date.now();
      }
      return todo;
    });
    setTodoList(newTodoList);
    filterTodoList({ newTodoList });
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
  };

  const selectCategory = (id: number) => {
    setSelectedCategory(id);
    filterTodoList({ categoryId: id });
  };

  const filterTodoList = ({
    newTodoList,
    categoryId
  }: FilterTodoListParams) => {
    const todoListToFilter = newTodoList ?? todoList;
    const categoryIdToFilter = categoryId ?? selectedCategory;
    const sortFunction = (a: Todo, b: Todo) => {
      if (a.done || b.done)
        if (!a.done) return -1;
        else if (!b.done) return 1;
        else return b.done - a.done;
      return b.created - a.created;
    };

    if (categoryIdToFilter && categoryIdToFilter !== 0) {
      const filteredTodoList = todoListToFilter
        .filter((todo) => {
          return todo.category === categoryIdToFilter;
        })
        .sort(sortFunction);
      setTodoListFiltered(filteredTodoList);
    } else {
      const sortedTodoList = todoListToFilter.sort(sortFunction);
      setTodoListFiltered(sortedTodoList);
    }
  };

  const handleDeleteTask = (id: number) => {
    const newTodoList = todoList.filter((todo) => {
      return todo.id !== id;
    });
    setTodoList(newTodoList);
    filterTodoList({ newTodoList });
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
  };

  const handleDeleteCategory = (id: number) => {
    const newCategories = categories.filter((cat) => {
      return cat.id !== id;
    });
    setCategories(newCategories);
    localStorage.setItem('categories', JSON.stringify(newCategories));

    const newTodoList = todoList.map((todo) => {
      if (todo.category === id) {
        todo.category = undefined;
      }
      return todo;
    });
    setTodoList(newTodoList);

    setSelectedCategory(0);
    filterTodoList({ newTodoList, categoryId: 0 });
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
  };

  useEffect(() => {
    const loadTodoList = localStorage.getItem('todoList');
    if (loadTodoList) {
      setTodoList(JSON.parse(loadTodoList));
      filterTodoList({ newTodoList: JSON.parse(loadTodoList) });
    }

    const loadCategories = localStorage.getItem('categories');
    if (loadCategories) {
      setCategories(JSON.parse(loadCategories));
    }
  }, []);

  return (
    <div className="App">
      <div className="categories">
        <div
          className={`category ${selectedCategory === 0 && 'active'}`}
          onClick={() => selectCategory(0)}
        >
          All
        </div>
        {categories.map((category) => (
          <div
            className={`category ${
              selectedCategory === category.id && 'active'
            }`}
            key={category.id}
            onClick={() =>
              selectedCategory !== category.id && selectCategory(category.id)
            }
          >
            {category.name}
            <img
              onClick={() => {
                handleDeleteCategory(category.id);
              }}
              className="category-delete"
              src={trashSVG}
              alt="Delete"
            />
          </div>
        ))}
        <div className="category add-category">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const id = categories.sort((a, b) => b.id - a.id)[0]?.id ?? 0;
                const newCategories = [
                  ...categories,
                  {
                    id: id + 1,
                    name: newCategory
                  }
                ];
                setCategories(newCategories);
                localStorage.setItem(
                  'categories',
                  JSON.stringify(newCategories)
                );
                setNewCategory('');
              }
            }}
            placeholder="Add a new category"
          />
        </div>
      </div>
      <div className="new-todo">
        <h1>{getCategoryName(selectedCategory) ?? 'All'} Tasks</h1>
        <div className="input-todo">
          <input
            type="text"
            value={newTodo}
            onChange={changeNewTodo}
            onKeyDown={keypressHandler}
            placeholder={`Add a new task ${
              selectedCategory !== 0
                ? `inside the '${getCategoryName(selectedCategory)}' category`
                : ''
            }`}
          />
        </div>
      </div>
      <div className="list-wrapper">
        <div className="list">
          {todoListFiltered.map((todo) => (
            <div
              className={`todo ${Boolean(todo.done) && 'checked'}`}
              key={todo.id}
            >
              <div className="todo-content">
                <Checkbox
                  checked={Boolean(todo.done)}
                  onChange={() => checkTodo(todo.id)}
                >
                  {todo.text}
                </Checkbox>
                <div
                  className="todo-category"
                  onClick={() => selectCategory(todo.category ?? 0)}
                >
                  {getCategoryName(todo.category) ?? 'Uncategorized'}
                </div>
              </div>
              <div className="todo-actions">
                <img
                  onClick={() => handleDeleteTask(todo.id)}
                  className="todo-delete"
                  src={trashSVG}
                  alt="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
