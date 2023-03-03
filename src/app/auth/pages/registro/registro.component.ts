import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import {
  emailPattern,
  indvalle,
  nombreApellidoPatter,
} from 'src/app/shared/validator/validaciones';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
})
export class RegistroComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private emailValidator: EmailValidatorService
  ) {}

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Jonatan Guillen',
      email: 'test1@test.com',
      username: 'Joguisa98',
      password: '123456',
      password2: '123456',
    });
  }

  // indvalle(control: FormControl) {
  //   const valor: string = control.value?.trim().toLowerCase();
  //   if (valor === 'miki') {
  //     return {
  //       noMiki: false,
  //     };
  //   }
  //   return null;
  // };

  miFormulario: FormGroup = this.fb.group(
    {
      nombre: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.nombreApellidoPatter),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorService.emailPattern),
        ],
        [this.emailValidator],
      ],
      username: ['', [Validators.required, this.validatorService.indvalle]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [
        this.validatorService.camposIguales('password', 'password2'),
      ],
    }
  );

  //emailErrorMsg: string = '';

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']) {
      return 'El correro es obligatorio';
    } else if (errors?.['pattern']) {
      return 'El correo no cumple con el formato';
    } else if (errors?.['emailTomado']) {
      return 'El correo ya esta registrado';
    } else {
      return '';
    }
  }

  campoEsValido(campo: string) {
    // return (
    //   this.miFormulario.controls[campo].errors &&
    //   this.miFormulario.controls[campo].touched
    // );
    //Otra forma de hacerlo
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  // Antiguas validaciones para el email
  // emailRequerid() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.['required'] &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }

  // emailFormato() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.['pattern'] &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }

  // emailRegistrado() {
  //   return (
  //     this.miFormulario.get('email')?.errors?.['emailTomado'] &&
  //     this.miFormulario.get('email')?.touched
  //   );
  // }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
}
