import Navbar from "./Components/Navbar";
import {Routes , Route} from "react-router-dom"
import JobApplicationForm from "./Pages/level2/JobApplicationForm";
import EventRegistrationForm from "./Pages/level1/EventRegistrationForm"
import SurveyForm from "./Pages/level3/SurveyForm";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<EventRegistrationForm />}/>
        <Route path="/level2" element={<JobApplicationForm />} />
        <Route path="/level3" element={<SurveyForm />}/>
      </Routes>
      
      
    </>
  )
}