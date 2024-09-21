'use strict';

let THREE = require('three');
let canvas = document.getElementById("interactive-canvas");

const clock = new THREE.Clock();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(document.body.clientWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color(0x6495ED), 1);

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

window.onresize = ev => {
  renderer.setSize(document.body.clientWidth, window.innerHeight);
  camera.aspect = document.body.clientWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

animate();
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  cube.rotation.x += 10 * delta;
  cube.rotation.y += 10 * delta;
  renderer.render(scene, camera);
}
