<template>
    <form
        :class="`form form-game ${showErrors ? 'show-errors' : ''}`"
        novalidate
        @submit.prevent="submitHandler"
    >
        <div class="col">
            <div class="inputs-group">
                <div class="title">
                    {{ $utils.localeCopy.create.informations.title }}
                </div>

                <div class="input-container">
                    <input
                        ref="inputName"
                        name="name"
                        type="text"
                        class="name"
                        :value="fields.name"
                        :placeholder="
                            $utils.localeCopy.create.informations.name
                        "
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    />
                </div>

                <div class="input-container">
                    <input
                        ref="inputYear"
                        name="year"
                        type="text"
                        class="year"
                        :value="fields.year"
                        :placeholder="
                            $utils.localeCopy.create.informations.year
                        "
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    />
                </div>

                <div class="input-container">
                    <textarea
                        ref="inputCredits"
                        name="credits"
                        rows="3"
                        maxlength="160"
                        minlength="10"
                        :value="fields.credits"
                        :placeholder="
                            $utils.localeCopy.create.informations.credits
                        "
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    ></textarea>
                </div>

                <div class="input-container">
                    <textarea
                        ref="inputShortDescription"
                        name="shortDescription"
                        rows="3"
                        maxlength="160"
                        minlength="10"
                        :value="fields.shortDescription"
                        :placeholder="
                            $utils.localeCopy.create.informations
                                .shortDescription
                        "
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    ></textarea>
                </div>

                <div class="input-container">
                    <textarea
                        ref="inputLongDescription"
                        name="longDescription"
                        rows="6"
                        maxlength="900"
                        minlength="10"
                        :value="fields.longDescription"
                        :placeholder="
                            $utils.localeCopy.create.informations
                                .longDescription
                        "
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    ></textarea>
                </div>

                <div class="input-container">
                    <div class="checkboxes-container">
                        <InputCheckbox
                            name="solo"
                            :label="$utils.localeCopy.create.informations.solo"
                            :initial-value="fields.solo"
                            @input="inputCheckboxHandler"
                        />

                        <InputCheckbox
                            name="multiplayer"
                            :label="
                                $utils.localeCopy.create.informations
                                    .multiplayer
                            "
                            :initial-value="fields.multiplayer"
                            @input="inputCheckboxHandler"
                        />

                        <InputCheckbox
                            name="experience"
                            :label="
                                $utils.localeCopy.create.informations.experience
                            "
                            :initial-value="fields.experience"
                            @input="inputCheckboxHandler"
                        />

                        <InputCheckbox
                            name="game"
                            :label="$utils.localeCopy.create.informations.game"
                            :initial-value="fields.game"
                            @input="inputCheckboxHandler"
                        />
                    </div>
                </div>

                <div class="input-container">
                    <div class="toggle-score-container">
                        <div class="toggle-score-label">
                            {{
                                $utils.localeCopy.create.informations
                                    .showLeaderboard
                            }}
                        </div>

                        <InputCheckboxToggle
                            name="showLeaderboard"
                            :option1="$utils.localeCopy.create.misc.yes"
                            :option2="$utils.localeCopy.create.misc.no"
                            :initial-value="fields.showLeaderboard"
                            @input="inputCheckboxHandler"
                        />
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
                        ref="inputUrl"
                        name="url"
                        type="url"
                        class="url"
                        pattern="^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$"
                        :value="fields.url"
                        :placeholder="$utils.localeCopy.create.project.url"
                        autocomplete="off"
                        required
                        @input="inputHandler"
                    />
                </div>

                <div v-if="id" class="copy-id-container">
                    <input
                        ref="inputId"
                        name="id"
                        type="text"
                        :class="`id ${isIDCopied ? 'is-copied' : ''}`"
                        :value="id"
                        placeholder=""
                        autocomplete="off"
                        disabled
                    />

                    <button
                        type="button"
                        :class="`button button-copy-id ${
                            isIDCopied ? 'is-copied' : ''
                        }`"
                        @click="clickCopyIDHandler"
                    >
                        <span class="label-container">
                            <span class="label">
                                {{ $utils.localeCopy.create.project.copyID }}
                            </span>
                            <span class="label-copied">
                                {{ $utils.localeCopy.create.project.copied }}
                            </span>
                        </span>
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
                            ref="image1"
                            class="image-1"
                            name="image1"
                            :label="$utils.localeCopy.create.misc.add"
                            :required-width="1200"
                            :required-height="470"
                            :max-size="1000000"
                            :initial-value="fields.image1"
                            @input="inputImageHandler"
                        />
                    </div>

                    <div class="image-input-container">
                        <div class="image-label">
                            {{ $utils.localeCopy.create.images.image2 }}
                        </div>

                        <InputImage
                            ref="image2"
                            class="image-2"
                            name="image2"
                            :label="$utils.localeCopy.create.misc.add"
                            :required-width="2560"
                            :required-height="1440"
                            :max-size="1000000"
                            :initial-value="fields.image2"
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

                        <InputColor
                            name="color1"
                            :initial-value="fields.color1"
                            @input="inputColorHandler"
                        />
                    </div>

                    <div class="color-input-container">
                        <div class="color-label">
                            {{ $utils.localeCopy.create.colors.color2 }}
                        </div>

                        <InputColor
                            name="color1"
                            :initial-value="fields.color2"
                            @input="inputColorHandler"
                        />
                    </div>
                </div>
            </div>

            <div class="buttons-container">
                <nuxt-link class="button button-third" :to="localePath('/hub')">
                    {{ $utils.localeCopy.create.cancel }}
                </nuxt-link>

                <button type="submit" class="button button-primary button-save">
                    {{ $utils.localeCopy.create.save }}
                </button>

                <button
                    v-if="isEdit"
                    type="button"
                    class="button button-trash"
                    @click="clickDeleteHandler"
                >
                    <IconTrash />
                </button>
            </div>

            <div v-if="showErrors && error" class="error">
                {{ error }}
            </div>

            <div v-else class="error-placeholder">
                error
            </div>
        </div>
    </form>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
