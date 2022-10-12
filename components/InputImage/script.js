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
        this.savedInitialValue = this.initialValue;

        this.setupFileReader();
        this.setupEventListeners();
    },

    beforeDestroy() {
        this.removeEventListeners();
    },

    methods: {
        /**
         * Public
         */
        validate() {
            // Initial value
            if (this.fileBlob === this.savedInitialValue) {
                return { isValid: true, error: null };
            }

            // Empty
            if (!this.fileBlob) {
                return { isValid: false, error: this.$utils.localeCopy.create.errors.form };
            }

            // File Size
            if (this.file.size > this.maxSize) {
                return { isValid: false, error: this.$utils.localeCopy.create.errors.fileToBig };
            }

            // Dimensions
            const width = Math.abs(this.$refs.image.naturalWidth);
            const height = Math.abs(this.$refs.image.naturalHeight);

            // if (width > this.requiredWidth || height > this.requiredHeight) {
            //     return { isValid: false, error: this.$utils.localeCopy.create.errors.wrongImageRatio };
            // }

            return { isValid: true, error: null };
        },

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
            this.file = this.$refs.input.files[0];

            console.log(this.file);

            this.$emit('input', {
                file: this.file,
                blob: this.fileBlob,
                name: this.name,
            });
        },
    },
};
