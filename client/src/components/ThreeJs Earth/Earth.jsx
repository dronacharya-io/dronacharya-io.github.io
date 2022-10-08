import React, {useRef} from 'react'
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { Suspense } from 'react'
import EarthDayMap from "./Earth Textures/8k_earth_daymap.jpg"
import EarthNormalMap from "./Earth Textures/8k_earth_normal_map.jpg"
import EarthspecularMap from "./Earth Textures/8k_earth_specular_map.jpg"
import EarthCloudsMap from "./Earth Textures/8k_earth_clouds.jpg"
import { pointLight, TextureLoader } from 'three'
import { OrbitControls, Stars} from "@react-three/drei"
import * as THREE from "three"

function Earth(props) {

    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(TextureLoader, [EarthDayMap, EarthNormalMap, EarthspecularMap, EarthCloudsMap])
    const earthRef =  useRef()
    const cloudsRef = useRef()
    useFrame(({clock})=>{
        const elapseTime = clock.getElapsedTime()
       earthRef.current.rotation.y =  elapseTime / 16;                                                                                                                                                                                                                                                                                            
       cloudsRef.current.rotation.y =  elapseTime / 16
    })
  return (
    <>
        <ambientLight intensity={0.8} />
        <pointLight color="#f6f3ea" position={[2,0,2]} intensity={1.2} />
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true}/>
        <mesh ref={cloudsRef} >
            <sphereGeometry args={[ 1.805, 32, 32 ]} />
            <meshPhongMaterial map={cloudsMap} opacity={0.4} depthWrite={false} transparent={true} side={THREE.DoubleSide} />
        </mesh>
        <mesh ref={earthRef} >
            <sphereGeometry args={[ 1.8 , 32, 32 ]} />
            <meshPhongMaterial specularMap={specularMap} />
            <meshStandardMaterial map={colorMap} normalMap={normalMap} metalness={0.4} roughness={0.7} />
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={0.6} panSpeed={0.5} rotationSpeed={0.4} />
        </mesh>
    </>
  )
}

export default Earth