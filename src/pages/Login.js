import "../scripts/Login.css";
import { useRef, useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const userRef = useRef();
	const errRef = useRef();

	const navigate = useNavigate();

	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		setErrMsg("");
	}, [user, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			fetch("https://dummyjson.com/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: user,
					password: password,
				}),
			})
				.then((res) => res.json())
				.then(console.log);

			setUser("");
			setPassword("");
			setSuccess(true);
			
			//Create a dummy admin user
			if (user === "kminchelle" && password === "0lelplR") {
				navigate("/home", { state: { data: "admin" } });
			} else {
				navigate("/home", { state: { data: "false" } });
			}
		} catch (err) {
			if (!err?.response) {
				setErrMsg("No Server Response");
			} else if (err.response?.status === 400) {
				setErrMsg("Missing Username or Password");
			} else if (err.response?.status === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<div>
					<h1>You are logged in!</h1>
					<br />
					<p>
						<a href="/home">Go to Kanban Board</a>
					</p>
				</div>
			) : (
				<div className="login">
					<p
						ref={errRef}
						className={errMsg ? "errmsg" : "offscreen"}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Log In</h1>
					<Form className="login-form" onSubmitCapture={handleSubmit}>
						<label>Username: </label>
						<Input
							className="form-input"
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Username"
							ref={userRef}
							autoComplete="on"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>
						<label>Password: </label>
						<Input
							className="form-input"
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
						/>
						<Button
							type="primary"
							htmlType="submit"
							className="login-form-button"
						>
							Log in
						</Button>
					</Form>
				</div>
			)}
		</>
	);
}
