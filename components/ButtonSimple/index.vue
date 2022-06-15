<template>
    <div v-if="type === 'styled'" class="button styled" :class="{success: success, fail: error, yellow: color === 'yellow'}">
        <p v-if="text">{{ text }}</p>
    </div>
    <div v-else-if="type === 'blank'" class="button blank" :class="{success: success, fail: error, yellow: color === 'yellow'}">
        <p v-if="text">{{ text }}</p>
    </div>
    <div v-else class="button simple" :class="{success: success, fail: error, yellow: color === 'yellow' }" >
        <p v-if="text">{{ text }}</p>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
