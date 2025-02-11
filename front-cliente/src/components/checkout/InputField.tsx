import React from 'react';
import { UseFormRegister, FieldError, RegisterOptions } from 'react-hook-form';
import { CheckoutForm } from '../../types/CheckoutForm';

interface InputFieldProps {
  register: UseFormRegister<CheckoutForm>;
  name: any;
  placeholder: string;
  error?: FieldError;
  type?: string;
  required?: string;
  pattern?: RegisterOptions['pattern'];
}

export const InputField: React.FC<InputFieldProps> = ({
  register,
  name,
  placeholder,
  error,
  type = "text",
  required,
  pattern
}) => {
  return (
    <>
      <input
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        {...register(name, { 
          required: required,
          pattern: pattern
        })}
        style={{
          backgroundColor: "var(--dark-surface-2)",
          border: "none",
          color: "var(--text-primary)",
        }}
      />
      {error && (
        <div className="invalid-feedback">{error.message}</div>
      )}
      <style>
        {`
          input::placeholder {
            color: var(--text-secondary) !important;
            opacity: 0.7;
          }
        `}
      </style>
    </>
  );
}; 