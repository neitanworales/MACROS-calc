import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Food } from '../models/Food';
import { FoodDao } from '../api/FoodDao';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  providers: [DatePipe]
})
export class CalculatorComponent implements OnInit {
  foodBase!: Food;
  foodCalculated!: Food;
  foodsLista!: Food[];
  dataSource: any;
  searchByName?: string = "";
  nuevo!: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  columnsToDisplay = [
    'seleccionar',
    'nombre',
    'marca',
    'cantidad',
    'grasa',
    'carbohidrato',
    'proteina'
  ];

  constructor(private formBuilder: FormBuilder,
    private foodDao: FoodDao
  ) { }

  foodForm = this.formBuilder.group({
    buscador: [''],
    nombre: ['', Validators.required],
    base: ['', Validators.required],
    grasa: ['', Validators.required],
    carbo: ['', Validators.required],
    proteina: ['', Validators.required],
    cantidad: ['', Validators.required],
    unidad: [''],
    calcNombre: [''],
    calcMarca: [''],
    marca: ['']
  });

  ngOnInit(): void {
    this.loadBaseFood();
    this.foodBase = new Food();
    this.foodCalculated = new Food();
    this.bloquerControles(false);
    this.nuevo = false;
  }

  onSubmit() {
    if (this.foodForm?.invalid) {
      return;
    } else {
      this.foodCalculated = this.foodDao.calcular(this.foodBase,this.foodCalculated);
    }
  }

  get form() {
    return this.foodForm?.controls;
  }

  loadBaseFood() {
    this.foodDao.getFoodsBase().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<Food>(result.food);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  seleccionar(selectedFood: Food) {
    this.foodBase = selectedFood;
    this.bloquerControles(true);
  }

  bloquerControles(disable: boolean) {
    if (disable) {
      this.foodForm.controls['nombre'].disable();
      this.foodForm.controls['marca'].disable();
      this.foodForm.controls['base'].disable();
      this.foodForm.controls['unidad'].disable();
      this.foodForm.controls['grasa'].disable();
      this.foodForm.controls['carbo'].disable();
      this.foodForm.controls['proteina'].disable();
    } else {
      this.foodForm.controls['nombre'].enable();
      this.foodForm.controls['marca'].enable();
      this.foodForm.controls['base'].enable();
      this.foodForm.controls['unidad'].enable();
      this.foodForm.controls['grasa'].enable();
      this.foodForm.controls['carbo'].enable();
      this.foodForm.controls['proteina'].enable();
    }
  }

  search(event: any) {
    if (event.target.value.length > 2) {
      this.foodDao.getSearch(event.target.value).subscribe(
        result => {
          this.dataSource = new MatTableDataSource<Food>(result.food);
          this.dataSource.paginator = this.paginator;
        }
      );
    } if (event.target.value.length == 0) {
      this.loadBaseFood();
    }
  }

  activarFormNuevo() {
    if (this.nuevo) { 
      this.foodForm.controls['cantidad'].setValidators([Validators.required]);
      this.foodForm.controls['cantidad'].updateValueAndValidity();
      this.nuevo = false;
    }
    else {
      this.bloquerControles(false);
      this.foodBase = new Food();
      this.foodForm.controls['cantidad'].setValidators([]);
      this.foodForm.controls['cantidad'].updateValueAndValidity();
      this.nuevo = true;
    }
  }

  guardar() {
    if (this.nuevo) {
      if (!this.foodForm?.invalid) {
        console.log(this.foodBase);
        this.foodDao.guardar(this.foodBase).subscribe(
          response => {
          this.foodForm.controls['cantidad'].setValidators([Validators.required]);
          this.foodForm.controls['cantidad'].updateValueAndValidity();
          this.nuevo = false;
          this.searchByName = "";
          this.loadBaseFood();
        });
      } else {
        console.log('form invalid');
      }
    } else {
      console.log('necesita poner nuevo');
    }
  }
}
