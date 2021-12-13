import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Day13VisualizationData } from '../../solutions';
import { getViewportSize, px } from '../calendar/calendarHelpers';
import { ContainerContext } from '../services/container';
import './day13fold.css';

const bgColor = '#000000';
const pixelColor = '#FFFFFF';
const foldColor = '#00FF00';

export default function Day13Fold(): JSX.Element {
    const { runtimeSolutionService } = useContext(ContainerContext);
    const [visData, setVisData] = useState<Day13VisualizationData>();
    const [stepIndex, setStep] = useState(0);
    const [status, setStatus] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const showLineRef = useRef(true);

    /** Solve day 13 and get visualization data */
    useEffect(() => {
        const d13 = runtimeSolutionService.runtimeSolutions.get(13);
        const unsubscribe = d13?.onChange.subscribe(rs => {
            const part2State = rs.states[1];
            if (part2State.kind === 'result' && part2State.result && part2State.visualizationData) {
                setVisData(part2State.visualizationData as Day13VisualizationData);
            }
        });
        d13?.start();
        return unsubscribe;
    }, [runtimeSolutionService.runtimeSolutions]);

    /** Draw the image */
    const redraw = useCallback(() => {
        if (!containerRef.current || !canvasRef.current) {
            return;
        }

        // Size
        const container = containerRef.current!;
        const context = canvasRef.current!.getContext('2d')!;
        const { vw, vh } = getViewportSize();
        const canvasWidth = (context.canvas.width = vw);
        const canvasHeight = (context.canvas.height = vh);
        container.style.height = px(canvasHeight);
        container.style.width = px(canvasWidth);

        // Scaling
        if (!visData) { return; }
        const { points, fold } = visData.steps[stepIndex];
        const dataWidth = points.reduce((a, p) => Math.max(a, p.x), -1) + 3;
        const dataHeight = points.reduce((a, p) => Math.max(a, p.y), -1) + 3;
        const scaleX = canvasWidth / dataWidth;
        const scaleY = canvasHeight / dataHeight;
        const scale = Math.min(scaleX, scaleY);
        const pointSize = Math.max(10, scale);
        const offsetX = Math.max(0, (canvasWidth - (dataWidth - 2) * scale) / 2);
        const offsetY = Math.max(0, (canvasHeight - (dataHeight - 2) * scale) / 2);

        // Background
        context.fillStyle = bgColor;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        // Fold line
        if (fold && showLineRef.current) {
            context.fillStyle = foldColor;
            context.fillRect(
                (fold.x ? fold.x : 0) * scale + (fold.x ? offsetX : 0),
                (fold.y ? fold.y : 0) * scale + (fold.y ? offsetY : 0),
                fold.x ? pointSize : canvasWidth,
                fold.y ? pointSize : canvasHeight
            );
        }

        // Dots
        context.fillStyle = pixelColor;
        for (const point of points) {
            context.fillRect(point.x * scale + offsetX, point.y * scale + offsetY, pointSize, pointSize);
        }

        // Status
        setStatus(`Step ${stepIndex + 1}`);
    }, [stepIndex, visData]);

    /** Update popup rect if the window is resized */
    useEffect(() => {
        const onDocumentResize = () => {
            const { vw, vh } = getViewportSize();
            if (!visData) { return; }
            if (showLineRef.current && Math.min(vw, vh) * 2 < Math.max(vw, vh)) {
                showLineRef.current = false;
                setStep((stepIndex + 1) % visData.steps.length);
                return;
            } else {
                showLineRef.current = true;
            }
            setTimeout(() => redraw(), 100);
        };
        window.addEventListener('resize', onDocumentResize);
        screen.orientation.addEventListener('change', onDocumentResize);
        return () => {
            screen.orientation.removeEventListener('change', onDocumentResize);
            window.removeEventListener('resize', onDocumentResize);
        };
    }, [redraw, stepIndex, visData]);

    /** Initial draw */
    useEffect(() => redraw(), [redraw]);

    return (<div>{!visData ? (<h1>Loading...</h1>) : <div ref={containerRef} className='foldContainer'>
        <canvas ref={canvasRef}
            onClick={() => {
                setStep((stepIndex + 1) % visData.steps.length);
                redraw();
            }}></canvas>
        <div className="statusBar">
            {status}
        </div>
    </div>}</div>);
}