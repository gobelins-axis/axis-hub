// Vendor
import { WebGLRenderer, Clock, Vector2, sRGBEncoding, GammaEncoding, LinearEncoding, RGBEEncoding, RGBM7Encoding, RGBM16Encoding, RGBDEncoding, BasicDepthPacking, RGBADepthPacking, GreaterEqualDepth } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GPUStatsPanel } from '@/webgl/vendor/GPUStatsPanel.js';
import bidello from './vendor/bidello';
import { gsap } from 'gsap';

// Utils
import Debugger from '@/utils/Debugger';
import WindowResizeObserver from '@/utils/WindowResizeObserver';
import device from '@/utils/device';

// Modules
import SceneManager from './modules/SceneManager';

export default class WebGLApplication {
    constructor(options = {}) {
        // Props
        this._canvas = options.canvas;
        this._nuxtRoot = options.nuxtRoot;
        this._isDebug = options.isDebug;
        this._isDevelopment = options.isDevelopment;
        this._sceneName = options.sceneName;

        this._encodings = {
            linearEncoding: LinearEncoding,
            sRGBEncoding,
            gammaEncoding: GammaEncoding,
            RGBEEncoding,
            RGBM7Encoding,
            RGBM16Encoding,
            RGBDEncoding,
            BasicDepthPacking,
            RGBADepthPacking,
        };

        this._settings = {
            encoding: 'sRGBEncoding',
            encodingOptions: {
                LinearEncoding: 'LinearEncoding',
                sRGBEncoding: 'sRGBEncoding',
                GammaEncoding: 'GammaEncoding',
                RGBEEncoding: 'RGBEEncoding',
                RGBM7Encoding: 'RGBM7Encoding',
                RGBM16Encoding: 'RGBM16Encoding',
                RGBDEncoding: 'RGBDEncoding',
                BasicDepthPacking: 'BasicDepthPacking',
                RGBADepthPacking: 'RGBADepthPacking',
            },
        };

        this._width = WindowResizeObserver.width;
        this._height = WindowResizeObserver.height;
        this._clock = this._createClock();
        this._debugger = this._createDebugger();
        this._renderer = this._createRenderer();
        this._scene = this._createScene();

        this._mousePosition = new Vector2();
        this._normalizedMousePosition = new Vector2();
        this._centeredMousePosition = new Vector2();

        this._bindHandlers();
        this._setupEventListeners();
        this._resize();

        // Only in development
        if (this._isDevelopment) {
            this._stats = this._createStats();
            this._statsGpuPanel = this._createStatsGpuPanel();
        }
    }

    /**
     * Public
     */
    transitionIn() {
        const timeline = new gsap.timeline();
        if (this._scene.transitionIn) timeline.add(this._scene.transitionIn(), 0);
    }

    /**
     * This is called when all resources are available
     */
    setup() {
        this._scene.setup();
    }

    destroy() {
        this._removeEventListeners();
        this._removeDebugger();
        this._removeStats();
        this._clock.stop();
        this._renderer.dispose();
        if (this._scene.destroy) this._scene.destroy();
    }

    /**
     * Private
     */
    _createClock() {
        const clock = new Clock();
        return clock;
    }

    _createRenderer() {
        const renderer = new WebGLRenderer({
            canvas: this._canvas,
            antialias: true,
            transparent: false,
        });
        renderer.outputEncoding = this._encodings[this._settings.encoding];

        return renderer;
    }

    _createScene() {
        const sceneManager = new SceneManager({
            sceneName: this._sceneName,
            root: this,
            nuxtRoot: this._nuxtRoot,
            renderer: this._renderer,
            width: this._width,
            height: this._height,
            debugger: this._debugger,
        });

        return sceneManager.activeScene;
    }

    /**
     * Update cycle
     */
    _update() {
        if (this._stats) this._stats.begin();
        this._triggerBidelloUpdate();
        this._render();
        if (this._stats) this._stats.end();
    }

