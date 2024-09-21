<template>
  <form @submit.prevent="submitForm">
    <div>
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="form.email">
      <div v-if="v$.form.email.$error" class="error">
        {{ v$.form.email.$errors[0].$message }}
      </div>
    </div>

    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="form.password">
      <div v-if="v$.form.password.$error" class="error">
        {{ v$.form.password.$errors[0].$message }}
      </div>
    </div>

    <div>
      <label for="businessName">Business Name:</label>
      <input type="text" id="businessName" v-model="form.businessName">
      <div v-if="v$.form.businessName.$error" class="error">
        {{ v$.form.businessName.$errors[0].$message }}
      </div>
    </div>

    <div>
      <label for="businessAddress">Business Address:</label>
      <input type="text" id="businessAddress" v-model="form.businessAddress">
      <div v-if="v$.form.businessAddress.$error" class="error">
        {{ v$.form.businessAddress.$errors[0].$message }}
      </div>
    </div>

    <div>
      <label for="abnAcn">ABN/ACN:</label>
      <input type="text" id="abnAcn" v-model="form.abnAcn">
      <div v-if="v$.form.abnAcn.$error" class="error">
        {{ v$.form.abnAcn.$errors[0].$message }}
      </div>
    </div>

    <div>
      <label for="creditCard">Credit Card Number:</label>
      <input type="text" id="creditCard" v-model="form.creditCard">
      <div v-if="v$.form.creditCard.$error" class="error">
        {{ v$.form.creditCard.$errors[0].$message }}
      </div>
    </div>

    <button type="submit">Sign Up</button>
  </form>
</template>

<script>
import { reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

export default {
  setup() {
    const form = reactive({
      email: '',
      password: '',
      businessName: '',
      businessAddress: '',
      abnAcn: '',
      creditCard: ''
    })

    const rules = {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(8) },
        businessName: { required },
        businessAddress: { required },
        abnAcn: { 
          required,
          validAbnAcn: helpers.regex(/^(\d{9}|\d{11})$/)
        },
        creditCard: { 
          required,
          validCreditCard: helpers.regex(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/)
        }
      }
    }

    const v$ = useVuelidate(rules, { form })

    const submitForm = async () => {
      const result = await v$.value.$validate()
      if (result) {
        // Form is valid, proceed with submission
        console.log('Form submitted:', form)
      } else {
        console.log('Form has errors')
      }
    }

    return { form, v$, submitForm }
  }
}
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.8em;
}
</style>
