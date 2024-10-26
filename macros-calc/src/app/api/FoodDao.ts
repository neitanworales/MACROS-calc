import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FoodResponse } from "../models/FoodResponse";
import { Utils } from "./Utils";
import { environment } from "src/environments/environment.development";
import { Food } from "../models/Food";

@Injectable()
export class FoodDao {
    constructor(
        private http: HttpClient,
        private utils: Utils){}

    public getFoodsBase():Observable<FoodResponse> {
        return this.http.get<FoodResponse>(environment.apiUrl+'/food/', { headers: this.utils.getHeaders() });
    }

    public getSearch(text: string):Observable<FoodResponse> {
        return this.http.get<FoodResponse>(environment.apiUrl+'/food/search.php?text='+text, { headers: this.utils.getHeaders() });
    }

    public guardar(food: Food):Observable<FoodResponse> {
        return this.http.post<FoodResponse>(environment.apiUrl+'/food/', food, { headers: this.utils.getHeaders() });
    }

    public calcular(foodBase: Food, foodCalculated: Food):Food {
        foodCalculated.nombre = foodBase.nombre;
        foodCalculated.marca = foodBase.marca;
        foodCalculated.unidad = foodBase.unidad;
        foodCalculated.grasa = (foodBase.grasa * foodCalculated.cantidad) / foodBase.cantidad;
        foodCalculated.carbohidrato = (foodBase.carbohidrato * foodCalculated.cantidad) / foodBase.cantidad;
        foodCalculated.proteina = (foodBase.proteina * foodCalculated.cantidad) / foodBase.cantidad;
        return foodCalculated;
    }
}