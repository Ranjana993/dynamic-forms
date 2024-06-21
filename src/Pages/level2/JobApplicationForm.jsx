import useFormValidation from '../../hooks/useFormValidationforJob';

const JobApplicationForm = () => {
  const initialState = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    preferredInterviewTime: '',
  };

  const validate = (values) => {
    const errors = {};
    if (!values.fullName) errors.fullName = 'Full Name is required.';
    if (!values.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email is invalid.';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required.';
    } else if (isNaN(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number.';
    }
    if (['Developer', 'Designer'].includes(values.position) && (!values.relevantExperience || values.relevantExperience <= 0)) {
      errors.relevantExperience = 'Relevant Experience must be greater than 0.';
    }
    if (values.position === 'Designer' && !values.portfolioUrl) {
      errors.portfolioUrl = 'Portfolio URL is required.';
    } else if (values.position === 'Designer' && values.portfolioUrl && !/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioUrl)) {
      errors.portfolioUrl = 'Portfolio URL must be a valid URL.';
    }
    if (values.position === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required.';
    }
    if (values.additionalSkills.length === 0) {
      errors.additionalSkills = 'At least one skill must be selected.';
    }
    if (!values.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required.';
    }
    return errors;
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useFormValidation(initialState, validate);

  return (
    <> 
      <h2 className="text-center text-3xl capitalize py-4">Job Application Form </h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 border shadow-md rounded-md space-y-4">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Applying for Position</label>
          <select
            name="position"
            value={values.position}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Position</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {['Developer', 'Designer'].includes(values.position) && (
          <div>
            <label className="block text-gray-700">Relevant Experience (Years)</label>
            <input
              type="number"
              name="relevantExperience"
              value={values.relevantExperience}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.relevantExperience && <p className="text-red-500 text-sm">{errors.relevantExperience}</p>}
          </div>
        )}
        {values.position === 'Designer' && (
          <div>
            <label className="block text-gray-700">Portfolio URL</label>
            <input
              type="text"
              name="portfolioUrl"
              value={values.portfolioUrl}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.portfolioUrl && <p className="text-red-500 text-sm">{errors.portfolioUrl}</p>}
          </div>
        )}
        {values.position === 'Manager' && (
          <div>
            <label className="block text-gray-700">Management Experience</label>
            <textarea
              name="managementExperience"
              value={values.managementExperience}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.managementExperience && <p className="text-red-500 text-sm">{errors.managementExperience}</p>}
          </div>
        )}
        <div>
          <label className="block text-gray-700">Additional Skills</label>
          <div className="mt-1">
            {['JavaScript', 'CSS', 'Python'].map((skill) => (
              <label key={skill} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="additionalSkills"
                  value={skill}
                  checked={values.additionalSkills.includes(skill)}
                  onChange={handleChange}
                  className="form-checkbox ml-4"
                />
                <span className="ml-2">{skill}</span>
              </label>
            ))}
          </div>
          {errors.additionalSkills && <p className="text-red-500 text-sm">{errors.additionalSkills}</p>}
        </div>
        <div>
          <label className="block text-gray-700 pt-4">Preferred Interview Time</label>
          <input
            type="datetime-local"
            name="preferredInterviewTime"
            value={values.preferredInterviewTime}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.preferredInterviewTime && <p className="text-red-500 text-sm">{errors.preferredInterviewTime}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
        
        
      </form>
      <div className=' w-[70%] m-auto py-12'>
        {isSubmitting && Object.keys(errors).length === 0 && (
          <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-md">
            <h3 className="text-green-800 font-bold">Form Submitted Successfully</h3>
            <pre className="text-green-700">
              {JSON.stringify(values, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </>
  );
};

export default JobApplicationForm;
