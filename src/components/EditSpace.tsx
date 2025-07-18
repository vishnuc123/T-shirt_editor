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

  const handleImageTexture = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLImageElement
    if (target.tagName === 'IMG') {
      setTexture(target.src)
    }
  }

  return (
    <div className="p-4 flex flex-col items-center min-h-screen bg-gray-100 gap-6 relative">
      
      {/* Texture popup */}
      {popUpVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-50">
          <div className="bg-amber-100 border-2 border-red-500 rounded-2xl p-6 max-w-[90vw] w-full relative">
            <button onClick={texturePopup} className="absolute right-4 top-2 text-3xl text-red-500 font-bold hover:scale-110">X</button>
            <h1 className="font-mono text-2xl md:text-3xl font-semibold underline mb-4">Available Designs</h1>
            <div className="flex flex-wrap gap-4 justify-center" onClick={handleImageTexture}>
              {['texture1.jpg', 'texture2.jpg', 'texture3.jpg'].map((tex, index) => (
                <div key={index} className="w-28 h-28 md:w-40 md:h-40 bg-black">
                  <img src={`/textures/${tex}`} className="object-fill w-full h-full hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <input ref={inputFileRef} type="file" accept=".jpg" className="h-10 bg-blue-200 rounded-2xl p-2 hover:bg-blue-500" />
              <button onClick={handleFile} className="bg-amber-400 rounded-full font-mono px-4 py-2 hover:bg-amber-600">
                Apply
              </button>
              <button onClick={handleResetTexture} className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded-full">
                Use Default Texture
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <div className="bg-amber-100 w-full max-w-6xl aspect-video rounded-lg shadow-lg p-2 sm:p-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Edit Space</h2>
        <Canvas camera={{ position: [0, 2, 5], fov: 20 }}>
          <ThreeSpace color={color} textureSrc={texture} offset={offset} repeat={repeat} rotation={rotation} />
          <ambientLight intensity={0.2} />
          <directionalLight intensity={1.0} position={[0, 0, 0.2]} />
        </Canvas>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <input
          ref={inputRef}
          type="text"
          placeholder="#FF0000"
          maxLength={7}
          className="border border-gray-300 rounded px-3 py-2 w-40"
        />
        <button onClick={handleColor} className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded">
          Apply Color
        </button>
        <button onClick={texturePopup} className="bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded">
          Add Design
        </button>
      </div>

      {/* Texture Controls */}
      <div className="w-full max-w-2xl mt-6 space-y-4 text-sm sm:text-base text-gray-700">
        {[
          { label: 'Offset X', value: offset.x, onChange: (val: number) => setOffset({ ...offset, x: val }), min: -2, max: 2, step: 0.01 },
          { label: 'Offset Y', value: offset.y, onChange: (val: number) => setOffset({ ...offset, y: val }), min: -2, max: 2, step: 0.01 },
          { label: 'Repeat X', value: repeat.x, onChange: (val: number) => setRepeat({ ...repeat, x: val }), min: 0.1, max: 10, step: 0.1 },
          { label: 'Repeat Y', value: repeat.y, onChange: (val: number) => setRepeat({ ...repeat, y: val }), min: 0.1, max: 10, step: 0.1 },
          { label: 'Rotation', value: rotation, onChange: (val: number) => setRotation(val), min: -Math.PI, max: Math.PI, step: 0.01 },
        ].map((slider, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <label className="w-24">{slider.label}:</label>
            <input
              type="range"
              min={slider.min}
              max={slider.max}
              step={slider.step}
              value={slider.value}
              onChange={(e) => slider.onChange(parseFloat(e.target.value))}
              className="w-full"
            />
            <span className="w-10 text-right">{slider.value.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EditSpace
