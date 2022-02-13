import { useReducer, useMemo } from 'react'
import { Todo } from '../types/todo'
import { todoReducer, initialState, todoActions } from '../context/Actions'

import { useTodoContext } from '../context/State'

const dispatchEnhancer =
    (dispatch: any) =>
    (...args: any[]) => {
        dispatch(...args)
    }

export const useTodos = () => {
    const [rawState, dispatchRaw] = useReducer(todoReducer, initialState)

    const dispatch = dispatchEnhancer(dispatchRaw)

    const state = useMemo(
        () => ({
            todoList: rawState.data.filter((i) => !i.deleted),
            detail: rawState.detail,
            loading: rawState.loading,
        }),
        [rawState]
    )

    const actions = {
        fetchTodos: async () => {
            dispatch(todoActions.fetchTodosStart())
            let todos = Array<Todo>()
            try {
                if (state.todoList.length === 0) {
                    const payload = await fetch(
                        'https://mocki.io/v1/bf5ef844-7aea-4661-9417-55a0c16ee984'
                    )
                    todos = await payload.json()
                } else {
                    todos = state.todoList
                }
                dispatch(todoActions.fetchTodosFinnish(todos as Todo[]))
            } catch (err) {
                console.error(err)
            }
        },
        fetchTodo: async (id: string | undefined) => {
            if (id == null) {
                return
            }
            let todos = Array<Todo>()
            dispatch(todoActions.fetchTodosStart())
            try {
                if (state.todoList.length === 0) {
                    const payload = await fetch(
                        'https://mocki.io/v1/bf5ef844-7aea-4661-9417-55a0c16ee984'
                    )
                    todos = await payload.json()
                } else {
                    todos = state.todoList
                }
                const todo = todos.find((t) => t.id === id)
                dispatch(todoActions.fetchTodoFinnish(todo as Todo))
            } catch (err) {
                console.error(err)
            }
        },
        addTodo: async (payload: Omit<Todo, 'id'>) => {
            const id = Date.now().toString()
            try {
                dispatch(todoActions.addTodo({ ...payload, id }))
                const response = {} // API
                dispatch(todoActions.editTodo(id, response))
            } catch (err) {
                dispatch(todoActions.removeTodo(id))
                console.error(err)
            }
        },
        editTodo: async () => {
            const detail = rawState.detail
            const originalValue = rawState.data.find((i) => i.id === detail.id)
            if (!originalValue) {
                return
            }
            try {
                dispatch(todoActions.editTodo(detail.id, detail))
                // const response = {}; /// API
            } catch (err) {
                dispatch(todoActions.editTodo(detail.id, originalValue))
                console.error(err)
            }
        },

        editTodoDetail: async (
            payload: Partial<Todo> & { id: string | undefined }
        ) => {
            const id = payload.id
            if (rawState.detail.id !== id) {
                return
            }
            try {
                dispatch(todoActions.updateDetail(id, payload))
                // const response = {}; /// API
            } catch (err) {
                dispatch(todoActions.updateDetail(id, rawState.detail))
                console.error(err)
            }
        },
        removeTodo: async (payload: string) => {
            dispatch(todoActions.editTodo(payload, { deleted: true }))
            try {
                // API
                dispatch(todoActions.removeTodo(payload))
            } catch (err) {
                dispatch(todoActions.editTodo(payload, { deleted: false }))
                console.error(err)
            }
        },
    }
    return [state, actions] as const
}

export const useTodoActions = () => {
    const { todoActions } = useTodoContext()
    return todoActions
}

export const useTodoState = () => {
    const { todoState } = useTodoContext()
    return todoState
}
