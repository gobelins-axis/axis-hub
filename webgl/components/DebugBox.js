// Vendor
import { BoxGeometry, Mesh, MeshNormalMaterial, Object3D } from 'three';
import { component } from '../vendor/bidello';

export default class DebugBox extends component(Object3D) {
    init(options = {}) {
        this._mesh = this._createMesh();
    }

    /**
     * Private
     */
    _createMesh() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshNormalMaterial();
        const mesh = new Mesh(geometry, material);
        this.add(mesh);
        return mesh;
    }

    /**
     * Update
     */
    onUpdate({ time, delta }) {
        this._mesh.rotation.x = time;
        this._mesh.rotation.y = time;
    }
}
