import { client } from "../server";
import { Response } from "express";

export const obtenerInfoRedis = async (res: Response, name: string) => {
  const reply = await client.get(name);
  return reply ? JSON.parse(reply) : null;
};

export const saveResult = async (data: any, name: string) => {
  await client.set(name, JSON.stringify(data), {
    EX: 900,
  });
};
