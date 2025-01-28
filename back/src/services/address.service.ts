import Direccion from "../models/Direccion";

export async function crearDireccion(data: any): Promise<string> {
  const dir = await Direccion.findOne({
    calle: data.calle,
    altura: data.altura,
    numero: data.numero,
    piso: data.piso,
  });
  if (dir) {
    return dir._id as string;
  }
  const direccion = new Direccion(data);
  await direccion.save();
  return direccion._id as string;
}
