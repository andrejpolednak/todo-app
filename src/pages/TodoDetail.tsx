import { useTodoActions, useTodoState } from 'hooks/useTodos'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const TodoDetail = () => {
    const { fetchTodo, editTodoDetail, editTodo } = useTodoActions()
    const { detail, loading } = useTodoState()
    const { todoId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchTodo(todoId)
    }, [todoId])

    return loading ? (
        <p>loading</p>
    ) : (
        <>
            <button onClick={() => navigate('/')}> back </button>
            <h3> Todo detail </h3>
            <div className="todo">
                <input
                    value={detail.title}
                    onChange={(e) =>
                        editTodoDetail({ title: e.target.value, id: todoId })
                    } />
            </div>
            <button onClick={editTodo}>Update</button>
        </>
    )
}

export default TodoDetail
