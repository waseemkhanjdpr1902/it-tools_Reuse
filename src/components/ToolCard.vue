<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Tool } from '@/tools/tools.types';
import { useToolStore } from '@/tools/tools.store';

const props = defineProps<{
  tool: Tool;
}>();

const router  = useRouter();
const toolStore = useToolStore();

// ── Category → icon background + text colour ──────────────────────────────
const categoryColorMap: Record<string, { bg: string; text: string }> = {
  crypto:      { bg: '#EEEDFE', text: '#534AB7' },
  converter:   { bg: '#FAEEDA', text: '#854F0B' },
  web:         { bg: '#E6F1FB', text: '#185FA5' },
  math:        { bg: '#EAF3DE', text: '#3B6D11' },
  image:       { bg: '#FBEAF0', text: '#993556' },
  text:        { bg: '#E1F5EE', text: '#0F6E56' },
  'date-time': { bg: '#FAECE7', text: '#993C1D' },
  network:     { bg: '#E6F1FB', text: '#185FA5' },
  data:        { bg: '#FAEEDA', text: '#854F0B' },
  'os-cli':    { bg: '#F1EFE8', text: '#5F5E5A' },
};

const iconStyle = computed(() => {
  const cat = props.tool.category ?? '';
  const color = categoryColorMap[cat] ?? { bg: '#F1EFE8', text: '#5F5E5A' };
  return {
    backgroundColor: color.bg,
    color:           color.text,
  };
});

const isFavourite = computed(() =>
  toolStore.isToolFavourite(props.tool),
);

function toggleFavourite(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  toolStore.toggleFavouriteTool(props.tool);
}

function navigate() {
  router.push(props.tool.path);
}
</script>

<template>
  <div
    class="
      group relative
      bg-white dark:bg-dark-100
      border border-solid border-gray-100 dark:border-dark-50
      rounded-xl p-3 cursor-pointer
      transition-all duration-150
      hover:(border-purple-300 shadow shadow-purple-100 dark:shadow-purple-900/20)
      flex flex-col
    "
    @click="navigate"
    :title="tool.description"
  >
    <!-- Favourite toggle — top-right corner, visible on hover -->
    <button
      class="
        absolute top-2 right-2 p-1 rounded-md
        text-gray-300 hover:text-amber-400
        opacity-0 group-hover:opacity-100
        transition-all duration-150
        bg-transparent border-none cursor-pointer
      "
      :class="isFavourite ? '!opacity-100 !text-amber-400' : ''"
      @click.stop="toggleFavourite"
      :aria-label="isFavourite ? 'Remove from favourites' : 'Add to favourites'"
    >
      <div :class="isFavourite ? 'i-tabler-heart-filled' : 'i-tabler-heart'" class="text-base" />
    </button>

    <!-- Coloured icon box -->
    <div
      class="w-9 h-9 rounded-lg flex items-center justify-center text-lg mb-2 flex-shrink-0"
      :style="iconStyle"
    >
      <div :class="[tool.icon, 'text-base']" />
    </div>

    <!-- Tool name -->
    <p class="text-sm font-medium text-gray-800 dark:text-gray-100 truncate leading-tight">
      {{ tool.name }}
    </p>

    <!-- Description -->
    <p
      v-if="tool.description"
      class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 leading-snug line-clamp-2"
    >
      {{ tool.description }}
    </p>

    <!-- NEW badge -->
    <span
      v-if="toolStore.isNewTool(tool)"
      class="
        inline-block mt-2 self-start
        text-[10px] font-medium px-2 py-0.5 rounded-full
        bg-green-50 text-green-600
        dark:bg-green-900/30 dark:text-green-400
      "
    >
      New
    </span>
  </div>
</template>
