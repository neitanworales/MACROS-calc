import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Utils } from './api/Utils';
import { FoodDao } from './api/FoodDao';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { TablaDinamicaComponent } from './tabla-dinamica/tabla-dinamica.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    FooterComponent,
    HeaderComponent,
    TablaDinamicaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatAutocompleteModule
  ],
  providers: [
    Utils,
    FoodDao
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
