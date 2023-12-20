import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// ? change the Mesh material into standard
// const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });

const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// ? create lightning into the object
// ? 0x => Hexidecimal Literal
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// ? No need to call the render multiple times
// ? create the render inside the function to run each time we make any changes
// renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
	requestAnimationFrame(animate);

	torus.rotation.x += 0.01;
	torus.rotation.y += 0.005;
	torus.rotation.z += 0.01;

	controls.update();

	renderer.render(scene, camera);
}

animate();
