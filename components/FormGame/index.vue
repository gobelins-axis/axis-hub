<template>
    <form class="form form-game">

        <div class="col">

            <div class="inputs-group">

                <div class="title">
                    {{ $utils.localeCopy.create.informations.title }}
                </div>

                <div class="input-container">

                    <input
                        name="name"
                        type="text"
                        class="name"
                        :value="fields.name"
                        :placeholder="$utils.localeCopy.create.informations.name"
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    >

                </div>

                <div class="input-container">

                    <input
                        name="year"
                        type="text"
                        class="year"
                        :value="fields.year"
                        :placeholder="$utils.localeCopy.create.informations.year"
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    >

                </div>

                <div class="input-container">

                    <textarea
                        name="credits"
                        rows="3"
                        maxlength="160"
                        minlength="10"
                        :placeholder="$utils.localeCopy.create.informations.credits"
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    ></textarea>

                </div>

                <div class="input-container">

                    <textarea
                        name="shortDescription"
                        rows="3"
                        maxlength="160"
                        minlength="10"
                        :placeholder="$utils.localeCopy.create.informations.shortDescription"
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    ></textarea>

                </div>

                <div class="input-container">

                    <textarea
                        name="longDescription"
                        rows="6"
                        maxlength="900"
                        minlength="10"
                        :placeholder="$utils.localeCopy.create.informations.longDescription"
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    ></textarea>

                </div>

                <div class="input-container">

                    <div class="checkboxes-container">

                        <InputCheckbox name="solo" :label="$utils.localeCopy.create.informations.solo" :initial-value="false" @input="inputCheckboxHandler" />

                        <InputCheckbox name="multiplayer" :label="$utils.localeCopy.create.informations.multiplayer" :initial-value="false" @input="inputCheckboxHandler" />

                        <InputCheckbox name="experience" :label="$utils.localeCopy.create.informations.experience" :initial-value="false" @input="inputCheckboxHandler" />

                        <InputCheckbox name="game" :label="$utils.localeCopy.create.informations.game" :initial-value="false" @input="inputCheckboxHandler" />

                    </div>

                </div>

                <div class="input-container">

                    <div class="toggle-score-container">

                        <div class="toggle-score-label">
                            {{ $utils.localeCopy.create.informations.showLeaderboard }}
                        </div>

                        <InputCheckboxToggle name="showLeaderboard" :option1="$utils.localeCopy.create.misc.yes" :option2="$utils.localeCopy.create.misc.no" :initial-value="true" @input="inputCheckboxHandler" />

                    </div>

                </div>

            </div>

        </div>

        <div class="col">

            <div class="inputs-group">

                <div class="title">
                    {{ $utils.localeCopy.create.project.title }}
                </div>

                <div class="input-container">

                    <input
                        name="url"
                        type="url"
                        class="name"
                        :value="fields.name"
                        :placeholder="$utils.localeCopy.create.project.url"
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    >

                </div>

                <div class="copy-id-container">

                    <input
                        name="id"
                        type="text"
                        class="id"
                        value=""
                        placeholder=""
                        autocomplete="off"
                        disabled
                    >

                    <button type="button" class="button button-copy-id" @click="clickCopyIDHandler">
                        {{ $utils.localeCopy.create.project.copyID }}
                    </button>

                </div>

            </div>

            <div class="inputs-group">

                <div class="title">
                    {{ $utils.localeCopy.create.images.title }}
                </div>

                <div class="image-inputs-container">

                    <div class="image-input-container">

                        <div class="image-label">
                            {{ $utils.localeCopy.create.images.image1 }}
                        </div>

                        <InputImage
                            class="image-1"
                            name="image-1"
                            :label="$utils.localeCopy.create.misc.add"
                            :required-width="1200"
                            :required-height="470"
                            :max-size="3"
                            @input="inputImageHandler"
                        />

                    </div>

                    <div class="image-input-container">

                        <div class="image-label">
                            {{ $utils.localeCopy.create.images.image2 }}
                        </div>

                        <InputImage
                            class="image-2"
                            name="image-2"
                            :label="$utils.localeCopy.create.misc.add"
                            :required-width="2560"
                            :required-height="1440"
                            :max-size="5"
                            @input="inputImageHandler"
                        />

                    </div>

                </div>

            </div>

            <div class="inputs-group">

                <div class="title">
                    {{ $utils.localeCopy.create.colors.title }}
                </div>

                <div class="color-inputs-container">

                    <div class="color-input-container">

                        <div class="color-label">
                            {{ $utils.localeCopy.create.colors.color1 }}
                        </div>

                        <InputColor name="color1" initial-value="" @input="inputColorHandler" />

                    </div>

                    <div class="color-input-container">

                        <div class="color-label">
                            {{ $utils.localeCopy.create.colors.color2 }}
                        </div>

                        <InputColor name="color1" initial-value="" @input="inputColorHandler" />

                    </div>

                </div>

            </div>

        </div>

    </form>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
