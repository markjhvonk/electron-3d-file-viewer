// import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import ConcreteMap from '../../assets/textures/concrete-map.jpg';
import PaddingMap from '../../assets/textures/padding.jpg';

// Tutorial: https://youtu.be/pUgWfqWZWmM?t=2580
// Timestamp: 43:00 - Interactivity

function CustomSquare(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef();
    const colorMap = useLoader(TextureLoader, PaddingMap);
    useFrame((state, delta) => (
        ref.current.rotation.x += 0.005,
        ref.current.rotation.y += 0.005
    ));

    return (
        <mesh
            {...props}
            ref={ref}
            scale={1}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial 
                color='purple'
                roughness={0.1}
                metalness={.5}
                normalMap={colorMap}/>
        </mesh>
    );
}

function CustomSphere(props) {
    const ref = useRef();
    const colorMap = useLoader(TextureLoader, ConcreteMap);
    useFrame((state, delta) => (
        ref.current.rotation.x += 0.005,
        ref.current.rotation.y += 0.005
    ));

    return(
        <mesh
            {...props}
            ref={ref}
            scale={1}>
            <sphereBufferGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
                color='brown'
                roughness={0.4}
                metalness={.7}
                normalMap={colorMap}
                />
        </mesh>
    )
}


function FileViewer() {
    return (
        <div style={{ width: "100vw", height: "100vh" }}>
            <Canvas >
                <Suspense fallback={null}>
                    <pointLight position={[-10, -10, -10]} />
                    <pointLight color='red' position={[10, 10, 10]} intensity='.8'/>
                    <CustomSquare position={[-1.2, 0, 0]} />
                    <CustomSphere position={[1.2, 0, 0]} />
                </Suspense>
            </Canvas>
        </div>
    );
}

export default FileViewer;