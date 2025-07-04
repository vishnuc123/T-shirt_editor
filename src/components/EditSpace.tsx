import { Canvas } from '@react-three/fiber'
import ThreeSpace from './ThreeSpace'

const EditSpace = () => {
  return (
    <div className="p-4 flex justify-center items-center min-h-screen bg-gray-100">
      <div
        className="
          bg-amber-200 
          w-full 
          max-w-[1200px] 
          h-[60vh] 
          rounded-lg 
          shadow-lg 
          p-4
          transition-all 
          duration-300
          sm:h-[50vh] 
          md:h-[55vh] 
          lg:h-[60vh] 
          xl:h-[70vh]
        "
      >
        <h2 className="text-xl font-bold text-gray-800">Edit Space</h2>
            <Canvas camera={{ position: [0, 2, 5], fov: 20 }}>
        <ThreeSpace /> 
                      <pointLight position={[0,1,1]} intensity={1.5}/>

</Canvas>
      </div>
    </div>
  )
}

export default EditSpace
