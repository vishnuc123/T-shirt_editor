import { Canvas } from '@react-three/fiber'
import ThreeSpace from './ThreeSpace'
import { useRef, useState } from 'react'

const EditSpace = () => {
    const [color , setColor] = useState('#FFFFFF')
    const inputref = useRef<HTMLInputElement>(null)

    const handleColor  = () => {
        setColor(inputref.current?.value)
    }
  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100 gap-6">
      {/* Canvas Container */}
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Space</h2>
        <Canvas camera={{ position: [0, 2, 5], fov: 20 }}>
          <ThreeSpace color={color}/>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 1, 1]} intensity={1.5} />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <input
        ref={inputref}
          type="text"
          placeholder="#FF0000"
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
        onClick={handleColor}
          className="
            bg-amber-500 
            hover:bg-amber-600 
            text-white 
            font-medium 
            py-2 
            px-4 
            rounded 
            shadow 
            transition-all 
            duration-300
          "
        >
          Apply Color
        </button>
      </div>
    </div>
  )
}

export default EditSpace
