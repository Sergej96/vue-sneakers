<script setup lang="ts">

interface Props {
    title: string;
    description: string;
    image: string;
}

defineProps<Props>()</script>

<template>
    <div class="flex flex-col items-center justify-center mt-8 max-w-72 mx-auto grow">
        <img height="80" width="80" :src="image" :alt="title">
        <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
        <p class="mt-2 text-gray-400 text-center">{{ description }}</p>
    </div>
</template>