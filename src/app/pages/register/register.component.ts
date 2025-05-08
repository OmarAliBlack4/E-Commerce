import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { Message, MessageService } from 'primeng/api';
import { IRegister } from '../../core/interfaces/iregister';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    ToastModule,
    RippleModule,
    NgxSpinnerModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService]
})
export class RegisterComponent {

// propirity
  userName! : FormControl;
  email!:FormControl;
  password!:FormControl;
  rePassword!:FormControl;
  registertionForm!:FormGroup;
  messages!: Message[] ;

// Constructor
  constructor(private _AuthService: AuthService ,
    private messageService: MessageService,
    private _ngxSpinnerService : NgxSpinnerService,
    private _router : Router){

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
    if(this.registertionForm.valid){
      console.log(this.registertionForm.value);
      this.registerApi(this.registertionForm.value);
    }else{
      this.registertionForm.markAllAsTouched();
      Object.keys(this.registertionForm.controls).forEach((c)=>
      this.registertionForm.controls[c].markAsDirty());
    }
  }


  //registerApi
  registerApi(data: IRegister): void {
    this._ngxSpinnerService.show();
    this._AuthService.register(data).subscribe({
      next: (res) => {
        if(res.user.id) {
          this.show("success","Success" ,"Success register");
        }
        this._ngxSpinnerService.hide();
        this._router.navigate(['/']);
      },
      error: (error) => {
        this.show("error","Error" ,error.error.error);
        this._ngxSpinnerService.hide();
      },
    });
  }


  //notification
  show(se : string , su : string , de:string) {
    this.messageService.add({ severity:se, summary: su, detail: de });
  }
}
