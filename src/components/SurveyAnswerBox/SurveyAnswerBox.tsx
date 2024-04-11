import { FaTrash } from "react-icons/fa";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import db from "~/firebase/firebase-config";
import { useState } from "react";
import { Survey } from "~/pages/SurveyList/SurveyList";

interface SurveyAnswerBoxProps {
	surveyInfo: Survey;
	onDelete: (id: string) => void;
}

function SurveyAnswerBox({ surveyInfo, onDelete }: SurveyAnswerBoxProps) {
	const [haveRead, setHaveRead] = useState(surveyInfo.have_read);

	const handleReadClick = async () => {
		const newReadStatus = !haveRead;
		setHaveRead(newReadStatus);

		const surveyRef = doc(db, "w2c-survey", surveyInfo.id);
		await updateDoc(surveyRef, { have_read: newReadStatus });
	};

	const handleDeleteClick = async () => {
		if (
			window.confirm(surveyInfo.name + "さんの入力フォームを削除しますか？")
		) {
			const surveyRef = doc(db, "w2c-survey", surveyInfo.id);
			await deleteDoc(surveyRef);
			onDelete(surveyInfo.id);
		}
	};

	return (
		<div className={`surveyAnswerBox ${haveRead ? "checked" : ""}`}>
			<div className="box">
				<div className="action">
					<button className="HaveRead" onClick={handleReadClick}>
						{haveRead ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
					</button>
					<button className="delete" onClick={handleDeleteClick}>
						<FaTrash />
					</button>
				</div>
				<div className="studentInfo">
					<div className="studentName">
						<span>名前：</span>
						{surveyInfo.name}
					</div>
					<div className="studentClass">
						<span>クラス：</span>
						{surveyInfo.class}
					</div>
					<div className="createdDate">
						<span>送信日：</span>
						{surveyInfo.created_at.toDate().toLocaleDateString()}
					</div>
				</div>
			</div>
			<div className="bar"></div>
			<div className="message">{surveyInfo.message}</div>
		</div>
	);
}

export default SurveyAnswerBox;
