import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { useEffect } from 'react'
import { Mesh, MeshStandardMaterial } from 'three'
import * as THREE from 'three'

function TshirtModel({
  color,
  textureSrc,
  offset,
  repeat,
  rotation,
}: {
  color: string
  textureSrc: string
  offset: { x: number; y: number }
  repeat: { x: number; y: number }
  rotation: number
}) {
  const { scene } = useGLTF('/tshirt.glb')
  const [normalTexture] = useTexture([textureSrc || '/textures/texture1.jpg'])

  useEffect(() => {
    if (!normalTexture) return

    normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping
    normalTexture.offset.set(offset.x, offset.y)
    normalTexture.repeat.set(repeat.x, repeat.y)
    normalTexture.rotation = rotation
    normalTexture.needsUpdate = true

    scene.traverse((child) => {
      if (child instanceof Mesh && child.name === 'T-Shirt_Material_0') {
        child.material = new MeshStandardMaterial({
          color,
          map: normalTexture,
          roughness: 0.65,
        })
        child.material.needsUpdate = true
      }
    })
  }, [scene, color, normalTexture, offset, repeat, rotation])

  return <primitive object={scene} position={[0, -0.5, 0]} />
}

useGLTF.preload('/tshirt.glb')

const ThreeSpace = ({
  color,
  textureSrc,
  offset,
  repeat,
  rotation,
}: {
  color: string
  textureSrc: string
  offset: { x: number; y: number }
  repeat: { x: number; y: number }
  rotation: number
}) => {
  return (
    <>
      <ambientLight intensity={0.10} />
      <directionalLight position={[0, 0, -1]} intensity={0.5} />
      <TshirtModel
        color={color}
        textureSrc={textureSrc}
        offset={offset}
        repeat={repeat}
        rotation={rotation}
      />
      <OrbitControls />
    </>
  )
}

export default ThreeSpace
