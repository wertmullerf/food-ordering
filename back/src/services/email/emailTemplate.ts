const generarHtmlExitoso = (
  nombre: String | null,
  codigo_de_seguimiento: String
) => {
  return `     <!DOCTYPE html>
          <html lang="es">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Confirmación de Compra</title>
              <style>
                  body {
                      font-family: Arial, sans-serif;
                      background-color: #f4f4f4;
                      margin: 0;
                      padding: 0;
                  }
                  .email-container {
                      width: 100%;
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #fff;
                      padding: 20px;
                      border-radius: 8px;
                      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  }
                  .email-header {
                      text-align: center;
                      margin-bottom: 20px;
                  }
                  .email-header h1 {
                      color: #333;
                  }
                  .email-body {
                      margin-bottom: 20px;
                      font-size: 16px;
                      color: #555;
                  }
                  .button {
                      display: inline-block;
                      background-color: #007BFF;
                      color: #fff;
                      text-decoration: none;
                      padding: 12px 20px;
                      border-radius: 5px;
                      text-align: center;
                  }
                  .button:hover {
                      background-color: #0056b3;
                  }
              </style>
          </head>
          <body>
              <div class="email-container">
                  <div class="email-header">
                      <h1>Gracias por tu compra, ${!nombre ? " " : nombre}</h1>
                  </div>
                  <div class="email-body">
                      <p>Hola,${!nombre ? " " : nombre},</p>
                      <p>Gracias por tu compra en nuestra tienda. Tu pedido está siendo procesado. El código de seguimiento de tu compra es:</p>
                      <p><strong>${codigo_de_seguimiento}</strong></p>
                      <p>Puedes hacer clic en el siguiente botón para ver más detalles sobre el estado de tu envío:</p>
                      <a href="#" class="button">Ver mi pedido</a>
                  </div>
              </div>
          </body>
          </html>
      `;
};

export const enviarCorreoExitoso = (
  nombre: String | null,
  codigo_de_seguimiento: String
) => {
  return generarHtmlExitoso(nombre, codigo_de_seguimiento);
  // Código para enviar el correo con la plantilla generada
};
