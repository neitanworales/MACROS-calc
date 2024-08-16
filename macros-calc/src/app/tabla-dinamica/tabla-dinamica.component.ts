import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FoodDao } from '../api/FoodDao';
import { Food } from '../models/Food';
import { MatTableDataSource } from '@angular/material/table';
import { FoodRow } from '../models/FoodsRow';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tabla-dinamica',
  templateUrl: './tabla-dinamica.component.html',
  styleUrls: ['./tabla-dinamica.component.css']
})
export class TablaDinamicaComponent implements OnInit {
  datalistOptionsArray?: Food[];
  foodSelected?: Food;
  foods?: FoodRow[];
  dataSource: any;
  currentProduct: string = "";
  expandedFoodRow!: FoodRow;

  grasas: number = 0;
  carbos: number = 0;
  protei: number = 0;

  FOODS = "foods";

  constructor(private formBuilder: FormBuilder,
    private foodDao: FoodDao,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.foods = new Array();
    let foodos = JSON.parse(localStorage.getItem(this.FOODS)!);
    if(foodos !== null && foodos !== undefined){
      this.foods = foodos;
    }
    console.log(this.foods);
    this.dataSource = new MatTableDataSource<FoodRow>(this.foods);
    this.changeDetectorRefs.detectChanges();
    this.sumar();
  }

  columnsToDisplay = [
    'nombre',
    'cantidad',
    'grasa',
    'carbohidrato',
    'proteina',
    'controles'
  ];

  foodForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    cantidad: ['', Validators.required],
  });

  search(event: any) {
    if (event.target.value.length > 2) {
      this.foodDao.getSearch(event.target.value).subscribe(
        result => {
          this.datalistOptionsArray = [];
          result.food.forEach(f => {
            this.datalistOptionsArray?.push(f);
          });
        }
      );
    } else {
      this.datalistOptionsArray = [];
    }
  }

  seleccionar(f: Food) {
    this.foodSelected = f;
  }

  getSelectedProductByName(selectedName: string): Food {
    return this.datalistOptionsArray!.find(f => f.nombre === selectedName)!;
  }

  onSubmit() {
    var foodRow = new FoodRow();
    foodRow.selected = this.foodSelected;

    var foodCalculated = new Food();
    foodCalculated.cantidad = Number(this.foodForm.get('cantidad')?.value);

    this.foodDao.calcular(this.foodSelected!, foodCalculated);

    foodRow.calculated = foodCalculated;

    this.foods?.push(foodRow);
    this.dataSource = new MatTableDataSource<FoodRow>(this.foods);
    this.changeDetectorRefs.detectChanges();
    this.sumar();
    this.guardarLS();
  }

  remover(foodRow: FoodRow) {
    const index = this.foods?.indexOf(foodRow, 0);
    if (index! > -1) {
      this.foods?.splice(index!, 1);
      this.dataSource = new MatTableDataSource<FoodRow>(this.foods);
      this.changeDetectorRefs.detectChanges();
      this.sumar();
      this.guardarLS();
    }
  }

  onReset() {
    this.foodSelected = undefined;
    this.datalistOptionsArray = [];
    this.foodForm.reset();
  }

  sumar() {
    this.grasas = 0;
    this.carbos = 0;
    this.protei = 0;
    this.foods?.forEach((f) => {
      this.grasas += f.calculated?.grasa!;
      this.carbos += f.calculated?.carbohidrato!;
      this.protei += f.calculated?.proteina!;
    });
  }

  guardarLS() {
    let json = JSON.stringify(this.foods!);
    console.log(json);
    localStorage.setItem(this.FOODS, json);
  }
}
