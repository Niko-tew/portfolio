const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.setZ(4);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.querySelector('#bg')
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x202020);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(5, 0, 0);
scene.add(cube);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);

scene.add(ambientLight, dirLight);

function addStar() {
    const geometry = new THREE. SphereGeometry (0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xfffff })
    const star = new THREE.Mesh ( geometry, material );
    const [x, y, z] = Array(3). fill().map(() => THREE.MathUtils. randFloatSpread( 100 ) );
    star.position.set(x, y, z);
    scene.add(star);
}

Array(400).fill().forEach(addStar);

const waterTex = new THREE.TextureLoader().load('./assets/textures/water.jpg');
scene.background = waterTex;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.075;
    cube.rotation.z += 0.05;

    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
    camera.position.z = t * -0.01;
}

document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});
