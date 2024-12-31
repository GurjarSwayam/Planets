import "./style.css";
import * as THREE from 'three';
import gsap from 'gsap';

// Scene setup
const scene = new THREE.Scene();

// Camera setup
const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 9;


// Renderer setup
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas , antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));



const radius = 1.3;
const segments = 64;
const colors = ["red", "green", "blue", "yellow"];
const OrbitRadius = 4.5;
const spheres = new THREE.Group();

for (let i = 0; i < 4; i++) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    const material = new THREE.MeshBasicMaterial({ color: colors[i]});
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

setInterval(() => {
    gsap.to(spheres.rotation, {
        y: `+=${Math.PI / 2}`,
        duration: 2,
        ease: "expo.easeInOut"
    });
}, 2500);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    // Render
    renderer.render(scene, camera);
}

animate();

