export interface CheckoutForm {
  email: string;
  first_name: string;
  last_name: string;
  phone: {
    area_code: string;
    number: string;
  };
  address: {
    calle: string;
    altura: number;
    numero: number;
  };
  identification: {
    type: string;
    number: string;
  };
} 