<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToolStore } from '@/tools/tools.store';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const toolStore = useToolStore();

// Search query — drives the sidebar search filter
const searchQuery = ref('');

// Sidebar collapsed state (mobile support)
const sidebarOpen = ref(true);

// Category icon mapping — each category name → Iconify icon id
const categoryIcons: Record<string, string> = {
  crypto:     'i-tabler-lock',
  converter:  'i-tabler-arrows-exchange',
  web:        'i-tabler-code',
  math:       'i-tabler-math',
  image:      'i-tabler-photo',
  text:       'i-tabler-file-text',
  'date-time': 'i-tabler-clock',
  network:    'i-tabler-network',
  data:       'i-tabler-binary',
  'os-cli':   'i-tabler-terminal-2',
};

// Category color mapping — drives sidebar dot + card icon bg
const categoryColors: Record<string, string> = {
  crypto:      'bg-purple-50 text-purple-600',
  converter:   'bg-amber-50  text-amber-600',
  web:         'bg-blue-50   text-blue-600',
  math:        'bg-green-50  text-green-600',
  image:       'bg-pink-50   text-pink-600',
  text:        'bg-teal-50   text-teal-600',
  'date-time': 'bg-coral-50  text-coral-600',
  network:     'bg-blue-50   text-blue-600',
  data:        'bg-amber-50  text-amber-600',
  'os-cli':    'bg-gray-100  text-gray-600',
};

// Current active category slug
const activeCategory = computed(() => {
  const meta = route.meta as Record<string, string>;
  return meta?.category ?? '';
});

// All categories derived from the store
const categories = computed(() => toolStore.toolsByCategory ?? []);

// Filtered tools for search
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return [];
  const q = searchQuery.value.toLowerCase();
  return toolStore.tools.filter(
    t =>
      t.name.toLowerCase().includes(q) ||
      t.description?.toLowerCase().includes(q) ||
      t.keywords?.some(k => k.toLowerCase().includes(q)),
  );
});

const isSearching = computed(() => searchQuery.value.trim().length > 0);
</script>

