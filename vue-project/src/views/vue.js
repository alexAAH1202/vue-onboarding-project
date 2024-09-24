<template>
  <div class="user-dashboard">
    <h1>User Dashboard</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="userDetails" class="dashboard-content">
      <h2>Business Details</h2>
      <p><strong>Business Name:</strong> {{ userDetails.businessName }}</p>
      <p><strong>Business Address:</strong> {{ userDetails.businessAddress }}</p>
      <p v-if="userDetails.abn"><strong>ABN:</strong> {{ userDetails.abn }}</p>
      <p v-if="userDetails.acn"><strong>ACN:</strong> {{ userDetails.acn }}</p>

      <div class="subscription-details">
        <h2>Subscription Details</h2>
        <dl>
          <dt>Amount (excl. GST):</dt>
          <dd>${{ userDetails.subscription.amount.toFixed(2) }}</dd>
          <dt>GST:</dt>
          <dd>${{ calculateGST(userDetails.subscription.amount).toFixed(2) }}</dd>
          <dt>Total Amount (incl. GST):</dt>
          <dd>${{ calculateTotal(userDetails.subscription.amount).toFixed(2) }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'UserDashboard',
  data() {
    return {
      loading: true,
      error: null,
    };
  },
  computed: {
    ...mapState({
      userDetails: state => state.user.details,
    }),
  },
  methods: {
    ...mapActions(['fetchUserDetails']),
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
    calculateGST(amount) {
      return amount * 0.1; // 10% GST
    },
    calculateTotal(amount) {
      return amount * 1.1; // Amount + 10% GST
    },
  },
  async created() {
    try {
      await this.fetchUserDetails();
      this.loading = false;
    } catch (err) {
      this.error = 'Failed to load user details. Please try again later.';
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.user-dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-content {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
}

h1, h2 {
  color: #333;
}

p {
  margin-bottom: 10px;
}
</style>
