import { Todo } from '../types/todo'

export const initialState = {
    loading: false,
    data: [] as Todo[],
    detail: {title:''} as Todo
}

export type ITodoState = typeof initialState

export const todoActions = {
    fetchTodosStart: () => 
        ({ type: 'FETCH_TODOS_START' } as const),
    fetchTodosFinnish: (payload: Todo[]) =>
        ({ type: 'FETCH_TODOS_FINNISH', payload } as const),
    fetchTodoFinnish: (payload: Todo) =>
        ({ type: 'FETCH_TODO_FINNISH', payload } as const),
    addTodo: (payload: Todo) => 
        ({ type: 'ADD_TODO', payload } as const),
    removeTodo: (payload: string) =>
        ({ type: 'REMOVE_TODO', payload } as const),
    editTodo: (id: string, payload: Partial<Todo>) =>
        ({ type: 'EDIT_TODO', payload, id } as const),
    updateDetail: (id: string, payload: Partial<Todo>) =>
        ({ type: 'UPDATE_DETAIL', payload, id } as const),
}

export type TTodoAction = ReturnType<
    typeof todoActions[keyof typeof todoActions]>

export function todoReducer(state: ITodoState, action: TTodoAction) {
    switch (action.type) {
        case 'FETCH_TODOS_START':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_TODOS_FINNISH':
            return {
                ...state,
                loading: false,
                data: action.payload,
            }
        case 'FETCH_TODO_FINNISH':
            return {
                ...state,
                loading: false,
                detail: action.payload,
            }
        case 'ADD_TODO':
            return {
                ...state,
                data: [...state.data, action.payload],
            }
        case 'REMOVE_TODO':
            return {
                ...state,
                data: state.data.filter((i) => i.id !== action.payload),
            }
        case 'EDIT_TODO':
            return {
                ...state,
                data: state.data.map((i) => {
                    if (i.id === action.id) {
                        return {
                            ...i,
                            ...action.payload,
                        }
                    }
                    return i
                }),
            }
        case 'UPDATE_DETAIL':
            return {
                ...state,
                detail: { ...state.detail, ...action.payload },
            }

        default:
            return state
    }
}
