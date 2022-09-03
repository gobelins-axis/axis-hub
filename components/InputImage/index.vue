<template>
    <div :class="`input-image ${isDragOver ? 'is-drag-over': ''}`">

        <div class="label-container">

            <div class="label">

                <span>{{ label }}</span>

                <IconUpload />

            </div>

        </div>

        <img v-if="hasFile" :src="fileBlob" alt="" class="image-preview">

        <input
            :id="name"
            ref="input"
            type="file"
            accept="image/png, image/jpeg"
            @input="inputHandler"
        >
        <label :for="name">
            {{ label }}
        </label>

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
