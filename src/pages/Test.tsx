import React, { useEffect } from "react";
import Header from "~/components/Header/Header";
import db from "~/firebase/Firebase-config";
import { DocumentData } from "@firebase/firestore-types";

const Test: React.FC = () => {
	useEffect(() => {
		// Test connection
		db.collection("bookmark")
			.get()
			.then((querySnapshot) => {
				if (!querySnapshot.empty) {
					console.log("Firebase connection success");
					querySnapshot.forEach((doc: DocumentData) => {
						console.log(doc.id, " => ", doc.data());
					});
				} else {
					console.log("No documents found!");
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
