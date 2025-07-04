import { OrbitControls, useGLTF } from '@react-three/drei'
import { useEffect } from 'react'
import { Mesh, MeshStandardMaterial } from 'three'

function TshirtModel({ color }: { color: string }) {
  const { scene } = useGLTF('/tshirt.glb')

  useEffect(() => {
    

    scene.traverse((child) => {
      if (child instanceof Mesh && child.name === 'T-Shirt_Material_0') {
        child.material = new MeshStandardMaterial({color:color})
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
