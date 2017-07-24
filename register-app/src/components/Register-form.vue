<template>
  <div class="container">
    <headerComponent></headerComponent>
    <div id="pageHeader" class="row pageColor">
      <div class="col-8">
        <span>Register account</span>
      </div>
    </div>
    <div id="pageBody">
      <div id="paragraphsContent" class="grid-container">
        <div class="row mobile-reverseParent">
          <div class="col-4 mobile-reverse">
            <span class="textColorGreen fontSize">Apply in just 10 minutes</span><br/><br/>
            <p>
              It's quick and easy to apply for a business loan. We just need a few details before we can make a loan decision.
            </p>
          </div>
          <div class="col-4 mobile-reverse">
            <span class="logo mobile-logo"><img src="../assets/css/images/trust-logo.png" height="55"
                                    width="150"/></span> <span class="logo mobile-logo"><img
            src="../assets/css/images/norton-logo.png" height="63" width="103"/></span>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <p>
              To start the process we need you to first register to create a Customer Account. If you would more about how we collect and use your data, please see our <a
              href="" class="textColorOrange">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
      <div class="pageColor">
        <div class="row">
          <div class="col-2 mobile-formLegendCol tablet-formLegendCol">
            <legend class="textColorGreen fontSize mobile-formLegend tablet-formLegend" id="formLegend">Your details</legend>
            <br/>
          </div>
          <div class="col-6">
            <span class="formStyle mobile-formStyle tablet-formStyle">
              <label class="labelsText mobile-labelsText">Email address </label> <input type="email" id="email" v-model="email" class="mobile-input"><br/>
              <span v-if="errors.email[0]">
               <p v-for="error in errors.email" class="danger">{{error}}</p>
             </span>
              <label class="labelsText mobile-labelsText">Password </label> <input type="password" id="password" v-model="password" class="mobile-input"><button id="passwordBtn" class="showBtn textColorOrange mobile-showBtn" @mouseover="showPass('password')" @mouseleave="hidePass('password')">Show</button><br/>
              <span v-if="errors.password[0]">
                <p v-for="error in errors.password" class="danger">{{error}}</p>
              </span>
              <label class="labelsText mobile-labelsText">Confirm Password </label> <input type="password" id="confirmPassword" class="mobile-input"
                                                      v-model="confirmPassword"><button id="confirmPasswordBtn" class="showBtn textColorOrange mobile-showBtn" @mouseover="showPass('confirmPassword')" @mouseleave="hidePass('confirmPassword')">Show</button><br/>
              <span v-if="errors.confirmPassword[0]">
                 <p v-for="error in errors.confirmPassword" class="danger">{{error}}</p>
               </span>
              <label class="labelsText mobile-labelsText">Mobile Number </label> <input type="text" id="mobileNumber">
              <button id="authentication" class="pageColor textColorOrange btnSize mobile-authBtn">Send authentication code</button>
              <br/>
              <span id="turnover"><input type="checkbox" id="annualTurnover" v-model="turnover"><label for="annualTurnover"><span></span>Your business has an annual turnover of <strong>at least £100,000.</strong></label>
              <p v-if="!turnover && showTurnOverError" class="danger">You must agree with the annual turnover first</p></span><br/>
              <button @click="submitForm()" class="btnSize" id="submitBtn">Submit</button>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div id="pageFooter" class="row">
      <div class="col-8"></div>
    </div>
  </div>
</template>

<script>
  import headerComponent from './_shared/Header.vue'
  import validate from 'validate.js'
  import liveValidate from '../services/live-validate/index.js'

  export default {
    name: 'registerForm',
    components: {
      'headerComponent': headerComponent
    },
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        turnover: false,
        showTurnOverError: false,
        constraints: {
          email: {
            presence: true,
            email: true,
            length: {maximum: 100}
          },
          password: {
            presence: true
          },
          confirmPassword: {
            presence: true,
            equality: 'password'
          }
        },
        errors: {
          email: [],
          password: [],
          confirmPassword: []
        }
      }
    },
    watch: {
      email (val) {
        liveValidate(this.email, 'email', this.constraints, this.errors)
        this.highlightTheInputDuringError('email')
      },
      password (val) {
        liveValidate(this.password, 'password', this.constraints, this.errors)
        this.confirmPasswordLiveValidation(val, this.confirmPassword)
        this.highlightTheInputDuringError('password')
        this.highlightTheInputDuringError('confirmPassword')
      },
      confirmPassword (val) {
        this.confirmPasswordLiveValidation(val, this.password)
        this.highlightTheInputDuringError('confirmPassword')
      }
    },
    methods: {
      showPass (inputId) {
        document.getElementById(inputId).type = 'text'
      },
      hidePass (inputId) {
        document.getElementById(inputId).type = 'password'
      },
      highlightTheInputDuringError (inputId) {
        let isError = false

        for (let propertyName in this.errors) {
          if (propertyName === inputId && this.errors[propertyName].length > 0) {
            isError = true
          }
        }

        if (isError) {
          if (inputId === 'password' || inputId === 'confirmPassword') {
            let showButtonsId = inputId + 'Btn'
            let width = screen.width
            let height = screen.height
            console.log(width)
            console.log(height)
            setTimeout(function () {
              document.getElementById(showButtonsId).style.borderBottom = '1px solid red'
              document.getElementById(showButtonsId).style.borderTop = '1px solid red'
              document.getElementById(showButtonsId).style.borderRight = '1px solid red'
              document.getElementById(showButtonsId).style.borderLeft = 'none'
              document.getElementById(inputId).style.borderRight = 'none'
              document.getElementById(inputId).style.height = '43px'
            }, 5)
          }
          setTimeout(function () {
            document.getElementById(inputId).style.border = '1px solid red'
          }, 1)
        } else {
          if (inputId === 'password' || inputId === 'confirmPassword') {
            let showButtonsId = inputId + 'Btn'
            document.getElementById(showButtonsId).style.border = 'none'
            document.getElementById(showButtonsId).style.borderBottom = '3px solid lightgrey'
            document.getElementById(inputId).style.height = '42px'
          }
          document.getElementById(inputId).style.border = 'none'
          document.getElementById(inputId).style.borderBottom = '3px solid lightgrey'
        }
      },
      confirmPasswordLiveValidation (value, equalityValue) {
        liveValidate(this.confirmPassword, 'confirmPassword', this.constraints, this.errors)

        if (value === equalityValue) {
          for (let propertyName in this.errors) {
            if (propertyName === 'confirmPassword') {
              this.errors[propertyName] = []
            }
          }
        }
      },
      submitForm () {
        let errors = validate({
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        }, this.constraints)

        for (let propertyName in this.errors) {
          this.errors[propertyName] = []
        }

        if (errors) {
          for (let propertyName in errors) {
            this.errors[propertyName] = errors[propertyName]
            this.highlightTheInputDuringError(propertyName)
          }
          this.showTurnOverError = true
          console.log('The details you have entered are not valid!')
          return
        }

        let isSubmited = true

        for (let propertyName in this.errors) {
          if (this.errors[propertyName].length > 0) {
            isSubmited = false
            this.showTurnOverError = true
          }
        }

        if (isSubmited && this.turnover) {
          console.log('The form submited successfully!')
        } else {
          this.showTurnOverError = true
        }
      }
    }
  }
</script>

