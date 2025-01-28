<script setup lang="ts">
import { ref, computed } from 'vue';
import { faker } from '@faker-js/faker';
import type { User } from '../types/user';
import SortingModal from './SortingModal.vue';
import draggable from 'vuedraggable';

const users = ref<User[]>([]);
const selectedUsers = ref<Set<number>>(new Set());
const isModalOpen = ref(false);
const isGameActive = ref(false);
const showSuccess = ref(false);

const toggleSelection = (userId: number) => {
  if (selectedUsers.value.has(userId)) {
    selectedUsers.value.delete(userId);
  } else {
    selectedUsers.value.add(userId);
  }
};

const generateUsers = (count: number) => {
  const newUsers: User[] = [];
  const potatoes = Array.from({ length: count }, (_, i) => i + 1)
    .sort(() => Math.random() - 0.5);

  for (let i = 0; i < count; i++) {
    newUsers.push({
      id: i + 1,
      email: faker.internet.email(),
      potatoes: potatoes[i],
      tags: ['Customers'],
      fullName: faker.person.fullName(),
      location: 'Lithuania',
      year: 2017,
    });
  }

  return newUsers;
};

const isSorted = computed(() => {
  if (!isGameActive.value) return false;
  
  for (let i = 1; i < users.value.length; i++) {
    if (users.value[i - 1].potatoes < users.value[i].potatoes) {
      return false;
    }
  }
  return true;
});

const handleStartSorting = (count: number) => {
  users.value = generateUsers(count);
  isModalOpen.value = false;
  isGameActive.value = true;
  showSuccess.value = false;
};

const handleDragEnd = () => {
  if (isSorted.value) {
    showSuccess.value = true;
  }
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm">
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">Sorting Training System</h1>
        <div class="flex items-center gap-4">
          <button 
            @click="isModalOpen = true"
            class="bg-[#FF8A00] text-white w-[161px] h-[50px] text-[15px] hover:bg-[#e67c00] transition-colors"
          >
            Start sorting!
          </button>
        </div>
      </div>

      <!-- Success Message -->
      <div 
        v-if="showSuccess" 
        class="mb-6 p-4 bg-green-100 text-green-700 rounded-lg"
      >
        Congratulations! You've completed the sorting!
      </div>

      <div class="bg-white shadow-[2px_2px_4px_4px_rgba(0,0,0,0.25)] rounded-md">
        <div class="p-4 border-b border-gray-200 flex justify-end">
          <span class="text-sm text-black font-bold">{{ users.length }} people in the list</span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-200">
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Email</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Potatoes</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Tags</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Full name</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Location</th>
                <th class="px-6 py-4 text-left text-sm font-medium text-gray-500">Year</th>
              </tr>
            </thead>
            <draggable
              v-model="users"
              tag="tbody"
              item-key="id"
              handle=".drag-handle"
              @end="handleDragEnd"
            >
              <template #item="{ element: user }">
                <tr 
                  class="border-b border-gray-200 hover:bg-gray-50 group cursor-move drag-handle"
                >
               
                 
                  <td class="px-6 py-4 text-sm text-gray-900 border-r border-gray-200 relative flex gap-2 items-center">
                    <input
                      type="checkbox"
                      :checked="selectedUsers.has(user.id)"
                      @change="toggleSelection(user.id)"
                      class="w-4 h-4 rounded border-gray-300 text-[#FF8A00] focus:ring-[#FF8A00] accent-[#bf7b2d]"
                    >
                    <div class="flex items-center">
                      {{ user.email }}
                      <svg class="w-4 h-4 text-gray-400 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ user.potatoes }}</td>
                  <td class="px-6 py-4">
                    <div class="flex gap-1">
                      <span
                        v-for="tag in user.tags"
                        :key="tag"
                        class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                      >
                        {{ tag }}
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ user.fullName }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ user.location }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900">{{ user.year }}</td>
                </tr>
              </template>
            </draggable>
          </table>
        </div>
      </div>
    </div>

    <SortingModal
      :is-open="isModalOpen"
      @close="isModalOpen = false"
      @start="handleStartSorting"
    />
  </div>
</template>