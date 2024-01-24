import "../scripts/ToDoItem.css";
import projectStatus from "../data/projectStatus";
import clients from "../data/clients";
import taskers from "../data/taskers";
import projectTags from "../data/projectTags";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBug,
	faClipboardList,
	faThumbTack,
	faList,
} from "@fortawesome/free-solid-svg-icons";
import { Select, InputNumber } from "antd";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useAppContext } from "../context/AppContext";

export default function ToDoItem({
	isAdmin,
	id,
	assignedTo,
	type,
	title,
	status,
	effort,
	actualEffort,
	client,
	priority,
	tags,
}: ToDo) {
	const { todoList, updateTodoList } = useAppContext();

	const handleInputChange = (
		key: keyof ToDo,
		value: string | number | null
	) => {
		const updatedTodoList = todoList.map((task) =>
			task.id === id ? { ...task, [key]: value } : task
		);
		console.log("key", key, "value", value);
		console.log(updatedTodoList);
		updateTodoList(updatedTodoList);
	};

	const todoStyle = `todo-item ${getTaskType(type).taskClassName}`;
	return (
		<div className={todoStyle}>
			<div className="todo-title">
				<FontAwesomeIcon icon={getTaskType(type).taskIcon} />
				{id} {title}
			</div>
			<Select
				className="assigned-to"
				placeholder="Assign to"
				size="small"
				optionFilterProp="children"
				onChange={(value) => handleInputChange("assignedTo", value)}
				options={getSelectOptions(taskers)}
				value={assignedTo != null ? assignedTo : null}
			/>
			<p className="label">Status:</p>
			<Select
				className="selectInput"
				placeholder="Status"
				size="small"
				optionFilterProp="children"
				onChange={(value) => handleInputChange("status", value)}
				options={getSelectOptions(projectStatus)}
				disabled={!isAdmin}
				value={status}
			/>
			<p className="label">Effort:</p>
			<InputNumber
				className="numberInput"
				placeholder="Effort"
				size="small"
				min={1}
				max={10}
				onChange={(value) => handleInputChange("effort", value)}
				disabled={!isAdmin}
				value={effort != null ? effort : undefined}
			/>
			<p className="label">Actual Effort:</p>
			<InputNumber
				className="numberInput"
				placeholder="Actual Effort"
				size="small"
				min={1}
				max={10}
				onChange={(value) => handleInputChange("actualEffort", value)}
				disabled={!isAdmin}
				value={actualEffort != null ? actualEffort : null}
			/>
			<p className="label">Client:</p>
			<Select
				className="selectInput"
				placeholder="Client"
				size="small"
				optionFilterProp="children"
				onChange={(value) => handleInputChange("client", value)}
				options={getSelectOptions(clients)}
				disabled={!isAdmin}
				value={client != null ? client : null}
			/>
			<p className="label">Priority:</p>
			<InputNumber
				className="numberInput"
				placeholder="Priority"
				size="small"
				min={1}
				max={10}
				onChange={(value) => handleInputChange("priority", value)}
				disabled={!isAdmin}
				value={priority != null ? priority : null}
			/>
			<p className="task-tags">Project tags:</p>
			<Select
				className="task-tags"
				mode="tags"
				size="small"
				style={{ width: "100%" }}
				placeholder="Task tags"
				onChange={(value) => handleInputChange("tags", value)}
				options={projectTags}
				disabled={!isAdmin}
				value={tags}
			/>
		</div>
	);
}

function getSelectOptions(opts: string[]): Option[] {
	const options: Option[] = opts.map((item) => ({
		value: item,
		label: item,
	}));
	return options;
}

interface Option {
	label: string;
	value: string;
}

function getTaskType(type: string): {
	taskType: string;
	taskIcon: IconProp;
	taskClassName: string;
} {
	switch (type) {
		case "bug": {
			return { taskType: type, taskIcon: faBug, taskClassName: "task-bug" };
		}
		case "feature": {
			return {
				taskType: type,
				taskIcon: faClipboardList,
				taskClassName: "task-feature",
			};
		}
		case "backlog": {
			return {
				taskType: type,
				taskIcon: faList,
				taskClassName: "task-backlog",
			};
		}
		default: {
			return {
				taskType: type,
				taskIcon: faThumbTack,
				taskClassName: "task-task",
			};
		}
	}
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
