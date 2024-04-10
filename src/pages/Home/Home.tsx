import "./style.scss";

import Header from "~/components/Header/Header";
import { useState, useRef } from "react";

function Home() {
	const [studentId, setStudentId] = useState("");
	const [classId, setClassId] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");

	const studentIdInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = () => {
		if (studentId === "" || classId === "" || name === "") {
			alert("必須項目を入力してください！！");
			return;
		}

		if (isNaN(Number(studentId))) {
			alert("学籍番号を正しく入力してください！！");
			if (studentIdInputRef.current) {
				studentIdInputRef.current.focus();
			}
			return;
		}

		console.log(studentId, classId, name, message);
		setClassId("");
		setName("");
		setMessage("");
		setStudentId("");
	};

	return (
		<div>
			<Header />
			<div className="main">
				<div className="inputForm">
					<div className="inputBox">
						<table>
							<tbody>
								<tr>
									<td>学籍番号</td>
									<td>
										<span>*入力必須</span>
										<input
											type="text"
											ref={studentIdInputRef}
											value={studentId}
											onChange={(e) => setStudentId(e.target.value)}
										/>
									</td>
								</tr>
								<tr>
									<td>クラス</td>
									<td>
										<span>*入力必須</span>
										<input
											type="text"
											value={classId}
											onChange={(e) => setClassId(e.target.value)}
										/>
									</td>
								</tr>
								<tr>
									<td>名前</td>
									<td>
										<span>*入力必須</span>
										<input
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</td>
								</tr>
								<tr>
									<td>一言</td>
									<td>
										<textarea
											placeholder="質問、相談、やりたいこと、なんでも。。。。。"
											value={message}
											onChange={(e) => setMessage(e.target.value)}
										></textarea>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="inputBox">
						<div className="submitBtn">
							<button onClick={handleSubmit} className="btn">
								送信
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
