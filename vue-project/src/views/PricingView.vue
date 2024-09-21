<template>
  <PageLayout title="Pricing">
    <div class="pricing-tiers">
      <div v-for="tier in pricingTiers" :key="tier.id" class="pricing-tier">
        <h2>{{ tier.name }}</h2>
        <p class="price">{{ tier.price }}</p>
        <ul>
          <li v-for="feature in tier.features" :key="feature">{{ feature }}</li>
        </ul>
        <button class="cta">Choose Plan</button>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import PageLayout from '@/components/PageLayout.vue'

export default {
  components: {
    PageLayout
  },
  data() {
    return {
      pricingTiers: [
        {
          id: 1,
          name: 'Basic',
          price: '$9.99/month',
          features: ['Feature 1', 'Feature 2', 'Feature 3']
        },
        // Add more pricing tiers as needed
      ]
    }
  }
}
</script>

<style scoped>
.pricing-tiers {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.pricing-tier {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 10px;
  width: 300px;
}

.price {
  font-size: 1.5em;
  font-weight: bold;
}

.cta {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

/* Add more styles for responsiveness */
</style>
