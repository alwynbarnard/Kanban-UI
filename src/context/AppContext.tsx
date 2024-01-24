import { createContext, ReactNode, useContext, useState } from "react";

interface AppContextProps {
	children: ReactNode;
}

interface AppContextType {
	todoList: ToDo[];
	updateTodoList: (updatedTodoList: ToDo[]) => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: AppContextProps) {
	const [todoList, setTodoList] = useState<ToDo[]>([]);

	const updateTodoList = (updatedTodoList: ToDo[]) => {
		setTodoList(updatedTodoList);
	};

	return (
		<AppContext.Provider value={{ todoList, updateTodoList }}>
			{children}
		</AppContext.Provider>
	);
}

export function useAppContext() {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext must be used within a TodoProvider");
	}
	return context;
}

interface ToDo {
	isAdmin: boolean;
	id: number;
	assignedTo: string | null;
	type: string;
	title: string;
	status: string;
	effort: number;
	actualEffort: number;
	client: string | null;
	priority: number;
	tags: string | null;
}
