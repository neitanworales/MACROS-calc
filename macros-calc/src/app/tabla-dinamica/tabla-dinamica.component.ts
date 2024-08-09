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

  constructor(private formBuilder: FormBuilder,
    private foodDao: FoodDao,
    private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.foods = new Array();
  }

  columnsToDisplay = [
    'nombre',
    'marca',
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
    }
  }

  onProductChanged(event: any) {
    var productName = event.target.value
    this.foodSelected = this.getSelectedProductByName(productName);
  }

  getSelectedProductByName(selectedName: string): Food {
    return this.datalistOptionsArray!.find(f => f.nombre === selectedName)!;
  }

  onSubmit() {
    console.log(this.foodSelected);
    var foodRow = new FoodRow();
    foodRow.selected = this.foodSelected;

    var foodCalculated = new Food();
    foodCalculated.cantidad = Number(this.foodForm.get('cantidad')?.value);

    this.foodDao.calcular(this.foodSelected!, foodCalculated);

    foodRow.calculated = foodCalculated;

    this.foods?.push(foodRow);

    console.log("selected : " + foodRow.selected?.nombre);
    console.log("calculated : " + foodRow.calculated.cantidad);

    console.log(this.foods?.length);
    this.dataSource = new MatTableDataSource<FoodRow>(this.foods);
    this.changeDetectorRefs.detectChanges();
  }

  remover(foodRow: FoodRow) {
    const index = this.foods?.indexOf(foodRow, 0);
    if (index! > -1) {
      this.foods?.splice(index!, 1);
      this.dataSource = new MatTableDataSource<FoodRow>(this.foods);
      this.changeDetectorRefs.detectChanges();
    }
  }

  onReset() {
    this.foodSelected = undefined;
  }
}
