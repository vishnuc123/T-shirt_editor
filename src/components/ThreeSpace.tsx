import { OrbitControls, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { Mesh, MeshStandardMaterial, Color } from 'three'

function TshirtModel({ color }: { color: string }) {
  const { scene } = useGLTF('/tshirt.glb')

  useEffect(() => {
    const customMaterial = new MeshStandardMaterial({
      color: new Color(color),
      metalness: 0.3,
      roughness: 0.7,
    })

    scene.traverse((child) => {
      if (child instanceof Mesh && child.name === 'T-Shirt_Material_0') {
        child.material = customMaterial
        child.material.needsUpdate = true
      }
    })
  }, [scene, color])

  return <primitive object={scene} position={[0, -0.5, 0]} />
}

useGLTF.preload('/models/tshirt.glb')

const ThreeSpace = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, -1]} intensity={1.5} />
      <TshirtModel color="#00FF00" />
      <OrbitControls />
    </>
  )
}

export default ThreeSpace
