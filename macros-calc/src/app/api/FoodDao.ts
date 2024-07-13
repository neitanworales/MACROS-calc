import { APP_BASE_HREF } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FoodResponse } from "../models/FoodResponse";
import { Utils } from "./Utils";
import { environment } from "src/environments/environment.development";

@Injectable()
export class FoodDao {
    constructor(
        private http: HttpClient,
        private utils: Utils){}

    public getFoodsBase():Observable<FoodResponse>{
        return this.http.get<FoodResponse>('/assets/data/data-food.json', { headers: this.utils.getHeaders() });
    }
}