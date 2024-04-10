import React, { useEffect } from "react";
import Header from "~/components/Header/Header";
import db from "~/firebase/firebase-config";
import { collection, getDocs, QueryDocumentSnapshot } from "firebase/firestore";

const Test: React.FC = () => {
	useEffect(() => {
		// Test connection
		const bookmarksCollection = collection(db, "bookmarks");
		getDocs(bookmarksCollection)
			.then((querySnapshot) => {
				if (!querySnapshot.empty) {
					console.log("Firebase connection success");
					querySnapshot.docs.forEach((doc: QueryDocumentSnapshot) => {});
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
