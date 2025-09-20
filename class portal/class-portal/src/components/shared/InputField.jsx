import React from 'react';

const InputField = ({
  label,
  required = false,
  id,
  type = "text",
  message,
  placeholder,
  register,
  errors,
  ...props
}) => {
  const fieldName = id;
  const hasError = errors && errors[fieldName];
  
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </label>
      <input
        type={type}
        className={`form-control ${hasError ? 'is-invalid' : ''}`}
        id={id}
        placeholder={placeholder}
        {...register(fieldName, {
          required: required ? message : false,
          ...props.validation
        })}
        {...props}
      />
      {hasError && (
        <div className="invalid-feedback">
          {hasError.message}
        </div>
      )}
    </div>
  );
};

export default InputField;
