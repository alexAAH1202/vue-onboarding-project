<template>
  <form @submit.prevent="submitForm">
    <h2>Sign Up</h2>

    <div>
      <label for="businessName">Business Name:</label>
      <input v-model="businessName" id="businessName" required>
    </div>

    <div>
      <label for="businessAddress">Business Address:</label>
      <input v-model="businessAddress" id="businessAddress" required>
    </div>

    <div>
      <label for="abnAcn">ABN/ACN (if applicable):</label>
      <input v-model="abnAcn" id="abnAcn">
    </div>

    <div>
      <label>Practitioner Tier:</label>
      <select v-model="selectedTier">
        <option v-for="tier in tiers" :key="tier.id" :value="tier.id">
          {{ tier.name }}
        </option>
      </select>
    </div>

    <div>
      <label>Subscription Length:</label>
      <select v-model="subscriptionLength">
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly (10% discount)</option>
      </select>
    </div>

    <div class="price-breakdown">
      <h3>Price Breakdown</h3>
      <p>Base Price: ${{ basePrice.toFixed(2) }}</p>
      <p v-if="subscriptionLength === 'yearly'">Yearly Discount: -${{ yearlyDiscount.toFixed(2) }}</p>
      <p>GST (10%): ${{ gstAmount.toFixed(2) }}</p>
      <p class="total-price">Total Price: ${{ totalPrice.toFixed(2) }} {{ subscriptionLength === 'monthly' ? 'per month' : 'per year' }}</p>
    </div>
    <div v-if="clientSecret">
      <stripe-element-card @change="stripeElementChange" />
    </div>

    <button type="submit" :disabled="!stripe || !elements || !clientSecret || loading">
      {{ loading ? 'Processing...' : 'Pay Now' }}
    </button>

    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </form>
</template>

<script>
import { loadStripe } from '@stripe/stripe-js';
import { StripeElementCard } from '@stripe/vue-stripe';

export default {
  components: {
    StripeElementCard,
  },
  data() {
    return {
      businessName: '',
      businessAddress: '',
      abnAcn: '',
      selectedTier: 1,
      subscriptionLength: 'monthly',
      tiers: [
        { id: 1, name: 'Solo Practitioner', price: 50 },
        { id: 2, name: '2-5 Practitioners', price: 100 },
        { id: 3, name: '6-8 Practitioners', price: 150 },
        { id: 4, name: '9-12 Practitioners', price: 200 },
      ],
      stripe: null,
      elements: null,
      clientSecret: null,
      loading: false,
      errorMessage: '',
    }
  },
  computed: {
    basePrice() {
      const selectedTier = this.tiers.find(tier => tier.id === this.selectedTier)
      return this.subscriptionLength === 'yearly' ? selectedTier.price * 12 : selectedTier.price
    },
    yearlyDiscount() {
      return this.subscriptionLength === 'yearly' ? this.basePrice * 0.1 : 0
    },
    priceBeforeGST() {
      return this.basePrice - this.yearlyDiscount
    },
    gstAmount() {
      return this.priceBeforeGST * 0.1 // 10% GST
    },
    totalPrice() {
      return this.priceBeforeGST + this.gstAmount
    }
  },
  async mounted() {
    this.stripe = await loadStripe('pk_live_51PDj7lGhlvZHGKuwE5G9Ena3SHA4pApRDGB9ZMYjMpnU6s50z9VIxhRlhe0F6alsDeJ0ozyYRroEm7A1Bvf5QAUU00H8VihUTt');
  },
  watch: {
    totalPrice: {
      handler() {
        this.createPaymentIntent();
      },
      immediate: true,
    },
  },
  methods: {
    async createPaymentIntent() {
      try {
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: Math.round(this.totalPrice * 100), // Stripe expects amount in cents
            currency: 'aud',
          }),
        });
        const data = await response.json();
        this.clientSecret = data.clientSecret;
        this.elements = this.stripe.elements();
      } catch (error) {
        console.error('Error creating payment intent:', error);
        this.errorMessage = 'Failed to initialize payment. Please try again.';
      }
    },
    stripeElementChange(event) {
      if (event.error) {
        this.errorMessage = event.error.message;
      } else {
        this.errorMessage = '';
      }
    },
    async submitForm() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const result = await this.stripe.confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.elements.getElement('card'),
            billing_details: {
              name: this.businessName,
              address: {
                line1: this.businessAddress,
              },
            },
          },
        });

        if (result.error) {
          throw new Error(result.error.message);
        }

        // Payment successful, send additional details to your server
        await this.submitAdditionalDetails(result.paymentIntent.id);

        // Handle successful payment (e.g., show success message, redirect)
        console.log('Payment successful');
      } catch (error) {
        console.error('Payment failed:', error);
        this.errorMessage = error.message;
      } finally {
        this.loading = false;
      }
    },
    async submitAdditionalDetails(paymentIntentId) {
      try {
        await fetch('/api/submit-additional-details', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentIntentId,
            businessName: this.businessName,
            businessAddress: this.businessAddress,
            abnAcn: this.abnAcn,
            tier: this.tiers.find(tier => tier.id === this.selectedTier).name,
            subscriptionLength: this.subscriptionLength,
          }),
        });
      } catch (error) {
        console.error('Error submitting additional details:', error);
        // Handle error (e.g., retry submission or notify user)
      }
    },
  },
}
</script>

<style scoped>
form {
  max-width: 500px;
  margin: 0 auto;
  background-color: #f0f8ff; /* Light blue background */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #4b0082; /* Indigo */
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #1e90ff; /* Dodger blue */
  font-weight: bold;
}

div {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #4169e1; /* Royal blue */
  border-radius: 4px;
  background-color: white;
  color: #4b0082; /* Indigo */
}

input:focus, select:focus {
  outline: none;
  border-color: #8a2be2; /* Blue violet */
  box-shadow: 0 0 5px rgba(138, 43, 226, 0.5);
}

button {
  background-color: #4169e1; /* Royal blue */
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #1e90ff; /* Dodger blue */
}

button:disabled {
  background-color: #b0c4de; /* Light steel blue */
  cursor: not-allowed;
}


.price-breakdown {
  background-color: #e6e6fa; /* Lavender */
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.price-breakdown h3 {
  color: #4b0082; /* Indigo */
  margin-top: 0;
}

.total-price {
  font-weight: bold;
  font-size: 1.2em;
  color: #4b0082; /* Indigo */
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
  font-weight: bold;
}

.stripe-element {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #4169e1; /* Royal blue */
  margin-bottom: 20px;
}
</style>
