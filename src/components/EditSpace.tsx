import { Canvas } from '@react-three/fiber'
import ThreeSpace from './ThreeSpace'
import { useRef, useState } from 'react'


const EditSpace = () => {
  const [color, setColor] = useState<string | undefined>('')
  const inputref = useRef<HTMLInputElement>(null)
  // const popupRef = useRef<HTMLButtonElement>(null)
  const [popUpVisible,setPopUpVisible] = useState(false)

  const handleColor = () => {
    setColor(inputref.current?.value)
  }

  const texturePopup = () => {
    setPopUpVisible(previous => !previous);

  }

  const handleImageTexture = (e:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
    const target = e.target as HTMLImageElement
    if(target.tagName === "IMG"){
      console.log(target.src)
    }
  }
  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100 gap-6">
      <div className={`${popUpVisible?'block':'hidden'} absolute rounded-2xl p-5 popup z-99 w-[80VW] h-90 bg-amber-100  border-2 border-red-500`}>
        <button onClick={texturePopup} className={` absolute right-0 p-2 text-3xl text-red-500 font-bold cursor-pointer hover:scale-110`}>X</button>
        <h1 className='font-mono text-3xl font-semibold underline'>Available textures</h1>
        <div className='flex justify-start p-5 space-x-5' onClick={handleImageTexture}>
        <div className='w-40 h-40  bg-black'><img src="/textures/texture1.jpg" className='object-fill h-full hover:scale-110 duration-500' alt="" /></div>
        <div className='w-40 h-40  bg-black'><img src="/textures/texture2.jpg" className='object-fill h-full hover:scale-110 duration-500' alt="" /></div>
        <div className='w-40 h-40  bg-black'><img src="/textures/texture3.jpg" className='object-fill h-full hover:scale-110 duration-500' alt="" /></div>


        </div>
      </div>

      {/* Canvas Container */}
      <div
        className="
          bg-amber-100 
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
          <ThreeSpace color={color} />
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 1, 2]} intensity={1.2} />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <input
          ref={inputref}
          type="text"
          placeholder="#FF0000"
          maxLength={7}
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
        <button  className='bg-amber-500 w-30 h-10 rounded-full' onClick={texturePopup}>Add textures</button>
      </div>
      
    </div>
  )
}

export default EditSpace
