<template>
    <input type="submit" v-if="type === 'styled'" class="button styled" :class="{success: success, fail: error, yellow: color === 'yellow'}" :value=text />
    <input type="submit" v-else-if="type === 'blank'" class="button blank" :class="{success: success, fail: error, yellow: color === 'yellow'}">
    <input type="submit" v-else class="button simple" :class="{success: success, fail: error, yellow: color === 'yellow' }" >
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss"></style>
