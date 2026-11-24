// Mixins
import seo from '@/mixins/seo';
import pageTransitions from '@/mixins/pageTransitions';

// Utils
import parseDocumentation from '@/utils/parseDocumentation';

// Content
import markdown from '@/content/documentation.md';

// Components
import ArrowBack from '@/assets/icons/arrow-back.svg?inline';
import IconGithub from '@/assets/icons/github.svg?inline';
import NavigationDocumentation from '@/components/NavigationDocumentation';
import Footer from '@/components/Footer';

const COPIED_DURATION = 2000;
const SIDEBAR_STORAGE_KEY = 'axis-hub:documentation-sidebar-collapsed';

export default {
    name: 'page-documentation',

    mixins: [seo, pageTransitions],

    data() {
        const { tableOfContents, html } = parseDocumentation(markdown, {
            copyLabel: this.$utils.localeCopy.documentation.copy,
            copiedLabel: this.$utils.localeCopy.documentation.copied,
        });

        return {
            tableOfContents,
            html,
            githubUrl: 'https://github.com/gobelins-axis/axis-api',
            activeId: null,
            isSidebarCollapsed: false,
            isSidebarAnimated: false,
        };
    },

    computed: {
        toggleLabel() {
            const copy = this.$utils.localeCopy.documentation;
            return this.isSidebarCollapsed ? copy.showSummary : copy.hideSummary;
        },
    },

    mounted() {
        // Closed by default on small screens, remembered choice otherwise
        this.isSidebarCollapsed = this.isSmallScreen() ? true : this.readSidebarState();

        // Enable transitions after the restored state is painted, so it doesn't animate on load
        this.sidebarAnimationRequest = requestAnimationFrame(() => {
            this.sidebarAnimationRequest = requestAnimationFrame(() => {
                this.isSidebarAnimated = true;
            });
        });
        this.anchors = this.getAnchors();
        this.setupEventListeners();
        this.updateActiveId();
        this.scrollToRouteHash();
    },

    beforeDestroy() {
        this.removeEventListeners();
        cancelAnimationFrame(this.scrollRequest);
        cancelAnimationFrame(this.sidebarAnimationRequest);
        clearTimeout(this.copiedTimeout);
    },

    methods: {
        /**
         * Public
         */
        transitionIn(done, routeInfos) {
            if (done) done();
        },

        transitionOut(done, routeInfos) {
            if (done) done();
        },

        scrollTo(id, behavior = 'smooth') {
            const element = document.getElementById(id);
            if (!element) return;

            // Headings define a scroll-margin-top to clear the fixed navigation
            element.scrollIntoView({ behavior, block: 'start' });
        },

        /**
         * Private
         */
        getAnchors() {
            const ids = this.tableOfContents.flatMap(item => [item, ...item.children]).map(item => item.id);

            return ids
                .map(id => ({ id, element: document.getElementById(id) }))
                .filter(anchor => anchor.element);
        },

        scrollToRouteHash() {
            if (!this.$route.hash) return;
            this.scrollTo(decodeURIComponent(this.$route.hash.slice(1)), 'auto');
        },

        updateActiveId() {
            if (!this.anchors.length) return;

            const offset = parseFloat(getComputedStyle(this.anchors[0].element).scrollMarginTop) || 0;
            const isPageBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

            if (isPageBottom) {
                this.activeId = this.anchors[this.anchors.length - 1].id;
                return;
            }

            let activeId = null;

            for (const anchor of this.anchors) {
                if (anchor.element.getBoundingClientRect().top - offset > 1) break;
                activeId = anchor.id;
            }

            this.activeId = activeId;
        },

        setupEventListeners() {
            window.addEventListener('scroll', this.scrollHandler, { passive: true });
            window.addEventListener('resize', this.scrollHandler);
        },

        removeEventListeners() {
            window.removeEventListener('scroll', this.scrollHandler);
            window.removeEventListener('resize', this.scrollHandler);
        },

        scrollHandler() {
            cancelAnimationFrame(this.scrollRequest);
            this.scrollRequest = requestAnimationFrame(this.updateActiveId);
        },

        isSmallScreen() {
            return this.$breakpoints.active('small');
        },

        toggleSidebar() {
            this.isSidebarCollapsed = !this.isSidebarCollapsed;

            // The small screen dropdown always starts closed, don't override the desktop choice
            if (!this.isSmallScreen()) this.writeSidebarState(this.isSidebarCollapsed);
        },

        selectItem(id) {
            // The small screen dropdown covers the content, close it before going to the section
            if (this.isSmallScreen()) this.isSidebarCollapsed = true;
            this.scrollTo(id);
        },

        readSidebarState() {
            try {
                return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true';
            } catch (error) {
                return false;
            }
        },

        writeSidebarState(isCollapsed) {
            try {
                window.localStorage.setItem(SIDEBAR_STORAGE_KEY, String(isCollapsed));
            } catch (error) {
                // Storage unavailable (private mode...), the state just won't be remembered
            }
        },

        copyCode(button) {
            const code = button.closest('.code-block').querySelector('code').textContent;

            this.writeClipboard(code).then(() => {
                const copiedButton = this.$refs.content.querySelector('.button-copy.is-copied');
                if (copiedButton) copiedButton.classList.remove('is-copied');

                button.classList.add('is-copied');

                clearTimeout(this.copiedTimeout);
                this.copiedTimeout = setTimeout(() => button.classList.remove('is-copied'), COPIED_DURATION);
            }).catch((error) => {
                console.log(error);
            });
        },

        writeClipboard(text) {
            if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);

            // Fallback for non secure contexts (e.g. dev server opened from a local network IP)
            return new Promise((resolve, reject) => {
                const textarea = document.createElement('textarea');
                textarea.value = text;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();

                const isSuccess = document.execCommand('copy');
                document.body.removeChild(textarea);

                if (isSuccess) resolve();
                else reject(new Error('Copy failed'));
            });
        },

        clickContentHandler(e) {
            // Tapping the content closes the small screen dropdown
            if (this.isSmallScreen() && !this.isSidebarCollapsed) this.isSidebarCollapsed = true;

            const copyButton = e.target.closest('.button-copy');

            if (copyButton) {
                this.copyCode(copyButton);
                return;
            }

            // Smooth scroll for in-content anchor links
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            e.preventDefault();
            this.scrollTo(decodeURIComponent(link.getAttribute('href').slice(1)));
        },
    },

    components: {
        ArrowBack,
        IconGithub,
        NavigationDocumentation,
        Footer,
    },
};
