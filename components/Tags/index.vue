<template>
    <div class="tags">

        <Tag v-for="(item, index) in tags" :key="index" :tag="item" />

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
