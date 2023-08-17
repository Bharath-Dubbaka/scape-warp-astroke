import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as dat from "dat.gui";
//NOTE: CSS if enabled will cause problems and will not show control panel of dat.gui
//most likely there is something in your css that breaks its layout
//https://discourse.threejs.org/t/dat-gui-is-not-displaying-as-expected/52498
//after trail and error it was due to     overflow:hidden;  in css

import gsap from "gsap";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const hdrTextureURL = new URL(
  "../img/sunflowers_puresky_4k.hdr",
  import.meta.url
);

// Scene
const scene = new THREE.Scene();

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff00ff , wireframe: true} );
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// // Axis Helper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// // Grid Helper
// const gridHelper = new THREE.GridHelper(30);
// scene.add(gridHelper);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
// camera.position.y = -0.5;
scene.add(camera);

//GSAP
// const tl = gsap.timeline()
// window.addEventListener("mousedown", function(){
//   tl.to(camera.position, {
//     z:4,
//     duration:1.5,
//     onUpdate:function(){
//       // camera.lookAt(0,0,0)
//     }
//   })

//   tl.to(camera.position, {
//     x:4,
//     duration:1.5,
//     onUpdate:function(){
//       // camera.lookAt(0,0,0)
//     }
//   })

//   tl.to(camera.position, {
//     x:10,
//     z:10,
//     // y:4,
//     duration:1.5,
//     onUpdate:function(){
//       // camera.lookAt(0,0,0)
//     }
//   })
//   tl.to(camera.position, {
//     x:8,
//     // z:-10,

//     duration:1.5,
//     onUpdate:function(){
//       // camera.lookAt(0,0,0)
//     }
//   })
// })

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas#webgl"),
});
renderer.setSize(sizes.width, sizes.height);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5;

//DAT.GUI instantiated outside
const gui = new dat.GUI();
//NOTE: CSS if enabled will cause problems and will not show control panel of dat.gui
//most likely there is something in your css that breaks its layout
//https://discourse.threejs.org/t/dat-gui-is-not-displaying-as-expected/52498
//after trail and error it was due to     overflow:hidden;  in css

// const options = {
//   sphereColor: '#ffea00',
//   wireframe: false,
// };

// gui.addColor(options, 'sphereColor').onChange(function(e){
//   mesh.material.color.set(e);
// });

// gui.add(options, 'wireframe').onChange(function(e){
//     mesh.material.wireframe = e;
// });



//HDRI
const loader = new RGBELoader();
loader.load(hdrTextureURL, function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;

  const sphere2 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0xffea00,
    })
  );
  scene.add(sphere2);
  sphere2.position.x = 3;

  const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 50, 50),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0xffffff,
    })
  );
  scene.add(sphere1);
  sphere1.position.x = 0.5;


  //DAT GUI inside HDRI
  // const gui = new dat.GUI();

  const options = {
    sphereColor: "#ffea00",
    wireframe: false,
  };

  gui.addColor(options, "sphereColor").onChange(function (e) {
    sphere1.material.color.set(e);
  });

  gui.add(options, "wireframe").onChange(function (e) {
    sphere1.material.wireframe = e;
  });
});


// ORBIT CONTROLS
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.autoRotate = true;
orbitControls.autoRotateSpeed = 7;

let step = 0;

//Game loop
function animate() {
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;

  orbitControls.update(); // Make sure to call this after any change to the controls and camera.position

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
