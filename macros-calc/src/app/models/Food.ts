import { Unidad } from "./Unidad";

export class Food {
    nombre!: string;
    cantidad!: number;
    unidad!: Unidad;
    grasa: number = 0;
    carbohidrato: number = 0;
    proteina: number = 0;
    marca!: string;
}