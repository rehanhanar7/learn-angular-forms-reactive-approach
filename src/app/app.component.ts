import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  signUpForm: FormGroup;

  restrictedUsers = ['rehan', 'admin', 'hello'];

  restrictedEmails = ['test@test', 'admin@admin', 'rehan@rehan'];

  ngOnInit() {
    /**
     * Creating Reactive Form Object
     */
    this.signUpForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        this.restrictUsers,
      ]),
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        [this.asyncEmailValidator]
      ),
      gender: new FormControl('male', []),
      acadamics: new FormGroup({
        education: new FormControl(null),
        marks: new FormControl(null, Validators.required),
      }),
      hobbies: new FormArray([]),
    });
  }

  /**
   * Angular ngSubmit overriding regular form submit
   */
  onSubmitData() {
    console.log('Submit Data');
    console.log(this.signUpForm);
  }

  /**
   * Form Array
   */
  onAddHobby() {
    let hobbiesarray = <FormArray>this.signUpForm.get('hobbies');
    const hobby = new FormControl('Hello', Validators.required);
    hobbiesarray.push(hobby);
  }

  /**
   * Custom Validator
   */
  restrictUsers = (control: FormControl): { [key: string]: boolean } => {
    if (this.restrictedUsers.indexOf(control.value) != -1) {
      return { restrictedUser: true };
    }
    return null;
  };

  /**
   * Custom Async Validator
   */
  asyncEmailValidator = (
    control: FormControl
  ): Promise<any> | Observable<any> => {
    const fetchemailspromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.restrictedEmails.indexOf(control.value) != -1) {
          resolve({ isrestrictedEmail: true });
        }
        resolve(null);
      }, 1500);
    });

    return fetchemailspromise;
  };

  /**
   * Set Random Value
   */
  setRandomEducation() {
    this.signUpForm.patchValue({
      acadamics: {
        education: 'rehan here',
      },
    });
  }

  /**
   * clearEverything
   */
  clearEverything() {
    this.signUpForm.reset({
      gender: 'male', // reset radio button
    });
  }
}

/**
 * -- Agenda of the code --
 * 1. Create a normal form in html
 * 2. Create Reactive Form Object
 * 3. Synchronize the Form Object with html
 * 4. Add Validators & Validator message
 * 5. Submit the form and see the output
 * 6. Group Form elements in ts and html file
 * 7. Create Form array
 * 8. Create & Synchronize Custom Validator
 * 9. Create & Synchronize Async Validator
 * 10. Using state and value changes
 * 11. Set & Patch Values
 */