    _render() {
        if (this._statsGpuPanel) this._statsGpuPanel.startQuery();
        this._renderer.render(this._scene, this._scene.camera);
        if (this._statsGpuPanel) this._statsGpuPanel.endQuery();
    }

    _triggerBidelloUpdate() {
        const delta = this._clock.getDelta();
        const time = this._clock.getElapsedTime();

        bidello.trigger(
            {
                name: 'update',
                fireAtStart: false,
            },
            {
                delta,
                time,
            },
        );
    }

    /**
     * Resize
     */
    _resize() {
        this._width = WindowResizeObserver.width;
        this._height = WindowResizeObserver.height;
        this._dpr = Math.max(2, device.dpr());

        this._resizeCanvas();
        this._resizeRenderer();
        this._triggerBidelloResize();
    }

    _resizeCanvas() {
        this._renderer.domElement.style.width = `${this._width}px`;
        this._renderer.domElement.style.height = `${this._height}px`;
    }

    _resizeRenderer() {
        this._renderer.setPixelRatio(this._dpr);
        this._renderer.setSize(this._width, this._height, false);
    }

    _triggerBidelloResize() {
        bidello.trigger(
            {
                name: 'resize',
                fireAtStart: true,
            },
            {
                width: this._width,
                height: this._height,
                dpr: this._dpr,
            },
        );
    }

    /**
     * Events
     */
    _bindHandlers() {
        this._resizeHandler = this._resizeHandler.bind(this);
        this._tickHandler = this._tickHandler.bind(this);
        this._mousemoveHandler = this._mousemoveHandler.bind(this);
    }

    _setupEventListeners() {
        WindowResizeObserver.addEventListener('resize', this._resizeHandler);
        gsap.ticker.add(this._tickHandler);
        this._canvas.addEventListener('mousemove', this._mousemoveHandler);
    }

    _removeEventListeners() {
        WindowResizeObserver.removeEventListener('resize', this._resizeHandler);
        gsap.ticker.remove(this._tickHandler);
        this._canvas.removeEventListener('mousemove', this._mousemoveHandler);
    }

    _resizeHandler() {
        this._resize();
    }

    _tickHandler() {
        this._update();
    }

    _mousemoveHandler(e) {
        this._mousePosition.x = e.clientX;
        this._mousePosition.y = e.clientY;

        this._normalizedMousePosition.x = this._mousePosition.x / this._width;
        this._normalizedMousePosition.y = 1.0 - this._mousePosition.y / this._height;

        this._centeredMousePosition.x = (this._mousePosition.x / this._width) * 2 - 1;
        this._centeredMousePosition.y = -(this._mousePosition.y / this._height) * 2 + 1;

        bidello.trigger(
            {
                name: 'mousemove',
                fireAtStart: false,
            },
            {
                mousePosition: this._mousePosition,
                normalizedMousePosition: this._normalizedMousePosition,
                centeredMousePosition: this._centeredMousePosition,
            },
        );
    }

    /**
     * Debugger
     */
    _createDebugger() {
        if (!this._isDebug) return;

        const debug = new Debugger({
            title: 'Cosmic debugger',
        });

        debug.addInput(this._settings, 'encoding', { options: this._settings.encodingOptions }).on('change', () => {
            this._renderer.outputEncoding = this._encodings[this._settings.encoding];
        });

        return debug;
    }

    _removeDebugger() {
        this._debugger?.destroy();
    }

    _createStats() {
        if (!this._isDebug) return;
        const stats = new Stats();
        document.body.appendChild(stats.dom);

        return stats;
    }

    _removeStats() {
        if (!this._stats) return;
        document.body.removeChild(this._stats.dom);
        this._stats = null;
    }

    _createStatsGpuPanel() {
        if (!this._stats) return;
        const panel = new GPUStatsPanel(this._renderer.getContext());
        this._stats.addPanel(panel);
        this._stats.showPanel(3);

        return panel;
    }
}
