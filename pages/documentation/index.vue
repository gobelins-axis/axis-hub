<template>
    <div class="page-documentation">

        <div class="container container-large">

            <aside :class="['sidebar', { 'is-collapsed': isSidebarCollapsed, 'is-animated': isSidebarAnimated }]">

                <div class="sidebar-box" :aria-hidden="isSidebarCollapsed ? 'true' : 'false'">

                    <NavigationDocumentation
                        :items="tableOfContents"
                        :active-id="activeId"
                        @select="selectItem"
                    />

                </div>

                <button
                    type="button"
                    class="button button-toggle"
                    :aria-expanded="isSidebarCollapsed ? 'false' : 'true'"
                    :aria-label="toggleLabel"
                    :title="toggleLabel"
                    @click="toggleSidebar"
                >
                    <ArrowBack />
                </button>

            </aside>

            <div class="main">

                <h1 class="title">
                    {{ $utils.localeCopy.documentation.title }}
                </h1>

                <a class="button button-github" :href="githubUrl" target="_blank" rel="noopener noreferrer">
                    <IconGithub class="icon-github" />
                    <span>{{ $utils.localeCopy.documentation.github }}</span>
                </a>

                <!-- eslint-disable-next-line vue/no-v-html -->
                <article ref="content" class="markdown" @click="clickContentHandler" v-html="html"></article>

            </div>

        </div>

        <Footer />

    </div>
</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
