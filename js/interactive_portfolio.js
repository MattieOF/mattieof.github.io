'use strict';

let THREE = require('three');
let canvas = document.getElementById("interactive-canvas");

const clock = new THREE.Clock();
const scene = new THREE.Scene();
scene.add(new THREE.DirectionalLight(0xBBCCFF, 3));
scene.add(new THREE.AmbientLight(0x606060));
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(document.body.clientWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x6495ED), 1);

camera.position.z = 5;

window.onresize = ev => {
  renderer.setSize(document.body.clientWidth, window.innerHeight);
  camera.aspect = document.body.clientWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

let objects = []

void loadData();
animate();

async function loadData() {
  require.ensure(['three/examples/jsm/loaders/GLTFLoader'], function(require) {
    let GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader').GLTFLoader;

    const loader = new GLTFLoader();
    loader.load('PortfolioAssets/PlanetTest.glb', function(gltf) {
      let planet = gltf.scene.children[0];
      planet.material = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(.3, .3, .3), flatShading: true });
      console.log(planet.material);
      scene.add(planet);
      objects.push(planet);
    });
  });
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  for (const object of objects) {
    object.rotation.x += 2 * delta;
    object.rotation.y += 2 * delta;
  }

  renderer.render(scene, camera);
}
