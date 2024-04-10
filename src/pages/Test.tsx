import React, { useEffect } from "react";
import Header from "~/components/Header/Header";
import db from "~/firebase/Firebase-config";
import { DocumentData } from "@firebase/firestore-types";

const Test: React.FC = () => {
	useEffect(() => {
		// Test connection
		db.collection("test")
			.doc("testDoc")
			.get()
			.then((doc: DocumentData) => {
				if (doc.exists) {
					console.log("Firebase connection success");
				} else {
					console.log("No such document!");
				}
			})
			.catch((error: Error) => {
				console.log("Firebase connection failed", error);
			});
	}, []);

	return (
		<div>
			<p>abs</p>
			<Header />
		</div>
	);
};

export default Test;
