import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas.webgl"),
});
renderer.setSize(sizes.width, sizes.height);

//ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.update(); // Make sure to call this after any change to the controls

//Game loop with
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();
