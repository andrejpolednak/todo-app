import React, { createContext } from 'react';

import { useTodos as useTodosState } from '../hooks/useTodos';

const Context = createContext<IContext | null>(null);

export interface IContext {
	todoState: ReturnType<typeof useTodosState>[0];
	todoActions: ReturnType<typeof useTodosState>[1];
}

const AppProvider: React.FC = ({ children }) => {
	const [todoState, todoActions] = useTodosState();

	return (
		<Context.Provider
			value={{
				todoState,
				todoActions
			}}>
			{children}
		</Context.Provider>
	);
};

export const useTodoContext = () => React.useContext(Context) as IContext;

export default AppProvider;