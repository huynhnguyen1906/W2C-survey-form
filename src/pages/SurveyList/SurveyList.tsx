import "./style.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import db from "~/firebase/firebase-config";
import Header from "~/components/Header/Header";
import SurveyAnswerBox from "~/components/SurveyAnswerBox/SurveyAnswerBox";

export interface Survey {
	id: string;
	name: string;
	class: string;
	message: string;
	created_at: firebase.firestore.Timestamp;
	have_read: boolean;
}

function SurveyList() {
	const [surveys, setSurveys] = useState<Survey[]>([]);

	const handleDelete = (id: string) => {
		setSurveys(surveys.filter((survey) => survey.id !== id));
	};

	const navigate = useNavigate();

	useEffect(() => {
		const checkPassword = () => {
			const storedPassword = sessionStorage.getItem("password");
			if (storedPassword !== "yuutonobaka") {
				const password = prompt("Please enter your password");
				if (password !== "yuutonobaka") {
					navigate("/");
				} else {
					sessionStorage.setItem("password", password);
				}
			}
		};

		checkPassword();
		const fetchSurveys = async () => {
			const surveyCollection = query(
				collection(db, "w2c-survey"),
				orderBy("created_at", "desc")
			);
			const surveySnapshot = await getDocs(surveyCollection);
			let surveyList = surveySnapshot.docs.map(
				(doc) =>
					({
						id: doc.id,
						...doc.data(),
					} as Survey)
			);

			surveyList = surveyList.sort((a, b) =>
				a.have_read === b.have_read ? 0 : a.have_read ? 1 : -1
			);

			setSurveys(surveyList);
		};

		fetchSurveys();
	}, [navigate]);

	return (
		<div>
			<Header />
			<div className="logo">
				<img src="/logo.svg" alt="logo" />
			</div>
			<div className="container">
				{surveys.length === 0 ? (
					<h1>送信されたスタフォームがありません。。。。</h1>
				) : (
					surveys.map((survey, index) => (
						<SurveyAnswerBox
							key={index}
							surveyInfo={survey}
							onDelete={handleDelete}
						/>
					))
				)}
			</div>
		</div>
	);
}

export default SurveyList;
