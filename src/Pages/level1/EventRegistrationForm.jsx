import useFormValidation from "../../hooks/useFormValidationforEvent";

const validate = (values) => {
  const errors = {};
  if (!values.name) errors.name = 'Name is required.';
  if (!values.email) {
    errors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email is invalid.';
  }
  if (!values.age || values.age <= 0) errors.age = 'Age must be greater than 0.';
  if (values.attendingWithGuest === 'Yes' && !values.guestName) {
    errors.guestName = 'Guest Name is required.';
  }
  return errors;
};

const EventRegistrationForm = () => {
  let initialState = {
    name: '',
    email: '',
    age: '',
    attendingWithGuest: 'No',
    guestName: ''
  };

  const { values, errors, handleChange, handleSubmit } = useFormValidation(initialState, validate);

  const submitForm = () => {
    alert(`Form submitted successfully:\n${JSON.stringify(values, null, 2)}`);
    initialState = {
      name: '',
      email: '',
      age: '',
      attendingWithGuest: 'No',
      guestName: ''
    }
  };

  return (
    <>
      <h2 className="text-center text-3xl capitalize py-4">Event Registration Form </h2>
      <form onSubmit={handleSubmit(submitForm)} className="max-w-md mx-auto p-4">
        {/* Form fields here, using values and handleChange */}
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div className="mb-4">
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
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Are you attending with a guest?</label>
          <select
            name="attendingWithGuest"
            value={values.attendingWithGuest}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        {values.attendingWithGuest === 'Yes' && (
          <div className="mb-4">
            <label className="block text-gray-700">Guest Name</label>
            <input
              type="text"
              name="guestName"
              value={values.guestName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.guestName && <p className="text-red-500 text-sm">{errors.guestName}</p>}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EventRegistrationForm;
