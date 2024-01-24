import "../scripts/KanbanBoard.css";
import ToDoItem from "../components/ToDoItem";
import { useLocation } from "react-router-dom";
import Menubar from "../components/Menubar";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export default function KanbanBoard() {
	const { state } = useLocation();
	const receivedData = state?.data || null;
	const isAdmin = receivedData === "admin" ? true : false;
	const { todoList, updateTodoList } = useAppContext();

	useEffect(() => {
		dummyValues();
	}, []);

	function dummyValues() {
		let initialTodoList: ToDo[] = [];
		initialTodoList.push({
			isAdmin: isAdmin,
			id: 8837,
			type: "bug",
			title: "Create components for Netflix Project",
			assignedTo: "Terry Medhurst",
			status: "To Do",
			effort: 8,
			actualEffort: 8,
			client: "Netflix",
			priority: 1,
			tags: "UI Design",
		});
		initialTodoList.push({
			isAdmin: isAdmin,
			id: 5821,
			type: "task",
			title: "Create invoice for FacebookSA assets",
			assignedTo: "Sheldon Quigley",
			status: "Done",
			effort: 2,
			actualEffort: 2,
			client: "Facebook",
			priority: 1,
			tags: "Completed",
		});
		initialTodoList.push({
			isAdmin: isAdmin,
			id: 1033,
			type: "feature",
			title: "Create assets for Amazon",
			assignedTo: "Terrill Hills",
			status: "In progress",
			effort: 8,
			actualEffort: 8,
			client: "Amazon",
			priority: 1,
			tags: "Approved",
		});
		initialTodoList.push({
			isAdmin: isAdmin,
			id: 4008,
			type: "backlog",
			title: "Invoice AmazonSA for created assets",
			assignedTo: "Miles Maggio",
			status: "To Do",
			effort: 1,
			actualEffort: 1,
			client: "Amazon",
			priority: 5,
			tags: "Approved",
		});
		updateTodoList(initialTodoList);
	}

	return (
		<>
			<Menubar />
			<div className="board">
				<div className="todo">
					<div className="todo-heading">To Do</div>
					<div className="todo-container">
						{todoList
							.filter((todo) => todo.status === "To Do")
							.map((todo) => (
								<ToDoItem
									key={todo.id}
									isAdmin={todo.isAdmin}
									id={todo.id}
									title={todo.title}
									assignedTo={todo.assignedTo}
									type={todo.type}
									status={todo.status}
									effort={todo.effort}
									actualEffort={todo.actualEffort}
									client={todo.client}
									priority={todo.priority}
									tags={todo.tags}
								/>
							))}
					</div>
				</div>
				<div className="inprogress">
					<div className="inprogress-heading">In Progress</div>
					<div className="todo-container">
						{todoList
							.filter((todo) => todo.status === "In progress")
							.map((todo) => (
								<ToDoItem
									key={todo.id}
									isAdmin={todo.isAdmin}
									id={todo.id}
									title={todo.title}
									assignedTo={todo.assignedTo}
									type={todo.type}
									status={todo.status}
									effort={todo.effort}
									actualEffort={todo.actualEffort}
									client={todo.client}
									priority={todo.priority}
									tags={todo.tags}
								/>
							))}
					</div>
				</div>

				<div className="done">
					<div className="done-heading">Done</div>
					<div className="todo-container">
						{todoList
							.filter((todo) => todo.status === "Done")
							.map((todo) => (
								<ToDoItem
									key={todo.id}
									isAdmin={todo.isAdmin}
									id={todo.id}
									title={todo.title}
									assignedTo={todo.assignedTo}
									type={todo.type}
									status={todo.status}
									effort={todo.effort}
									actualEffort={todo.actualEffort}
									client={todo.client}
									priority={todo.priority}
									tags={todo.tags}
								/>
							))}
					</div>
				</div>
			</div>
		</>
	);
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
