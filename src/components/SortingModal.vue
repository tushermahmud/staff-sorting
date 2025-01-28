<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'start', count: number): void;
}>();

const peopleCount = ref(20);
const error = ref('');

watch(peopleCount, (newValue) => {
  if (newValue < 20) {
    error.value = 'Minimum number of people is 20';
  } else if (newValue > 100) {
    error.value = 'Maximum number of people is 100';
  } else {
    error.value = '';
  }
});

const handleStart = () => {
  if (peopleCount.value >= 20 && peopleCount.value <= 100) {
    emit('start', peopleCount.value);
  }
};

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-md mx-4">
      <div>
        <div class="flex justify-between items-center mb-2 px-6 pt-6">
          <h2 class="text-xl font-bold">How many people?</h2>
          <button @click="handleClose" class="text-gray-400 hover:text-gray-600">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <hr class="border border-b border-gray-200 my-5"/>
        <p class="text-gray-600 mb-4 px-6">
          Enter a number of how many people you want to add to the list (20-100).
        </p>
        <div class="px-6">
          <input
            type="number"
            v-model="peopleCount"
            min="20"
            max="100"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent"
          />
          
          <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
        </div>
        
        <hr class="border border-b border-gray-200 mt-7 mb-5"/>

        <div class="flex justify-end gap-3 mt-8 px-6 pb-6">
          <button
            @click="handleClose"
            class="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="handleStart"
            :disabled="!!error"
            :class="[
              'px-6 py-2 rounded-lg text-white transition-colors',
              error ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FF8A00] hover:bg-[#e67c00]'
            ]"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  </div>
</template>