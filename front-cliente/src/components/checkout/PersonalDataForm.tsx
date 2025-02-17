import React from "react";
import { UseFormRegister, FieldErrors, FieldError } from "react-hook-form";
import { CheckoutForm } from "../../types/CheckoutForm";
import { InputField } from "./InputField";

interface PersonalDataFormProps {
  register: UseFormRegister<CheckoutForm>;
  errors: FieldErrors<CheckoutForm>;
}

export const PersonalDataForm: React.FC<PersonalDataFormProps> = ({
  register,
  errors,
}) => {
  return (
    <>
      <div className="col-12">
        <h5 className="text-white mb-3">Datos Personales</h5>
      </div>
      <div className="col-md-6">
        <InputField
          register={register}
          name="first_name"
          placeholder="Nombre (ej: Juan)"
          error={errors.first_name}
          required="El nombre es requerido"
        />
      </div>
      <div className="col-md-6">
        <InputField
          register={register}
          name="last_name"
          placeholder="Apellido (ej: Pérez)"
          error={errors.last_name}
          required="El apellido es requerido"
        />
      </div>
      <div className="col-md-6">
        <InputField
          register={register}
          name="email"
          type="email"
          placeholder="Email (ej: juan@ejemplo.com)"
          error={errors.email}
          required="El email es requerido"
          pattern={{
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email inválido",
          }}
        />
      </div>
      <div className="col-md-3">
        <InputField
          register={register}
          name="phone.area_code"
          placeholder="Código de área (ej: 11)"
          error={errors.phone?.area_code}
          required="El código de área es requerido"
        />
      </div>
      <div className="col-md-3">
        <InputField
          register={register}
          name="phone.number"
          placeholder="Número (ej: 12345678)"
          error={errors.phone?.number}
          required="El número es requerido"
        />
      </div>
      <div className="col-md-6">
        <select
          className="form-select"
          style={{
            backgroundColor: "var(--dark-surface-2)",
            border: "none",
            color: "var(--text-primary)",
          }}
        >
          <option value="dni">DNI</option>
          <option value="dnu">DNU</option>
          <option value="otro">OTRO</option>
        </select>
      </div>
      <div className="col-md-6">
        <InputField
          register={register}
          name="identification.number"
          placeholder="Número de documento (ej: 12345678)"
          error={errors.identification?.number}
          required="El número de documento es requerido"
        />
      </div>
    </>
  );
};
