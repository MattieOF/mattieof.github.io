'use strict';

let THREE = require('three');
let canvas = document.getElementById("interactive-canvas");
let mouseNDC = new THREE.Vector2();

const clock = new THREE.Clock();
const scene = new THREE.Scene();
scene.add(new THREE.DirectionalLight(0xBBCCFF, 3));
scene.add(new THREE.AmbientLight(0x606060));
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
let raycaster = new THREE.Raycaster(camera.position, new THREE.Vector3(0, 0, -1));

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(document.body.clientWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x6495ED), 1);

camera.position.z = 5;

window.onresize = ev => {
  renderer.setSize(document.body.clientWidth, window.innerHeight);
  camera.aspect = document.body.clientWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

let planets = []

void loadData();
animate();

async function loadData() {
  await require.ensure(['three/examples/jsm/loaders/GLTFLoader'], async function (require) {
    let GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader').GLTFLoader;

    const loader = new GLTFLoader();
    const planetScene = await loader.loadAsync('PortfolioAssets/PlanetTest.glb');

    let planet = planetScene.scene.children[0];
    planet.material = new THREE.MeshPhysicalMaterial({color: new THREE.Color(.3, .3, .3), flatShading: true});

    for (let i = 0; i < 10; i++) {
      let newPlanet = planet.clone();
      newPlanet.position.x = randomBetween(-20, 20);
      newPlanet.position.y = randomBetween(-20, 20);
      newPlanet.position.z = randomBetween(-20, -10);
      newPlanet.scale.setScalar(randomBetween(0.1, 2));
      planets.push(newPlanet);
      scene.add(newPlanet);
    }
  });
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  // Get NDC mouse coords
  raycaster.setFromCamera(mouseNDC, camera);

  for (const object of planets) {
    object.rotation.x += 2 * delta;
    object.rotation.y += 2 * delta;
  }

  renderer.render(scene, camera);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
