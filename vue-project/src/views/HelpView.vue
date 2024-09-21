<template>
  <PageLayout title="Help">
    <section aria-labelledby="faq-heading">
      <h2 id="faq-heading">Frequently Asked Questions</h2>
      <dl>
        <div v-for="item in faqItems" :key="item.id">
          <dt>{{ item.question }}</dt>
          <dd>{{ item.answer }}</dd>
        </div>
      </dl>
    </section>
    <section aria-labelledby="support-heading">
      <h2 id="support-heading">Support Information</h2>
      <p>For additional support, please contact us at:</p>
      <ul>
        <li>Email: support@example.com</li>
        <li>Phone: 1-800-123-4567</li>
      </ul>
    </section>
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
      faqItems: [
        {
          id: 1,
          question: 'What is your return policy?',
          answer: 'We offer a 30-day money-back guarantee on all our products.'
        },
        // Add more FAQ items as needed
      ]
    }
  }
}
</script>

<style scoped>
dl {
  margin-bottom: 20px;
}

dt {
  font-weight: bold;
  margin-top: 10px;
}

dd {
  margin-left: 20px;
}
</style>
