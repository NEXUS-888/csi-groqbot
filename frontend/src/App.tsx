import { useState } from 'react'
import './App.css'

function App() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [text, setText] = useState('')
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8000/analyze/image', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Error analyzing image:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAudioFile(e.target.files[0])
      const formData = new FormData()
      formData.append('file', e.target.files[0])
      
      try {
        setLoading(true)
        const response = await fetch('http://localhost:8000/analyze/audio', {
          method: 'POST',
          body: formData,
        })
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Error analyzing audio:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleTextAnalysis = async () => {
    if (!text) return
    
    const formData = new FormData()
    formData.append('text', text)
    
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8000/analyze/text', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error analyzing text:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">CSI GroqBot</h1>
                
                {/* Image Analysis Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Image Analysis</h2>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Audio Analysis Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Audio Analysis</h2>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="w-full p-2 border rounded"
                  />
                </div>

                {/* Text Analysis Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Text Analysis</h2>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows={4}
                    placeholder="Enter text for analysis..."
                  />
                  <button
                    onClick={handleTextAnalysis}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Analyze Text
                  </button>
                </div>

                {/* Results Section */}
                {loading && (
                  <div className="text-center">
                    <p>Analyzing...</p>
                  </div>
                )}
                
                {results && !loading && (
                  <div className="mt-8 p-4 bg-gray-50 rounded">
                    <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(results, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 