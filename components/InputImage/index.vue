<template>
    <div :class="`input-image ${isDragOver ? 'is-drag-over': ''}`">

        <div class="label-container">

            <div class="label">

                <span>{{ label }}</span>

                <IconUpload />

            </div>

        </div>

        <div class="image-preview-container">

            <img v-if="hasFile" ref="image" :src="fileBlob" alt="" class="image-preview">

        </div>

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
