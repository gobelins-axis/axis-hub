// Vendor
import { gsap } from 'gsap';
import { component } from '../vendor/bidello';
import { Scene } from 'three';

// Modules
import CameraManager from '../modules/CameraManager';
import DebugBox from '../components/DebugBox';

export default class FinalScene extends component(Scene) {
    init(options = {}) {
        this._renderer = options.renderer;
        this._width = options.width;
        this._height = options.height;
        this._debugger = options.debugger;
        this._nuxtRoot = options.nuxtRoot;
        this._sceneName = options.name;

        this._debugFolder = this._createDebugFolder();
        this._cameraManager = this._createCameraManager();
    }

    destroy() {

    }

    /**
     * Getters
     */
    get camera() {
        return this._cameraManager.active;
    }

    /**
     * Public
     */
    transitionIn() {
        const timeline = new gsap.timeline();
        return timeline;
    }

    /**
     * This is called when all resources are available
     */
    setup() {
        this._components = this._createComponents();
    }

    /**
     * Private
     */
    _createCameraManager() {
        const cameraManager = new CameraManager({
            renderer: this._renderer,
            width: this._width,
            height: this._height,
            debugFolder: this._debugFolder,
        });

        return cameraManager;
    }

    _createComponents() {
        const components = {
            debugBox: this._createDebugBox(),
        };

        return components;
    }

    _createDebugBox() {
        const debugBox = new DebugBox();
        this.add(debugBox);
        return debugBox;
    }

    /**
     * Update cycle
     */
    onUpdate({ time, delta }) {
        this._cameraManager.update({ time, delta });
    }

    /**
     * Resize
     */
    onResize({ width, height }) {
        this._width = width;
        this._height = height;

        this._cameraManager.resize({ width, height });
    }

    /**
     * Mousemove
     */
    onMousemove({ centeredMousePosition }) {

    }

    /**
     * Debug
     */
    _createDebugFolder() {
        if (!this._debugger) return;

        const folder = this._debugger.addFolder({ title: `Scene: ${this._sceneName}` });
        return folder;
    }
}
