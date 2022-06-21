<template>
    <NuxtLink v-if="type === 'styled'" class="button styled" :to="link">
        <img class= "icon" v-if="icon" :src="require(`~/assets/images/${icon}.svg`)"/>
        <p v-if="text">{{ text }}</p>
    </NuxtLink>
    <NuxtLink v-else-if="type === 'blank'" class="button blank" :to="link" :class="{success: success, fail: error, yellow: color === 'yellow'}">
        <img class= "icon" v-if="icon" :src="require(`~/assets/images/${icon}.svg`)"/>
        <p v-if="text">{{ text }}</p>
    </NuxtLink>
    <NuxtLink v-else class="button simple" :to="link">
        <img class= "icon" v-if="icon" :src="require(`~/assets/images/${icon}.svg`)"/>
        <p v-if="text">{{ text }}</p>
    </NuxtLink>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
