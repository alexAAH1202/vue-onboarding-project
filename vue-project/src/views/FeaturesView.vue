<template>
  <PageLayout title="Features">
    <ul class="feature-list">
      <li v-for="feature in features" :key="feature.id">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.description }}</p>
      </li>
    </ul>
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
      features: [
        { id: 1, title: 'Feature 1', description: 'Description of feature 1' },
        { id: 2, title: 'Feature 2', description: 'Description of feature 2' },
        // Add more features as needed
      ]
    }
  }
}
</script>

<style scoped>
.feature-list {
  list-style-type: none;
  padding: 0;
}

.feature-list li {
  margin-bottom: 20px;
}
</style>
