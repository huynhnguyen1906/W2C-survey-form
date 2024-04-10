import "./style.scss";
import db from "~/firebase/firebase-config";
import { collection, addDoc } from "firebase/firestore";
import { useState, useRef } from "react";
import Header from "~/components/Header/Header";
import CompleteDisplay from "~/components/CompleteDisplay/CompleteDisplay";

function Home() {
	const [studentId, setStudentId] = useState("");
	const [classId, setClassId] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const studentIdInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async () => {
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

		const bookmarksCollection = collection(db, "w2c-survey");
		try {
			await addDoc(bookmarksCollection, {
				student_id: studentId,
				class: classId,
				name: name,
				message: message,
				created_at: new Date(),
				have_read: false,
			});
			setIsSubmitted(true);
		} catch (e) {
			console.error("Error adding document: ", e);
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
			<div className="logo">
				<img src="/logo.svg" alt="logo" />
			</div>
			<div className="main">
				{isSubmitted ? (
					<CompleteDisplay />
				) : (
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
						<div className="submitBtn">
							<button onClick={handleSubmit} className="btn">
								送信
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default Home;
