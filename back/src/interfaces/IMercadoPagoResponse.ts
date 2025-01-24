import { MercadoPagoEstatus } from "../enums/MercadoPagoEstatus";

export interface IMercadoPagoResponse {
  accounts_info: null;
  acquirer_reconciliation: any[];
  additional_info: {
    ip_address: string;
    items: { [key: string]: any }[];
    tracking_id: string;
  };
  authorization_code: string;
  binary_mode: boolean;
  brand_id: null;
  build_version: string;
  call_for_authorize_id: null;
  captured: boolean;
  card: {
    cardholder: {
      identification: {
        number: string | null;
        type: string | null;
      };
      name: string | null;
    };
    country: string | null;
    date_created: string | null;
    date_last_updated: string | null;
    expiration_month: number | null;
    expiration_year: number | null;
    first_six_digits: string | null;
    id: string | null;
    last_four_digits: string;
    tags: any[];
  };
  charges_details: {
    accounts: { [key: string]: any };
    amounts: { [key: string]: any };
    client_id: number;
    date_created: string;
    id: string;
    last_updated: string;
    metadata: { [key: string]: any };
    name: string;
    refund_charges: any[];
    reserve_id: null;
    type: string;
  }[];
  charges_execution_info: {
    internal_execution: {
      date: string;
      execution_id: string;
    };
  };
  collector_id: number;
  corporation_id: null;
  counter_currency: null;
  coupon_amount: number;
  currency_id: string;
  date_approved: string | null;
  date_created: string;
  date_last_updated: string;
  date_of_expiration: string | null;
  deduction_schema: null;
  description: string;
  differential_pricing_id: null;
  external_reference: string | null;
  fee_details: any[];
  financing_group: null;
  id: number;
  installments: number;
  integrator_id: null;
  issuer_id: string;
  live_mode: boolean;
  marketplace_owner: null;
  merchant_account_id: null;
  merchant_number: null;
  metadata: { [key: string]: any };
  money_release_date: string | null;
  money_release_schema: null;
  money_release_status: string;
  notification_url: string;
  operation_type: string;
  order: {
    id: string;
    type: string;
  };
  payer: {
    identification: {
      number: string | null;
      type: string | null;
    };
    entity_type: string | null;
    phone: {
      number: string | null;
      extension: string | null;
      area_code: string | null;
    };
    last_name: string | null;
    id: string;
    type: string | null;
    first_name: string | null;
    email: string;
  };
  payment_method: {
    data: {
      routing_data: { [key: string]: any };
    };
    id: string;
    issuer_id: string;
    type: string;
  };
  payment_method_id: string;
  payment_type_id: string;
  platform_id: null;
  point_of_interaction: {
    business_info: {
      branch: string;
      sub_unit: string;
      unit: string;
    };
    transaction_data: {
      e2e_id: string | null;
    };
    type: string;
  };
  pos_id: null;
  processing_mode: string;
  refunds: any[];
  release_info: null;
  shipping_amount: number;
  sponsor_id: null;
  statement_descriptor: string;
  status: MercadoPagoEstatus;
  status_detail: string;
  store_id: null;
  tags: string | null;
  taxes_amount: number;
  transaction_amount: number;
  transaction_amount_refunded: number;
  transaction_details: {
    acquirer_reference: string | null;
    external_resource_url: string | null;
    financial_institution: string | null;
    installment_amount: number;
    net_received_amount: number;
    overpaid_amount: number;
    payable_deferral_period: string | null;
    payment_method_reference_id: string | null;
    total_paid_amount: number;
  };
}
