import React, { useEffect } from 'react'
import { useTodoActions, useTodoState } from 'hooks/useTodos'
import Todo from '../components/Todo'

// OLD App.tsx file

export const App: React.FC = () => {
    const { fetchTodos, addTodo } = useTodoActions()
    const todoState = useTodoState()

    useEffect(() => {
      fetchTodos()
    },[])

    return todoState.loading ? (
        <p>loading</p>
    ) : (
        <div className="todo-wrapper">
            <div className="todo-list-header">
                <h3> Todo list </h3>
                <button
                    onClick={() =>
                        addTodo({ title: '(empty)', deleted: false })
                    }>
                    Add todo
                </button>
            </div>
            {todoState.todoList?.map((todo) => (
                <Todo key={todo.id} todo={todo} />
            ))}
        </div>
    )
}

export default App
