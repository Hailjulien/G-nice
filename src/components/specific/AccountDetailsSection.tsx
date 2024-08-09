import React, { useState } from 'react';

interface AccountDetailsSectionProps {
  formData: {
    username: string;
    phoneNumber: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignup: () => void;
  prevStep: () => void;
}

const AccountDetailsSection: React.FC<AccountDetailsSectionProps> = ({
  formData,
  handleInputChange,
  handleSignup,
  prevStep,
}) => {
  const [errors, setErrors] = useState({
    username: '',
    phoneNumber: '',
    password: '',
  });

  const validate = (): boolean => {
    let valid: boolean = true;
    const newErrors = {username: '', phoneNumber: '', password: ''};
    /**Username validation */
    if(formData.username.length < 3){
        newErrors.username = "Username must contain at least 3 characters."
        valid = false;
    }
    /**Phone number validation */
    if(!/^\d+$/.test(formData.phoneNumber)){
        newErrors.phoneNumber = 'Phone number must contain only numbers.';
        valid = false;
    }

    /**Password validation */
    if(formData.password.length < 8){
        newErrors.password = "Password must be at least 8 characters long.";
        valid = false;
    }
    setErrors(newErrors);
    return valid
  };

  const handleFormSubmit = () => {
    if (validate()) {
      handleSignup();
    }
  };

  return (
    <div className="w-full md:max-w-full p-8 bg-white rounded-lg shadow-md md:w-2/5 md:mx-auto md:my-16 h-screen md:h-full flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs bg-white text-black"
          />
          {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            pattern="[0-9]{10}"
            className="input input-bordered w-full max-w-xs bg-white text-black"
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input input-bordered w-full max-w-xs bg-white text-black"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={prevStep}
            className="py-3 px-6 bg-gray-500 text-white rounded-full hover:bg-gray-700"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleFormSubmit}
            className="py-3 px-6 bg-[#6A00F4] text-white rounded-full hover:bg-[#4e00b3]"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsSection;
