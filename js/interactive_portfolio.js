'use strict';

function lerpSmooth(a, b, r, delta) {
  return (a - b) * Math.pow(r, delta) + b;
}

function lerpSmoothColor(a, b, r, delta) {
  return new THREE.Color(
    lerpSmooth(a.r, b.r, r, delta),
    lerpSmooth(a.g, b.g, r, delta),
    lerpSmooth(a.b, b.b, r, delta)
  );
}

let THREE = require('three');
let canvas = document.getElementById("interactive-canvas");
let mouseNDC = new THREE.Vector2();
let mouseHasMoved = true;
let mouseButtonPressed = -1;

const clock = new THREE.Clock();
const scene = new THREE.Scene();
scene.add(new THREE.DirectionalLight(0xBBCCFF, 3));
scene.add(new THREE.AmbientLight(0x606060));
scene.background = new THREE.Color(window.darkThemeEnabled ? 0x000000 : 0xFFFFFF);
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
let raycaster = new THREE.Raycaster(camera.position, new THREE.Vector3(0, 0, -1));

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(document.body.clientWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x000000), 0); // Transparent background

camera.position.z = 5;

window.onresize = ev => {
  renderer.setSize(document.body.clientWidth, window.innerHeight);
  camera.aspect = document.body.clientWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

canvas.onmousemove = ev => {
  mouseNDC.x = (ev.offsetX / ev.target.clientWidth) * 2 - 1;
  mouseNDC.y = (1 - (ev.offsetY / ev.target.clientHeight)) * 2 - 1;
  mouseHasMoved = true;
};

canvas.onmousedown = ev => {
  mouseButtonPressed = ev.button;
}

let planets = [];
let fracturedPlanets = [];
let fracturedPlanet = null;

void loadData();
animate();

async function loadData() {
  await require.ensure(['three/examples/jsm/loaders/GLTFLoader'], async function (require) {
    let GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader').GLTFLoader;

    const loader = new GLTFLoader();
    const planetScene = await loader.loadAsync('PortfolioAssets/PlanetTest.glb');
    fracturedPlanet = await loader.loadAsync('PortfolioAssets/FracturedPlanet.glb');

    let planet = planetScene.scene.children[0];
    planet.material = new THREE.MeshPhysicalMaterial({color: new THREE.Color(.3, .3, .3), flatShading: true});

    for (let i = 0; i < 50; i++) {
      let newPlanet = planet.clone();
      newPlanet.material = planet.material.clone();
      let col = new THREE.Color();
      col.setHSL(Math.random(), 0.8, 0.5);
      newPlanet.material.color = col;
      newPlanet.rotationSpeed = new THREE.Vector2(randomBetween(-0.6, 0.6), randomBetween(-0.6, 0.6));

      do {
        newPlanet.position.x = randomBetween(-80, 80);
        newPlanet.position.y = randomBetween(-40, 40);
        newPlanet.position.z = randomBetween(-50, -60);
      } while (planets.some(p => planetOverlapsPlanet(p, newPlanet)));

      newPlanet.rotation.x = randomBetween(-360, 360);
      newPlanet.rotation.y = randomBetween(-360, 360);
      newPlanet.rotation.z = randomBetween(-360, 360);
      newPlanet.scale.setScalar(randomBetween(0.4, 1.2));

      planets.push(newPlanet);
      scene.add(newPlanet);
    }
  });
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  // Update colours
  // MW @todo @perf: I don't like the way this is done, but it's a quick way to get the effect I want
  // Too much stuff done every frame
  scene.background = lerpSmoothColor(scene.background, window.darkThemeEnabled ? new THREE.Color(0x000000) : new THREE.Color(0xFFFFFF), 0.1, delta);

  if (mouseHasMoved || mouseButtonPressed != -1) {
    raycaster.setFromCamera(mouseNDC, camera);
    const intersects = raycaster.intersectObjects(planets);
    if (intersects.length > 0) {
      if (mouseButtonPressed == 0)
      {
        let obj = intersects[0].object;
        for (let i = 0; i < 6; i++) {
          let newPlanet = fracturedPlanet.scene.children[i].clone();
          newPlanet.velocity = newPlanet.position.clone().multiplyScalar(10);
          newPlanet.position.add(obj.position);
          newPlanet.rotation.set(obj.rotation.x, obj.rotation.y, obj.rotation.z);
          newPlanet.scale.setScalar(obj.scale.x);
          newPlanet.material = obj.material.clone();
          newPlanet.rotationSpeed = new THREE.Vector2(randomBetween(-0.6, 0.6), randomBetween(-0.6, 0.6));
          fracturedPlanets.push(newPlanet);
          scene.add(newPlanet);
        }

        scene.remove(intersects[0].object);
        planets.splice(planets.indexOf(intersects[0].object), 1);
      }
    }

    const test = raycaster.intersectObjects(fracturedPlanets);
    if (test.length > 0) {
      console.log(test[0].object);
    }

    mouseHasMoved = false;
    mouseButtonPressed = -1;
  }

  for (const object of planets) {
    object.rotation.x += object.rotationSpeed.x * delta;
    object.rotation.y += object.rotationSpeed.y * delta;
  }

  for (const object of fracturedPlanets) {
    object.position.add(object.velocity.clone().multiplyScalar(delta));
    object.velocity.multiplyScalar(1 - (0.5 * delta));
    object.rotation.x += object.rotationSpeed.x * delta;
    object.rotation.y += object.rotationSpeed.y * delta;
    object.rotationSpeed.multiplyScalar(1 - (0.08 * delta));
  }

  renderer.render(scene, camera);
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function planetOverlapsPlanet(p1, p2) {
  let p1pos = p1.position.clone();
  let d = p1pos.sub(p2.position);
  let squaredDistance = d.dot(d);
  let radiusSum = (p1.scale.x * 3) + (p2.scale.x * 3);
  let squaredRadii = radiusSum * radiusSum;
  return squaredDistance <= squaredRadii;
}
