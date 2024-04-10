import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home/Home";
import SurveyList from "./pages/SurveyList/SurveyList";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="survey-list" element={<SurveyList />} />
					<Route path="test" element={<Test />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
