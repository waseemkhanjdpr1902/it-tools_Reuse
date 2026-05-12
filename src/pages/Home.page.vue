<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <header class="text-center mb-12">
      <h1 class="text-4xl font-extrabold text-slate-900 mb-4">
        Professional Utility Suite
      </h1>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto">
        70+ powerful tools for tax practitioners, developers, and educators. 
        Secure, fast, and 100% private.
      </p>
    </header>

    <div v-for="category in categories" :key="category.name" class="mb-10">
      <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <component :is="category.icon" class="w-5 h-5 text-emerald-600" />
        {{ category.name }}
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <ToolCard 
          v-for="tool in category.tools" 
          :key="tool.name" 
          :tool="tool" 
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ToolCard from '@/components/ToolCard.vue';
// Import your icons here (assuming Lucide or Heroicons)
</script>
