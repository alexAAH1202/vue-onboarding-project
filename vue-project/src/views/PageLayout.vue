<template>
  <div class="page-layout">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <!-- Add common footer content -->
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.page-layout {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Add responsive styles here */
@media (max-width: 768px) {
  .page-layout {
    padding: 10px;
  }
}
</style>
