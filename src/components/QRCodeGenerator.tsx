"use client"
import React, { useState, useRef, Fragment } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator: React.FC = () => {
  const [values, setValues] = useState({
    input: "",
    color: "#000000",
    background: "#ffffff"
  })
  const [finishedValues, setFinishedValues] = useState({
    input: "",
    color: "#000000",
    background: "#ffffff"
  })
  const [isLoading, setIsLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  };

  const handleSetValues = () => {
    setFinishedValues(values)
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000);
  }

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Cria um novo canvas para personalização
      const newCanvas = document.createElement("canvas");
      newCanvas.width = canvas.width;
      newCanvas.height = canvas.height;
      const ctx = newCanvas.getContext("2d");

      if (ctx) {
        // Desenha o QR Code no novo canvas
        ctx.drawImage(canvas, 0, 0);

        // Salva a imagem como PNG com transparência
        const url = newCanvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode_transparente.png";
        link.click();
      }
    }
  };

  return (
    <div className="grid grid-cols-2 items-stretch justify-stretch w-full h-4/5 gap-6 px-[20%] py-[5%]">
      <div className="flex flex-col items-center justify-start gap-6">
        <input
          type="text"
          name="input"
          placeholder="Digite o texto ou URL"
          value={values.input}
          onChange={handleInputChange}
          className="outline-none px-4 py-2 rounded-md ring-purple-300 ring-[3px] hover:ring-purple-600 transition-all w-full"
        />
        <label htmlFor="color" className="flex items-center justify-start gap-3 font-medium text-white bg-purple-300 w-full px-4 py-2 rounded-md transition-all cursor-pointer hover:bg-purple-600">
          <div style={{ backgroundColor: values.color }} className="size-10 rounded-full"></div>
          <input
            type="color"
            value={values.color}
            onChange={handleInputChange}
            name="color"
            id="color"
            className="invisible w-0"
          />
          Cor do QR Code
        </label>
        <label htmlFor="background" className="flex items-center justify-start gap-3 font-medium text-white bg-purple-300 w-full px-4 py-2 rounded-md transition-all cursor-pointer hover:bg-purple-600">
          <div style={{ backgroundColor: values.background }} className="size-10 rounded-full"></div>
          <input
            type="color"
            value={values.background}
            onChange={handleInputChange}
            name="background"
            id="background"
            className="invisible w-0"
          />
          Cor de fundo
        </label>
        <button onClick={handleSetValues} className="bg-purple-500 transition-all hover:bg-purple-600 w-full text-white font-semibold rounded-md py-2">Gerar</button>
      </div>
      <div className="flex flex-col gap-6 items-center justify-center">
        {isLoading && <div className="size-10 border-purple-600 border-b-transparent border-4 rounded-full animate-spin"></div>}
        {!isLoading && finishedValues.input && <Fragment><QRCodeCanvas
          ref={canvasRef} // Referência ao canvas do QR Code
          value={finishedValues.input}
          size={200} // Tamanho do QR Code
          bgColor={finishedValues.background} // Fundo transparente
          fgColor={finishedValues.color} // Cor do QR Code
          level={"H"} // Nível de correção de erro (L, M, Q, H)
        />
          <button onClick={handleDownload} className="bg-purple-500 transition-all hover:bg-purple-600 w-[200px] text-white font-semibold rounded-md py-2">Salvar QR Code</button>
        </Fragment>
        }
      </div>
    </div>
  );
};

export default QRCodeGenerator;
