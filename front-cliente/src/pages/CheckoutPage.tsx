import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useForm } from "react-hook-form";
import { CheckoutForm } from "../types/CheckoutForm";
import { PersonalDataForm } from "../components/checkout/PersonalDataForm";
import { AddressForm } from "../components/checkout/AddressForm";

const CheckoutPage: React.FC = () => {
  const { carrito, totalCarrito } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  const onSubmit = async (data: CheckoutForm) => {
    setIsLoading(true);
    try {
      const payloadData = {
        payerData: {
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          phone: {
            area_code: data.phone.area_code,
            number: data.phone.number,
          },
          address: {
            calle: data.address.calle,
            altura: parseInt(data.address.altura.toString()),
            numero: parseInt(data.address.numero.toString()),
          },
          identification: {
            type: data.identification.type,
            number: data.identification.number,
          },
        },
        items: carrito.map((item) => ({
          producto_id: item._id,
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
          personalizaciones: {
            extras: item.personalizaciones?.extras || [],
            removidos: item.personalizaciones?.removidos || [],
          },
        })),
        total: totalCarrito,
      };

      const response = await fetch("http://localhost:3000/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payloadData),
        credentials: "include",
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.url) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      window.location.href = responseData.url;
    } catch (error) {
      console.error("Error completo:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Error de conexión con el servidor"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 py-4"
      style={{ backgroundColor: "var(--dark-bg)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div
              className="p-4 rounded-4"
              style={{ backgroundColor: "var(--dark-surface)" }}
            >
              <h2 className="text-white mb-4">Finalizar Compra</h2>

              <div className="mb-3">
                <h4 className="text-white">
                  Total a pagar: ${totalCarrito.toFixed(2)}
                </h4>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row g-3">
                  <PersonalDataForm register={register} errors={errors} />
                  <AddressForm register={register} errors={errors} />

                  <div className="col-12 mt-4">
                    <button
                      type="submit"
                      className="btn btn-lg w-100"
                      disabled={isLoading}
                      style={{
                        backgroundColor: "var(--accent-color)",
                        color: "white",
                        border: "none",
                        borderRadius: "50px",
                      }}
                    >
                      {isLoading ? (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : null}
                      Proceder al Pago (${totalCarrito.toFixed(2)})
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
