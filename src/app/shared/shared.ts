import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { ThemeToggle } from './components/theme-toggle/theme-toggle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    Footer,
    Header,
  ],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    Footer,
    Header,
  ]
  
})
export class SharedModule { }
