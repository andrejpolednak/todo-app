import Provider from './context/State'
import AppRoutes from './router/Router'
import './assets/style.css'

export const App = () => {
    return (
        <div>
            <Provider>
                <AppRoutes />
            </Provider>
        </div>
    )
}
