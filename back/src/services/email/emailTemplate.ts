import { BASE_NGROK_URL } from "../../config";
import { IPedidoProducto } from "../../interfaces/IPedidoProducto";

const generarHtmlExitoso = (
  nombre: String | null,
  codigo_de_seguimiento: String,
  productos: IPedidoProducto[]
) => {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>¡Pedido Confirmado!</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f8f9fa;
            }
            
            .email-container {
                max-width: 600px;
                margin: 40px auto;
                background: #fff;
                border-radius: 20px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            }
            
            .email-header {
                background: linear-gradient(45deg, #FF4B2B, #FF416C);
                padding: 40px;
                text-align: center;
            }
            
            .email-header h1 {
                margin: 0;
                color: #fff;
                font-size: 28px;
                font-weight: 700;
                letter-spacing: -0.5px;
            }
            
            .email-body {
                padding: 40px;
            }
            
            .greeting {
                font-size: 18px;
                color: #1a1a1a;
                margin-bottom: 25px;
            }
            
            .tracking-container {
                background-color: #f8f9fa;
                border-radius: 15px;
                padding: 20px;
                margin: 30px 0;
                text-align: center;
            }
            
            .tracking-label {
                color: #6c757d;
                font-size: 14px;
                margin-bottom: 10px;
            }
            
            .tracking-code {
                font-family: 'SF Mono', 'Roboto Mono', monospace;
                font-size: 18px;
                color: #FF4B2B;
                font-weight: 600;
                letter-spacing: 1px;
            }
            
            .products-table {
                width: 100%;
                border-spacing: 0;
                margin: 30px 0;
            }
            
            .products-table th {
                color: #6c757d;
                font-weight: 500;
                font-size: 14px;
                padding: 15px;
                text-align: left;
                border-bottom: 2px solid #f1f3f5;
            }
            
            .products-table td {
                padding: 20px 15px;
                border-bottom: 1px solid #f1f3f5;
                color: #1a1a1a;
            }
            
            .product-name {
                font-weight: 500;
            }
            
            .quantity-badge {
                background-color: #FF4B2B;
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
            }
            
            .price {
                font-weight: 600;
                color: #FF4B2B;
            }
            
            .button-container {
                text-align: center;
                margin-top: 40px;
            }
            
            .button {
                display: inline-block;
                background: linear-gradient(45deg, #FF4B2B, #FF416C);
                color: white;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: 30px;
                font-weight: 600;
                font-size: 16px;
                transition: transform 0.2s;
                box-shadow: 0 4px 15px rgba(255, 75, 43, 0.2);
            }
            
            .total-row td {
                padding-top: 30px;
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                <h1>¡Tu pedido está confirmado! 🎉</h1>
            </div>
            
            <div class="email-body">
                <p class="greeting">¡Hola${!nombre ? "" : " " + nombre}! 👋</p>
                
                <p>Gracias por tu compra. Tu pedido ha sido confirmado y está siendo preparado con mucho cuidado.</p>
                
                <div class="tracking-container">
                    <div class="tracking-label">CÓDIGO DE SEGUIMIENTO</div>
                    <div class="tracking-code">${codigo_de_seguimiento}</div>
                </div>
                
                <table class="products-table">
                    <thead>
                        <tr>
                            <th>PRODUCTO</th>
                            <th>CANTIDAD</th>
                            <th>PRECIO</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productos
                          .map(
                            (producto) => `
                            <tr>
                                <td class="product-name">${producto.nombre}</td>
                                <td><span class="quantity-badge">×${
                                  producto.cantidad
                                }</span></td>
                                <td>$${producto.precio.toFixed(2)}</td>
                                <td class="price">$${(
                                  producto.precio * producto.cantidad
                                ).toFixed(2)}</td>
                            </tr>
                        `
                          )
                          .join("")}
                        <tr class="total-row">
                            <td colspan="3" style="text-align: right; font-weight: 600;">Total</td>
                            <td class="price">$${productos
                              .reduce(
                                (total, producto) =>
                                  total + producto.precio * producto.cantidad,
                                0
                              )
                              .toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="button-container">
                    <a href="http://localhost:5173/pedido/${codigo_de_seguimiento}" class="button">
                        Ver detalles del pedido →
                    </a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const enviarCorreoExitoso = (
  nombre: String | null,
  codigo_de_seguimiento: String,
  productos: IPedidoProducto[]
) => {
  return generarHtmlExitoso(nombre, codigo_de_seguimiento, productos);
  // Código para enviar el correo con la plantilla generada
};
