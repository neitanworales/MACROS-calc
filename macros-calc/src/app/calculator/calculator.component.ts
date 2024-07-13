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

  foodBase! : Food;
  foodCalculated! : Food;

  foodsLista! : Food[];

  dataSource:any;

  searchByName?: string = "";

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  columnsToDisplay = [
    'seleccionar',
    'nombre',
    'cantidad',
    'grasa',
    'carbohidrato',
    'proteina'
  ];

  constructor(private formBuilder: FormBuilder,
    private foodDao: FoodDao
  ){}

  foodForm = this.formBuilder.group({
    nombre: ['', Validators.required],
    base: ['', Validators.required],
    grasa: ['', Validators.required],
    carbo: ['', Validators.required],
    proteina: ['', Validators.required],
    cantidad: ['', Validators.required],
    unidad: [''],
    calcNombre : ['']
  });

  ngOnInit(): void {
    this.loadBaseFood();
    this.foodBase = new Food();
    this.foodCalculated = new  Food();
    this.bloquerControles(false);
  }

  onSubmit(){
    if (this.foodForm?.invalid) {
      return;
    } else {
      this.foodCalculated.nombre = this.foodBase.nombre;
      this.foodCalculated.grasa = (this.foodBase.grasa * this.foodCalculated.cantidad)/this.foodBase.cantidad;
      this.foodCalculated.carbohidrato = (this.foodBase.carbohidrato * this.foodCalculated.cantidad)/this.foodBase.cantidad;
      this.foodCalculated.proteina = (this.foodBase.proteina * this.foodCalculated.cantidad)/this.foodBase.cantidad;
    }
  }

  get form() {
    return this.foodForm?.controls;
  }

  loadBaseFood(){
    this.foodDao.getFoodsBase().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<Food>(result.foods);
        this.dataSource.paginator = this.paginator; 
      }
    );
  }

  seleccionar(selectedFood: Food){
    this.foodBase = selectedFood;
    console.log(this.foodBase);
    this.bloquerControles(true);
  }

  bloquerControles(disable: boolean){
    if(disable){
      this.foodForm.controls['nombre'].disable();
      this.foodForm.controls['base'].disable();
      this.foodForm.controls['unidad'].disable();
      this.foodForm.controls['grasa'].disable();
      this.foodForm.controls['carbo'].disable();
      this.foodForm.controls['proteina'].disable();
    } else {
      this.foodForm.controls['nombre'].enable();
      this.foodForm.controls['base'].enable();
      this.foodForm.controls['unidad'].enable();
      this.foodForm.controls['grasa'].enable();
      this.foodForm.controls['carbo'].enable();
      this.foodForm.controls['proteina'].enable();
    }
  }

  search(){

  }
}
