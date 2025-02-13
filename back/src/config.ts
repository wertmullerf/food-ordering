// URLs y Puertos
export const PORT = process.env.PORT || 3000;
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
export const JWT_SECRET = process.env.JWT_SECRET;
export const BASE_NGROK_URL =
  process.env.BASE_NGROK_URL || "https://17e2-152-169-122-128.ngrok-free.app";
// Configuración de CORS
export const CORS_ORIGINS = [FRONTEND_URL, "http://192.168.0.61:5173"];

// Configuración de Email
export const MAILER_SERVICE = process.env.MAILER_SERVICE || "gmail";
export const MAILER_EMAIL =
  process.env.MAILER_EMAIL || "foodorderingsystem2025@gmail.com";
export const MAILER_SECRET_KEY =
  process.env.MAILER_SECRET_KEY || "aotbcedaeqgzhwza";

// Configuración de MercadoPago
export const ACCESS_TOKEN = process.env.ACCESS_TOKEN || "";

// URLs para tracking de pedidos
export const getTrackingUrl = (codigo: string) =>
  `${FRONTEND_URL}/pedido/${codigo}`;
