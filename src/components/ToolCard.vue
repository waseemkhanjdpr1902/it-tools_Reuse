<template>
  <div class="relative group h-full">
    <router-link 
      :to="tool.path"
      class="flex flex-col h-full p-6 bg-white border border-slate-200 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500 group-hover:-translate-y-1"
    >
      <div class="flex justify-between items-start mb-5">
        <div class="p-3 bg-slate-50 rounded-xl group-hover:bg-emerald-50 transition-colors">
          <component 
            :is="tool.icon" 
            class="w-6 h-6 text-slate-500 group-hover:text-emerald-600" 
          />
        </div>
        
        <span 
          v-if="tool.isPro" 
          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase"
        >
          Pro
        </span>
      </div>

      <div class="flex-grow">
        <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-700">
          {{ tool.name }}
        </h3>
        <p class="text-sm text-slate-500 leading-relaxed">
          {{ tool.description }}
        </p>
      </div>

      <div class="mt-6 flex items-center text-sm font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
        <span>Try Tool</span>
        <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </router-link>

    <div 
      v-if="tool.isPro" 
      class="absolute inset-0 bg-white/10 backdrop-blur-[1px] pointer-events-none rounded-2xl border border-transparent"
      title="Professional Subscription Required"
    ></div>
  </div>
</template>

<script setup lang="ts">
// Complete TypeScript Props definition
interface Tool {
  name: string;
  description: string;
  path: string;
  icon: any;
  isPro?: boolean;
}

defineProps<{
  tool: Tool;
}>();
</script>

<style scoped>
/* High-performance transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
