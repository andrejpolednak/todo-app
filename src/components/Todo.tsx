import { useTodoActions } from 'hooks/useTodos'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Todo as TodoType } from '../types/todo'

export interface Props {
    todo: TodoType
}

const Todo: React.FC<Props> = ({ todo }) => {
    const navigate = useNavigate()
    const { removeTodo } = useTodoActions()

    return (
        <div className="todo" onClick={() => navigate('/detail/' + todo.id)}>
            <h3>{todo.title}</h3>
            <div className="todo-actions">
                <button
                    className="red"
                    onClick={(e) => {
                        e.stopPropagation()
                        removeTodo(todo.id)
                    }}>
                    Delete
                </button>
            </div>
        </div>
    )
}

const equals = (prevProps: Props, nextProps: Props) => {
    if (
        prevProps.todo.title !== nextProps.todo.title ||
        prevProps.todo.id !== nextProps.todo.id
    ) {
        return false
    }
    return true
}

export default memo(Todo, equals)
