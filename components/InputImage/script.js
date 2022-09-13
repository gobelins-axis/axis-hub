// Components
import IconUpload from '@/assets/icons/upload.svg?inline';

export default {
    props: ['name', 'label', 'requiredWidth', 'requiredHeight', 'maxSize', 'initialValue'],

    data() {
        return {
            isDragOver: false,
            hasFile: !!this.initialValue,
            fileBlob: this.initialValue,
        };
    },

    components: {
        IconUpload,
    },

    mounted() {
        this.setupFileReader();
        this.setupEventListeners();
    },

    beforeDestroy() {
        this.removeEventListeners();
    },

    methods: {
        /**
         * Private
         */
        setupFileReader() {
            this.fileReader = new FileReader();
        },

        readFile() {
            if (!this.$refs.input.files[0]) return;
            this.fileReader.readAsDataURL(this.$refs.input.files[0]);
        },

        setupEventListeners() {
            this.$refs.input.addEventListener('dragenter', this.dragenterHandler);
            this.$refs.input.addEventListener('dragleave', this.dragleaveHandler);
            this.fileReader.addEventListener('load', this.fileReadHandler);
        },

        removeEventListeners() {
            this.$refs.input.removeEventListener('dragenter', this.dragenterHandler);
            this.$refs.input.removeEventListener('dragleave', this.dragleaveHandler);
        },

        /**
         * Handlers
         */
        dragenterHandler() {
            this.isDragOver = true;
        },

        dragleaveHandler() {
            this.isDragOver = false;
        },

        inputHandler() {
            this.readFile();
        },

        fileReadHandler() {
            this.hasFile = true;
            this.fileBlob = this.fileReader.result;
            this.isDragOver = false;

            this.$emit('input', {
                file: this.$refs.input.files[0],
                blob: this.fileBlob,
                name: this.name,
            });
        },
    },
};
