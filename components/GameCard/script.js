export default {
    props: {
        game: Object,
        empty: Boolean,
        edit: Boolean
    },

    computed: {
        backgroundImage() {
            return !this.empty ? { background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 30.73%, #333333 100%), url(${this.game.fields.mediumImage.url})`, backgroundSize: 'cover, cover'} : ''
        }
    }
};
