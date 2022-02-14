import { BrowserRouter, Routes, Route } from 'react-router-dom'

import TodoDetail from '../pages/TodoDetail'
import Todos from '../pages/Todos'

const PageRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/detail/:todoId" element={<TodoDetail />} />
                <Route path="/" element={<Todos />} />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes
