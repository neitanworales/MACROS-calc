import { DefaultResponse } from "./DefaultResponse";
import { Food } from "./Food";

export class FoodResponse extends DefaultResponse {
    food!: Food[]
}