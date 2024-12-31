import "./style.css";
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 9;


// Renderer setup
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Studio lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1);
keyLight.position.set(5, 5, 5);
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
fillLight.position.set(-5, 3, -5);
scene.add(fillLight);

const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
backLight.position.set(0, -5, -5);
scene.add(backLight);


const radius = 1.3;
const segments = 64;
const colors = ["red", "green", "blue", "yellow"];
const textures = ["./csilla/color.png","./earth/map.jpg","./venus/map.jpg","./volcanic/color.png"]

const OrbitRadius = 4.5;
const spheres = new THREE.Group();

// Invert the geometry so the texture is visible from inside

const starTexture = new THREE.TextureLoader().load('./stars.jpg');
// Create a large background sphere for stars
const starGeometry = new THREE.SphereGeometry(50, 64, 64);
const starMaterial = new THREE.MeshStandardMaterial({
    map: starTexture,
    opacity: 0.215,
    transparent: true,
    side: THREE.BackSide // Render the inside of the sphere
});
const starSphere = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starSphere);


const loader = new RGBELoader();
loader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/moonlit_golf_1k.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture; 
});


for (let i = 0; i < 4; i++) {
    
    const textureloader = new THREE.TextureLoader();
    const texture = textureloader.load(textures[i]);
    texture.colorSpace = THREE.SRGBColorSpace;

    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshStandardMaterial({map: texture});
    const sphere = new THREE.Mesh(geometry, material);


    const angle = ((i / 4) * (Math.PI * 2));
    sphere.position.x = Math.cos(angle) * OrbitRadius;
    sphere.position.z = Math.sin(angle) * OrbitRadius;
    spheres.add(sphere);
}
spheres.rotation.x = 0.1;
spheres.position.y = -0.8;
scene.add(spheres);
// Handle window resize
window.addEventListener('resize', () => {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // Render
    renderer.render(scene, camera);
}

animate();

