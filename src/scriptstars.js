import * as THREE from "three";
// inspired by RED STAPLER YT https://www.youtube.com/watch?v=Bed1z7f1EI4&ab_channel=RedStapler
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let scene, camera, renderer, starBox, stars, vertices, orbitControls;

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = Math.PI / 2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height);
  document.body.appendChild(renderer.domElement);

  starBox = new THREE.BufferGeometry();
  vertices = {
    positions: [],
    accelerations: [],
    velocities: [],
  };
  for (let i = 0; i < 38000; i++) {
    vertices.positions.push(Math.random() * 600 - 300);
    if (i % 3 === 0) {
      vertices.accelerations.push(0.055);
      vertices.velocities.push(0.9);
    }
  }
  starBox.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(vertices.positions), 30)
  );

  let starImage = new THREE.TextureLoader().load("stars.png");
  let starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.9,
    map: starImage,
  });

  stars = new THREE.Points(starBox, starMaterial);
  scene.add(stars);

  //   orbitControls = new OrbitControls(camera, renderer.domElement);
  //   orbitControls.autoRotate = true;
  //   orbitControls.autoRotateSpeed = 0.1;

  //Resize responsive
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  });

  animate();
}

function animate() {
  for (let i = 0; i < vertices.velocities.length; i++) {
    vertices.velocities[i / 3 + (i % 3)] += vertices.accelerations[i];
    vertices.positions[i * 3 + 1] -= vertices.velocities[i];
    if (vertices.positions[i * 3 + 1] < -200) {
      vertices.positions[i * 3 + 1] = 400;
      vertices.velocities[i / 3 + (i % 3)] = 0;
    }
  }
  stars.rotation.y += 0.005;
  starBox.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(vertices.positions), 3)
  );
  //   orbitControls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}

init();
