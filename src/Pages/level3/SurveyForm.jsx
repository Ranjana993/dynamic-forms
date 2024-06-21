import { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    surveyTopic: '',
    favoriteLanguage: '',
    experienceYears: '',
    exerciseFrequency: '',
    dietPreference: '',
    highestQualification: '',
    fieldOfStudy: '',
    feedback: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [additionalQuestions, setAdditionalQuestions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchAdditionalQuestions = async (topic) => {
    try {
      const response = await axios.get(`https://api.example.com/survey-questions?topic=${topic}`);
      setAdditionalQuestions(response.data);
    } catch (error) {
      console.error("Error fetching additional questions:", error);
    }
  };

  useEffect(() => {
    if (formData.surveyTopic) {
      fetchAdditionalQuestions(formData.surveyTopic);
    }
  }, [formData.surveyTopic]);

  const validate = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = 'Full Name is required.';
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid.';
    }
    if (!formData.surveyTopic) {
      errors.surveyTopic = 'Survey Topic is required.';
    } else {
      if (formData.surveyTopic === 'Technology') {
        if (!formData.favoriteLanguage) errors.favoriteLanguage = 'Favorite Programming Language is required.';
        if (!formData.experienceYears || formData.experienceYears <= 0) {
          errors.experienceYears = 'Years of Experience must be greater than 0.';
        }
      } else if (formData.surveyTopic === 'Health') {
        if (!formData.exerciseFrequency) errors.exerciseFrequency = 'Exercise Frequency is required.';
        if (!formData.dietPreference) errors.dietPreference = 'Diet Preference is required.';
      } else if (formData.surveyTopic === 'Education') {
        if (!formData.highestQualification) errors.highestQualification = 'Highest Qualification is required.';
        if (!formData.fieldOfStudy) errors.fieldOfStudy = 'Field of Study is required.';
      }
    }
    if (!formData.feedback || formData.feedback.length < 50) {
      errors.feedback = 'Feedback must be at least 50 characters.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      alert(`Form submitted successfully:\n${JSON.stringify(formData, null, 2)}\nAdditional Questions: ${JSON.stringify(additionalQuestions, null, 2)}`);
    }
    setFormData({
      fullName: '',
      email: '',
      surveyTopic: '',
      favoriteLanguage: '',
      experienceYears: '',
      exerciseFrequency: '',
      dietPreference: '',
      highestQualification: '',
      fieldOfStudy: '',
      feedback: '',
    }
    )
  };

  return (
    <>
      <h2 className="text-center text-3xl capitalize py-4">Survey Form </h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Survey Topic</label>
          <select
            name="surveyTopic"
            value={formData.surveyTopic}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Topic</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
          </select>
        </div>
        {formData.surveyTopic === 'Technology' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Favorite Programming Language</label>
              <select
                name="favoriteLanguage"
                value={formData.favoriteLanguage}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="C#">C#</option>
              </select>
              {formErrors.favoriteLanguage && <p className="text-red-500 text-sm">{formErrors.favoriteLanguage}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Years of Experience</label>
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {formErrors.experienceYears && <p className="text-red-500 text-sm">{formErrors.experienceYears}</p>}
            </div>
          </div>
        )}
        {formData.surveyTopic === 'Health' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Exercise Frequency</label>
              <select
                name="exerciseFrequency"
                value={formData.exerciseFrequency}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Frequency</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Rarely">Rarely</option>
              </select>
              {formErrors.exerciseFrequency && <p className="text-red-500 text-sm">{formErrors.exerciseFrequency}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Diet Preference</label>
              <select
                name="dietPreference"
                value={formData.dietPreference}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Preference</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Vegan">Vegan</option>
                <option value="Non-Vegetarian">Non-Vegetarian</option>
              </select>
              {formErrors.dietPreference && <p className="text-red-500 text-sm">{formErrors.dietPreference}</p>}
            </div>
          </div>
        )}
        {formData.surveyTopic === 'Education' && (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Highest Qualification</label>
              <select
                name="highestQualification"
                value={formData.highestQualification}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Qualification</option>
                <option value="High School">High School</option>
                <option value="Bachelor's">Bachelor&apos;s</option>
                <option value="Master's">Master&apos;s</option>
                <option value="PhD">PhD</option>
              </select>
              {formErrors.highestQualification && <p className="text-red-500 text-sm">{formErrors.highestQualification}</p>}
            </div>
            <div>
              <label className="block text-gray-700">Field of Study</label>
              <input
                type="text"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
              {formErrors.fieldOfStudy && <p className="text-red-500 text-sm">{formErrors.fieldOfStudy}</p>}
            </div>
          </div>
        )}
        <div>
          <label className="block text-gray-700">Feedback</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            rows="4"
          />
          {formErrors.feedback && <p className="text-red-500 text-sm">{formErrors.feedback}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        {additionalQuestions.length > 0 && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-400 rounded-md">
            <h3 className="text-gray-800 font-bold">Additional Questions</h3>
            {additionalQuestions.map((question, index) => (
              <p key={index} className="text-gray-700">{question}</p>
            ))}
          </div>
        )}
      </form>
    </>

  );
};

export default SurveyForm;
