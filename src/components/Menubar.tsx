import type { MenuProps } from "antd";
import { Menu } from "antd";
import "../scripts/Menubar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBug,
	faClipboardList,
	faThumbTack,
	faList,
	faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Menubar() {
	const { todoList, updateTodoList } = useAppContext();
	const navigate = useNavigate();

	const items: MenuProps["items"] = [
		{
			label: "Add new Bug",
			key: "bug",
			icon: <FontAwesomeIcon icon={faBug} />,
		},
		{
			label: "Add new Feature",
			key: "feature",
			icon: <FontAwesomeIcon icon={faClipboardList} />,
		},
		{
			label: "Add new Task",
			key: "task",
			icon: <FontAwesomeIcon icon={faThumbTack} />,
		},
		{
			label: "Add new Backlog",
			key: "backlog",
			icon: <FontAwesomeIcon icon={faList} />,
		},
		{
			label: "Log Out",
			key: "logout",
			icon: <FontAwesomeIcon icon={faRightFromBracket} />,
		},
	];

	const [current, setCurrent] = useState("mail");

	const onClick: MenuProps["onClick"] = (e) => {
		if (e.key !== "logout") {
			Swal.fire({
				title: "Input task title",
				input: "text",
				inputLabel: "Please input a title for your new " + e.key,
				inputPlaceholder: "Title",
			}).then((result) => {
				if (result.isConfirmed) {
					const newTask: ToDo = {
						isAdmin: true,
						id: Math.floor(Math.random() * 9999),
						assignedTo: null,
						type: e.key,
						title: result.value,
						status: "To Do",
						effort: 1,
						actualEffort: 1,
						client: null,
						priority: 0,
						tags: null,
					};
					updateTodoList([...todoList, newTask]);
				}
			});
		} else {
			navigate("/");
		}
	};

	return (
		<div className="menu-container">
			<Menu
				onClick={onClick}
				selectedKeys={[current]}
				mode="horizontal"
				items={items}
			/>
		</div>
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
