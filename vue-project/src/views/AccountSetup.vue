<template>
    <div class="account-setup">
      <h1>Account Setup</h1>
      <SignUpForm />
    </div>
  </template>
  
  <script>
  import SignUpForm from '@/components/SignUpForm.vue'
  
  export default {
    components: {
    PageLayout
  },
    name: 'AccountSetup',
    components: {
      SignUpForm
    }
  }
  </script>
  