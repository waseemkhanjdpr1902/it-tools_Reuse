<template>
  <div class="p-6 max-w-7xl mx-auto">
    <header class="text-center mb-16 pt-10">
      <h1 class="text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
        Professional Utility Suite
      </h1>
      <p class="text-lg text-slate-600 max-w-2xl mx-auto">
        High-performance tools for tax practitioners, developers, and researchers.
      </p>
    </header>

    <div v-for="category in categories" :key="category.name" class="mb-12">
      <h2 class="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
        <component :is="category.icon" class="w-6 h-6 text-primary-600" />
        {{ category.name }}
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <router-link 
          v-for="tool in category.tools" 
          :key="tool.name" 
          :to="tool.path"
          class="group p-6 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-500 transition-all duration-300 flex flex-col h-full"
        >
          <div class="mb-4 p-3 bg-slate-50 rounded-xl group-hover:bg-primary-50 transition-colors w-fit">
            <component :is="tool.icon" class="w-6 h-6 text-slate-400 group-hover:text-primary-600" />
          </div>
          <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-700">
            {{ tool.name }}
          </h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            {{ tool.description }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShieldCheck, FileCode, Calculator, LayoutGrid } from 'lucide-vue-next';

const categories = [
  {
    name: 'Compliance & Finance',
    icon: ShieldCheck,
    tools: [
      { name: 'GSTIN Search', description: 'Verify business details and status.', path: '/gst-search', icon: ShieldCheck },
      { name: 'PAN Validator', description: 'Validate PAN card checksums.', path: '/pan-validator', icon: Calculator }
    ]
  },
  {
    name: 'IT & Development',
    icon: FileCode,
    tools: [
      { name: 'JSON Formatter', description: 'Beautify and validate JSON.', path: '/json-formatter', icon: FileCode },
      { name: 'Hash Generator', description: 'Generate MD5, SHA1, SHA256.', path: '/hash-generator', icon: LayoutGrid }
    ]
  }
];
</script>
