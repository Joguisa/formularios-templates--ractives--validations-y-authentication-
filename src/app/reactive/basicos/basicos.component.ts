import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
})
export class BasicosComponent implements OnInit {
  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 2080ti'),
  //   precio: new FormControl(1000),
  //   existencias: new FormControl(5),
  // });
  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.minLength(0)]],
    existencias: [, [Validators.required, Validators.minLength(0)]],
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.miFormulario.setValue({
      nombre: 'RTX 4080ti',
      precio: 1200,
      existencias: 15,
    });
  }

  campoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}
