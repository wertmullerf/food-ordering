import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CheckoutForm } from '../../types/CheckoutForm';
import { InputField } from './InputField';

interface AddressFormProps {
  register: UseFormRegister<CheckoutForm>;
  errors: FieldErrors<CheckoutForm>;
}

export const AddressForm: React.FC<AddressFormProps> = ({ register, errors }) => {
  return (
    <>
      <div className="col-12">
        <h5 className="text-white mt-3 mb-3">Dirección de Entrega</h5>
      </div>
      <div className="col-md-6">
        <InputField
          register={register}
          name="address.calle"
          placeholder="Nombre de la calle (ej: Av. Rivadavia)"
          error={errors.address?.calle}
          required="La calle es requerida"
        />
      </div>
      <div className="col-md-3">
        <InputField
          register={register}
          name="address.altura"
          type="number"
          placeholder="Altura (ej: 1234)"
          error={errors.address?.altura}
          required="La altura es requerida"
        />
      </div>
      <div className="col-md-3">
        <InputField
          register={register}
          name="address.numero"
          type="number"
          placeholder="Número (ej: 4)"
          error={errors.address?.numero}
          required="El número es requerido"
        />
      </div>
    </>
  );
}; 