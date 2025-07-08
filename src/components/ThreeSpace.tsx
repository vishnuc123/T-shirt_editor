import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useEffect } from 'react'
import { Mesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'

function TshirtModel({ color }: { color: string }) {
  const { scene } = useGLTF('/tshirt.glb')

  const [normalTexture] = useTexture(['/textures/texture1.jpg'])

  // useFrame(() => {
  //   normalTexture.offset.x+=0.001
  // })
  useEffect(() => {

    normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping
    normalTexture.repeat.set(2,2)
    normalTexture.minFilter = THREE.LinearMipMapLinearFilter
    normalTexture.magFilter = THREE.LinearFilter
    normalTexture.offset.set(50,50)
    normalTexture.needsUpdate = true



    scene.traverse((child) => {
      if (child instanceof Mesh && child.name === 'T-Shirt_Material_0') {
        child.material = new MeshStandardMaterial({color:color,map:normalTexture,roughness:0.65})
        child.material.needsUpdate = true
        
      }
    })

    
  }, [scene, color])

  return <primitive object={scene} position={[0, -0.5, 0]} />
}

useGLTF.preload('/models/tshirt.glb')

const ThreeSpace = ({color}:{color:string}) => {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, -1]} intensity={0.5} />
      <TshirtModel color={color} />
      <OrbitControls />
    </>
  )
}

export default ThreeSpace
