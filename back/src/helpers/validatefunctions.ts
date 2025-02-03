export function verificarCamposUser(user: any): boolean {
  console.log(user);
  return (
    isStringParam(user.nombre) &&
    isStringParam(user.email) &&
    isStringParam(user.apellido)
  );
}

export function verificarCamposProduct(product: any): boolean {
  return (
    isStringParam(product.nombre) &&
    isNumberParam(product.costo) &&
    isNumberParam(product.stock) &&
    isNumberParam(product.precio)
  );
}

function isStringParam(param: any) {
  return param !== undefined && typeof param === "string";
}

function isNumberParam(param: any) {
  return param !== undefined && typeof param === "number";
}
