<template>
    <NuxtLink v-if="type === 'styled'" class="button styled" :to="link">
        <p v-if="text">{{ text }}</p>
    </NuxtLink>
    <NuxtLink v-else-if="type === 'blank'" class="button blank" :to="link" :class="{success: success, fail: error, yellow: color === 'yellow'}">
        <p v-if="text">{{ text }}</p>
    </NuxtLink>
    <NuxtLink v-else class="button simple" :to="link">
        <p v-if="text">{{ text }}</p>
    </NuxtLink>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
