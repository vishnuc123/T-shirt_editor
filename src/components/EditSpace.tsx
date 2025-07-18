import { Canvas } from '@react-three/fiber'
import ThreeSpace from './ThreeSpace'
import { useRef, useState } from 'react'

const EditSpace = () => {
  const DEFAULT_TEXTURE = '/textures/texture1.jpg'

  const [color, setColor] = useState<string>('') 
  const [texture, setTexture] = useState<string>(DEFAULT_TEXTURE)

  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [repeat, setRepeat] = useState({ x: 2, y: 2 })
  const [rotation, setRotation] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const [popUpVisible, setPopUpVisible] = useState(false)

  const handleColor = () => {
    setColor(inputRef.current?.value || '')
  }

  const texturePopup = () => {
    setPopUpVisible((prev) => !prev)
  }

  const handleResetTexture = () => {
    setTexture(DEFAULT_TEXTURE)
    setOffset({ x: 0, y: 0 })
    setRepeat({ x: 2, y: 2 })
    setRotation(0)
  }

  const handleFile = () => {
    const file = inputFileRef.current?.files?.[0]
    if (file && file.type === 'image/jpeg') {
      const reader = new FileReader()
      reader.onloadend = () => {
        setTexture(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please upload a .jpg image')
    }
  }

  const handleImageTexture = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLImageElement
    if (target.tagName === 'IMG') {
      setTexture(target.src)
    }
  }

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100 gap-6">
      {/* Texture popup */}
      <div className={`${popUpVisible ? 'block' : 'hidden'} absolute rounded-2xl p-5 popup z-50 w-[80vw] bg-amber-100 border-2 border-red-500`}>
        <button onClick={texturePopup} className="absolute right-2 top-2 text-3xl text-red-500 font-bold hover:scale-110">X</button>
        <h1 className="font-mono text-3xl font-semibold underline">Available Designs</h1>
        <div className="flex justify-start p-5 space-x-5" onClick={handleImageTexture}>
          {['texture1.jpg', 'texture2.jpg', 'texture3.jpg'].map((tex, index) => (
            <div key={index} className="w-40 h-40 bg-black">
              <img src={`/textures/${tex}`} className="object-fill h-full hover:scale-110 duration-500" />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <input ref={inputFileRef} type="file" accept=".jpg" className="h-10 bg-blue-200 rounded-2xl p-2 hover:bg-blue-500" />
          <button onClick={handleFile} className="w-20 bg-amber-400 rounded-full ml-5 font-mono hover:bg-amber-600">Apply</button>
          <button onClick={handleResetTexture} className="ml-5 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded-full">
            Use Default Texture
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="bg-amber-100 w-full max-w-[1200px] h-[60vh] rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Space</h2>
        <Canvas camera={{ position: [0, 2, 5], fov: 20 }}>
          <ThreeSpace color={color} textureSrc={texture} offset={offset} repeat={repeat} rotation={rotation} />
          <ambientLight intensity={0.20} />
          <directionalLight intensity={1.0} position={[0,0,0.20]} />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="#FF0000"
          maxLength={7}
          className="border border-gray-300 rounded px-3 py-2"
        />
        <button onClick={handleColor} className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded">
          Apply Color
        </button>
        <button onClick={texturePopup} className="bg-amber-500 w-30 h-10 rounded-full px-4 py-2">
          Add Design
        </button>
      </div>

      {/* Texture Controls */}
      <div className="w-full max-w-xl mt-6 space-y-2 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <label>Offset X:</label>
          <input type="range" min={-2} max={2} step={0.01} value={offset.x} onChange={(e) => setOffset({ ...offset, x: parseFloat(e.target.value) })} />
        </div>
        <div className="flex items-center gap-2">
          <label>Offset Y:</label>
          <input type="range" min={-2} max={2} step={0.01} value={offset.y} onChange={(e) => setOffset({ ...offset, y: parseFloat(e.target.value) })} />
        </div>
        <div className="flex items-center gap-2">
          <label>Repeat X:</label>
          <input type="range" min={0.1} max={10} step={0.1} value={repeat.x} onChange={(e) => setRepeat({ ...repeat, x: parseFloat(e.target.value) })} />
        </div>
        <div className="flex items-center gap-2">
          <label>Repeat Y:</label>
          <input type="range" min={0.1} max={10} step={0.1} value={repeat.y} onChange={(e) => setRepeat({ ...repeat, y: parseFloat(e.target.value) })} />
        </div>
        <div className="flex items-center gap-2">
          <label>Rotation:</label>
          <input type="range" min={-3.14} max={3.14} step={0.01} value={rotation} onChange={(e) => setRotation(parseFloat(e.target.value))} />
        </div>
      </div>
    </div>
  )
}

export default EditSpace
