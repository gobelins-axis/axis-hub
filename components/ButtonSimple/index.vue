<template>
    <div v-if="type === 'styled'" class="button styled" :class="{success: success}">
        <p v-if="text">{{ text }}</p>
    </div>
    <div v-else class="button simple" :class="{success: success}" >
        <p v-if="text">{{ text }}</p>
    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