<template>
  <!-- ── Full-height shell ───────────────────────────────────────────────── -->
  <div class="flex flex-col h-screen overflow-hidden bg-gray-50 dark:bg-dark-200">

    <!-- ══════════════════════════════════════════════════════════════════════
         TOP BAR
    ═══════════════════════════════════════════════════════════════════════ -->
    <header
      class="
        h-13 flex items-center px-4 gap-3 flex-shrink-0 z-50
        bg-purple-500 shadow-md shadow-purple-900/20
      "
    >
      <!-- Hamburger (mobile) -->
      <button
        class="topbar-btn text-white/80 hover:text-white md:hidden"
        @click="sidebarOpen = !sidebarOpen"
        aria-label="Toggle sidebar"
      >
        <div class="i-tabler-menu-2 text-xl" />
      </button>

      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 text-white no-underline select-none">
        <div class="i-tabler-tools text-xl" />
        <span class="text-base font-semibold tracking-tight">IT Tools</span>
      </router-link>

      <!-- Search bar -->
      <div
        class="
          flex-1 max-w-md h-8 flex items-center gap-2 px-3
          bg-white/15 border border-solid border-white/25 rounded-lg
          text-white/70 text-sm
        "
      >
        <div class="i-tabler-search text-base flex-shrink-0" />
        <input
          v-model="searchQuery"
          class="
            flex-1 bg-transparent border-none outline-none
            text-white placeholder-white/50 text-sm
          "
          :placeholder="t('home.searchPlaceholder', 'Search 120+ tools…')"
        />
        <button
          v-if="searchQuery"
          class="i-tabler-x text-base cursor-pointer hover:text-white"
          @click="searchQuery = ''"
        />
      </div>

      <!-- Right side actions -->
      <div class="ml-auto flex items-center gap-2">
        <!-- Upgrade button -->
        <button
          class="topbar-btn bg-amber-500 hover:bg-amber-400 text-white gap-1"
        >
          <div class="i-tabler-star text-sm" />
          <span class="hidden sm:inline">Upgrade</span>
        </button>

        <!-- Dark mode toggle -->
        <n-button
          circle
          quaternary
          class="!text-white/70 hover:!text-white"
          @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'"
        >
          <template #icon>
            <div class="i-tabler-moon dark:i-tabler-sun text-base" />
          </template>
        </n-button>

        <!-- Avatar placeholder -->
        <div
          class="
            w-8 h-8 rounded-full bg-white/20 flex items-center justify-center
            text-white text-xs font-semibold cursor-pointer
            hover:bg-white/30 transition-colors
          "
        >
          <div class="i-tabler-user text-base" />
        </div>
      </div>
    </header>

    <!-- ══════════════════════════════════════════════════════════════════════
         BODY  =  SIDEBAR  +  MAIN CONTENT
    ═══════════════════════════════════════════════════════════════════════ -->
    <div class="flex flex-1 overflow-hidden">

      <!-- ── SIDEBAR ────────────────────────────────────────────────────── -->
      <aside
        :class="[
          'flex-shrink-0 flex flex-col overflow-y-auto z-40 transition-all duration-200',
          'bg-purple-900',
          sidebarOpen ? 'w-52' : 'w-0 overflow-hidden',
          'md:w-52',
        ]"
        style="scrollbar-width: none;"
      >
        <!-- ── Static nav links ── -->
        <div class="nav-section">{{ t('home.menu', 'Menu') }}</div>

        <router-link to="/" custom v-slot="{ navigate, isActive }">
          <div :class="isActive ? 'nav-item-active' : 'nav-item'" @click="navigate">
            <div class="i-tabler-layout-grid text-base" />
            <span>{{ t('home.allTools', 'All tools') }}</span>
          </div>
        </router-link>

        <router-link to="/favourites" custom v-slot="{ navigate, isActive }">
          <div :class="isActive ? 'nav-item-active' : 'nav-item'" @click="navigate">
            <div class="i-tabler-heart text-base" />
            <span>{{ t('home.favourites', 'Favourites') }}</span>
            <div v-if="toolStore.favoriteTools.length" class="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />
          </div>
        </router-link>

        <div class="nav-item">
          <div class="i-tabler-sparkles text-base" />
          <span>{{ t('home.newTools', 'New tools') }}</span>
          <div v-if="toolStore.newTools.length" class="ml-auto w-1.5 h-1.5 rounded-full bg-purple-300" />
        </div>

        <!-- ── Categories ── -->
        <div class="nav-section">{{ t('home.categories', 'Categories') }}</div>

        <template v-for="category in categories" :key="category.name">
          <router-link
            :to="`/#${category.name}`"
            custom
            v-slot="{ navigate }"
          >
            <div
              :class="activeCategory === category.name ? 'nav-item-active' : 'nav-item'"
              @click="navigate"
            >
              <div :class="[categoryIcons[category.name] ?? 'i-tabler-tool', 'text-base']" />
              <span class="truncate">{{ category.name }}</span>
            </div>
          </router-link>
        </template>

        <!-- ── Footer links ── -->
        <div class="nav-section mt-auto">{{ t('home.account', 'Account') }}</div>

        <router-link to="/about" custom v-slot="{ navigate, isActive }">
          <div :class="isActive ? 'nav-item-active' : 'nav-item'" @click="navigate">
            <div class="i-tabler-info-circle text-base" />
            <span>{{ t('home.about', 'About') }}</span>
          </div>
        </router-link>

        <div class="nav-item mb-4">
          <div class="i-tabler-settings text-base" />
          <span>{{ t('home.settings', 'Settings') }}</span>
        </div>
      </aside>

      <!-- ── MAIN CONTENT ──────────────────────────────────────────────── -->
      <main class="flex-1 overflow-y-auto">
        <!-- Search results overlay -->
        <div v-if="isSearching" class="p-4">
          <p class="text-sm text-gray-500 mb-3">
            {{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }}
            for "<strong>{{ searchQuery }}</strong>"
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <router-link
              v-for="tool in searchResults"
              :key="tool.name"
              :to="tool.path"
              class="tool-card no-underline"
            >
              <div :class="['tool-icon', categoryColors[tool.category ?? ''] ?? 'bg-gray-100 text-gray-600']">
                <div :class="[tool.icon, 'text-base']" />
              </div>
              <p class="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{{ tool.name }}</p>
              <p class="text-xs text-gray-500 leading-snug mt-0.5 line-clamp-2">{{ tool.description }}</p>
            </router-link>
          </div>
        </div>

        <!-- Normal slot content (Home.page.vue / tool pages) -->
        <slot v-else />
      </main>

    </div>
  </div>
</template>

<style scoped>
/* Hide scrollbar on sidebar */
aside::-webkit-scrollbar { display: none; }

/* Smooth sidebar transition on mobile */
aside { transition: width 0.2s ease; }

/* Input caret colour inside purple topbar */
input { caret-color: white; }
</style>
