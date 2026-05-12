<script setup lang="ts">
import { computed, ref } from 'vue';
import { useHead } from '@vueuse/head';
import ToolCard from '../components/ToolCard.vue';
import { useToolStore } from '@/tools/tools.store';
import { useI18n } from 'vue-i18n';

const toolStore = useToolStore();
const { t } = useI18n();

useHead({ title: 'IT Tools — Handy online tools for developers' });

const favoriteTools = computed(() => toolStore.favoriteTools);
const newTools      = computed(() => toolStore.newTools);

function onUpdateFavoriteTools() {
  toolStore.updateFavoriteTools(favoriteTools.value);
}

const upgradeDismissed = ref(false);
</script>

<template>
  <div class="px-5 py-5 max-w-7xl mx-auto">

    <!-- ── Upgrade / Pro banner ─────────────────────────────────────────── -->
    <div
      v-if="!upgradeDismissed"
      class="
        flex items-center gap-3 mb-6 p-4 rounded-xl
        bg-purple-500 text-white
      "
    >
      <div class="i-tabler-crown text-2xl opacity-90 flex-shrink-0" />
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium leading-tight">Unlock Pro — 50+ premium tools, zero ads</p>
        <p class="text-xs opacity-75 mt-0.5">Powered by Razorpay · ₹199/month or ₹1,799/year</p>
      </div>
      <button
        class="
          flex-shrink-0 px-4 h-8 rounded-lg text-xs font-medium
          bg-white/20 hover:bg-white/30 border border-solid border-white/30
          text-white cursor-pointer transition-colors
        "
      >
        Try free →
      </button>
      <button
        class="i-tabler-x text-lg opacity-60 hover:opacity-100 cursor-pointer bg-transparent border-none text-white flex-shrink-0"
        @click="upgradeDismissed = true"
        aria-label="Dismiss"
      />
    </div>

    <!-- ── Favourite tools ──────────────────────────────────────────────── -->
    <section v-if="favoriteTools.length > 0" class="mb-8">
      <div class="flex items-center gap-2 mb-3">
        <div class="i-tabler-heart text-base text-amber-500" />
        <h2 class="text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ t('home.favouriteTools', 'Your favourites') }}
        </h2>
      </div>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <ToolCard
          v-for="tool in favoriteTools"
          :key="tool.name"
          :tool="tool"
        />
      </div>
    </section>

    <!-- ── New tools ────────────────────────────────────────────────────── -->
    <section v-if="newTools.length > 0" class="mb-8">
      <div class="flex items-center gap-2 mb-3">
        <div class="i-tabler-sparkles text-base text-purple-500" />
        <h2 class="text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ t('home.newTools', 'New tools') }}
        </h2>
      </div>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <ToolCard
          v-for="tool in newTools"
          :key="tool.name"
          :tool="tool"
        />
      </div>
    </section>

    <!-- ── All tools by category ────────────────────────────────────────── -->
    <section
      v-for="category in toolStore.toolsByCategory"
      :key="category.name"
      class="mb-8"
      :id="category.name"
    >
      <div class="flex items-center gap-2 mb-3">
        <div class="i-tabler-folder text-base text-gray-400" />
        <h2 class="text-sm font-medium text-gray-500 dark:text-gray-400 capitalize">
          {{ category.name }}
        </h2>
        <span class="text-xs text-gray-300 dark:text-gray-600">
          {{ category.components.length }}
        </span>
      </div>

      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        <ToolCard
          v-for="tool in category.components"
          :key="tool.name"
          :tool="tool"
        />
      </div>
    </section>

    <!-- ── Empty state ──────────────────────────────────────────────────── -->
    <div
      v-if="toolStore.toolsByCategory.length === 0"
      class="flex flex-col items-center justify-center py-24 text-center"
    >
      <div class="i-tabler-tools-off text-5xl text-gray-200 mb-3" />
      <p class="text-gray-400 text-sm">No tools found.</p>
    </div>

  </div>
</template>
