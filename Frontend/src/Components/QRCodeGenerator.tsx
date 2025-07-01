import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  data: "",
  dotsOptions: {
    color: "#000000",
    type: "square"
  },
  cornersSquareOptions: {
    type: "square",
    color: "#000000"
  },
  backgroundOptions: {
    color: "#ffffff"
  }
});

const QRCodeGenerator: React.FC = () => {
  const [url, setUrl] = useState("");
  const [pattern, setPattern] = useState<'square' | 'dots' | 'rounded'>("square");
  const [corner, setCorner] = useState<'square' | 'dot' | 'extra-rounded'>("square");
  const [color, setColor] = useState("#000000");

  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    qrCode.append(qrRef.current!);
  }, []);

  const handleGenerate = () => {
    qrCode.update({
      data: url,
      dotsOptions: {
        color: color,
        type: pattern
      },
      cornersSquareOptions: {
        type: corner,
        color: color
      }
    });
  };

  return (
    <div className="p-4 mx-auto w-[70%] border-2">
      <h2 className="text-xl font-semibold mb-4">Styled QR Code Generator</h2>

  <div className='w-[80%] flex justify-between'>
    <div className='border w-[50%]'>
  
      <input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <label>Pattern:</label>
      <select value={pattern} onChange={(e) => setPattern(e.target.value as 'square' | 'dots' | 'rounded')} className="w-full border p-2 mb-4">
        <option value="square">Square</option>
        <option value="dots">Dots</option>
        <option value="rounded">Rounded</option>
      </select>

      <label>Corners:</label>
      <select value={corner} onChange={(e) => setCorner(e.target.value as 'square' | 'dot' | 'extra-rounded')} className="w-full border p-2 mb-4">
        <option value="square">Square</option>
        <option value="dot">Dot</option>
        <option value="extra-rounded">Extra Rounded</option>
      </select>

      <label>Color:</label>
      <div className="flex gap-2 mb-4">
        {['#000000', '#FF0000', '#00ADEF', '#FFA500'].map(clr => (
          <button
            key={clr}
            onClick={() => setColor(clr)}
            className={`w-8 h-8 rounded-full`}
            style={{
              backgroundColor: clr,
              border: color === clr ? '3px solid blue' : '1px solid gray'
            }}
          />
        ))}
      </div>
      
      <button onClick={handleGenerate} className="bg-blue-600 text-white px-4 py-2 rounded mb-4">
        Generate QR Code
      </button>
    </div>

      <div className='border flex justify-center items-center' ref={qrRef} />
  </div>  
    
    </div>
  );
};

export default QRCodeGenerator;
