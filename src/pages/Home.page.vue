<template>
  <div class="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
          Advanced Utility Dashboard
        </h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          Secure, client-side tools for tax professionals and developers. 
          Marked tools require a <span class="text-emerald-600 font-bold">Pro Subscription</span>.
        </p>
      </div>

      <div v-for="category in categories" :key="category.name" class="mb-12">
        <div class="flex items-center mb-6 space-x-3">
          <div class="p-2 bg-emerald-100 rounded-lg">
            <component :is="category.icon" class="w-6 h-6 text-emerald-700" />
          </div>
          <h2 class="text-2xl font-bold text-slate-800">{{ category.name }}</h2>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ToolCard 
            v-for="tool in category.tools" 
            :key="tool.name" 
            :tool="tool" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToolCard from '@/components/ToolCard.vue';
import { 
  LayoutGrid, 
  ShieldCheck, 
  FileCode, 
  Calculator 
} from 'lucide-vue-next';

// This acts as your database. Add 'isPro: true' to lock a tool.
const categories = ref([
  {
    name: 'Compliance & Tax',
    icon: ShieldCheck,
    tools: [
      { 
        name: 'GSTIN Validator', 
        description: 'Verify Indian GSTIN authenticity and business status.', 
        path: '/gst-validator', 
        icon: ShieldCheck,
        isPro: true 
      },
      { 
        name: 'PAN Verification', 
        description: 'Validate PAN card formats and checksums.', 
        path: '/pan-checker', 
        icon: LayoutGrid,
        isPro: false 
      },
    ]
  },
  {
    name: 'Developer Utilities',
    icon: FileCode,
    tools: [
      { 
        name: 'JSON Formatter', 
        description: 'Clean and beautify complex JSON structures.', 
        path: '/json-format', 
        icon: FileCode,
        isPro: false 
      },
      { 
        name: 'SQL Generator', 
        description: 'Generate SQL queries from JSON objects.', 
        path: '/sql-gen', 
        icon: Calculator,
        isPro: true 
      },
    ]
  }
]);
</script>
