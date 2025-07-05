import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import { Mesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'

function TshirtModel({ color }: { color: string }) {
  const { scene } = useGLTF('/tshirt.glb')

  const [normaltexture,diffusetexture] = useTexture(['/textures/normaltshirt.jpg','/textures/diffusetshirt.jpg'])
  useEffect(() => {

    diffusetexture.wrapS = diffusetexture.wrapT = THREE.RepeatWrapping
    normaltexture.wrapS = normaltexture.wrapT = THREE.RepeatWrapping
    diffusetexture.repeat.set(0.30,0.30)
    normaltexture.repeat.set(0.30,0.30)

    scene.traverse((child) => {
      if (child instanceof Mesh && child.name === 'T-Shirt_Material_0') {
        child.material = new MeshStandardMaterial({color:color,map:diffusetexture})
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
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, -1]} intensity={0.5} />
      <TshirtModel color={color} />
      <OrbitControls />
    </>
  )
}

export default ThreeSpace
