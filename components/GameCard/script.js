export default {
    props: ['game', 'empty'],

    data() {
        return {
            backgroundImage: !this.empty ? { background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 30.73%, #333333 100%), url(${this.game.fields.mediumImage.url})`, backgroundSize: 'cover, cover'} : '',
        }
    }
};
