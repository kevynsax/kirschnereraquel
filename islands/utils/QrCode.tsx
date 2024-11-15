import { generate } from "npm:lean-qr";
import { useEffect, useRef } from 'preact/hooks';

interface Props{
    text: string;
}

export const QrCode = (props: Props) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(!props.text)
            return;

        const qrCode = generate(props.text);

        if(!canvasRef.current)
            return;

        qrCode.toCanvas(canvasRef.current);
    }, [props.text, canvasRef.current]);

    return (
        <div className='pix'>
            <canvas ref={canvasRef} style={{imageRendering: 'pixelated', width: 200, height: 200}}></canvas>
        </div>
    )
}
