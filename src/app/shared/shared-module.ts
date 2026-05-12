import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    Footer,
    Header,
  ],
  exports: [
    CommonModule,

    Footer,
    Header,
  ]
})
export class SharedModule { }
