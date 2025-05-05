import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

// propirity
  userName! : FormControl;
  email!:FormControl;
  password!:FormControl;
  rePassword!:FormControl;
  registertionForm!:FormGroup;


// Constructor
  constructor(){
    this.initFormControls();
    this.initFormGroup();
  }

// Methods
//initial form Controls method
  initFormControls():void {
    this.userName = new FormControl('',[Validators.required , Validators.minLength(3)]);
    this.email = new FormControl('',[Validators.required , Validators.email]);
    this.password = new FormControl('',[Validators.required]);
    this.rePassword = new FormControl('',[Validators.required , this.passwordMatch(this.password)]);
  }

//initial form Group method
  initFormGroup() : void{
    this.registertionForm = new FormGroup(({
      userName : this.userName,
      email : this.email,
      password : this.password,
      rePassword : this.rePassword
    }))
  }

// Password Match Methoud
  passwordMatch(pass: AbstractControl) : ValidatorFn{
    return(repass: AbstractControl) : null | {[Key : string]:boolean} =>{
      if (pass.value !== repass.value) {
        return {passNotMatch : true}
      }else{
        return null
      }
    }
  }

//Submit Method
  submit():void{
    console.log(this.registertionForm.value);
  }
}
