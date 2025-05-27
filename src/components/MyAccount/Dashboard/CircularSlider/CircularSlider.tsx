import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import styles from './CircularSlider.module.css';

interface Curve {
  x: number;
  y: number;
  cpx: number;
  cpy: number;
  endx: number;
  endy: number;
}

interface CurveRangeProps {
  min: number;
  max: number;
  step: number;
  setSliderValue: (value: number) => void;
  finalValue: number;
  startValue: number;
  answer: number;
  defaultValue?: number;
  isRupee: boolean;
}

const CurveRange: React.FC<CurveRangeProps> = ({
  min,
  max,
  step,
  setSliderValue,
  finalValue,
  startValue,
  answer,
  defaultValue,
  isRupee
}) => {
  const curve = useMemo(() => {
    return {
      x: 10,
      y: 150,
      cpx: 130,
      cpy: 140,
      endx: 150,
      endy: 20,
    };
  }, []);

  const initialValue = answer !== 0 ? answer : defaultValue !== undefined ? defaultValue : min;
  const initialPercent = 1 - (initialValue - startValue) / (finalValue - startValue);

  const [percent, setPercent] = useState(initialPercent);
  const [value, setValue] = useState(initialValue);
  const [isInputActive, setIsInputActive] = useState<boolean>(false);

  const curveEl = useRef<SVGPathElement>(null);
  const thumbEl = useRef<SVGCircleElement>(null);
  const svgEl = useRef<SVGSVGElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const getQuadraticBezierXYatPercent = useCallback(
    (percent: number) => {
      const { x, y, cpx, cpy, endx, endy } = curve;
      const xValue =
        Math.pow(1 - percent, 2) * x +
        2 * (1 - percent) * percent * cpx +
        Math.pow(percent, 2) * endx;
      const yValue =
        Math.pow(1 - percent, 2) * y +
        2 * (1 - percent) * percent * cpy +
        Math.pow(percent, 2) * endy;
      return { x: xValue, y: yValue };
    },
    [curve]
  );

  const calculateValue = useCallback(
    (percent: number) => {
      const newValue = startValue + (finalValue - startValue) * (1 - percent);
      return Math.round(newValue / step) * step;
    },
    [startValue, finalValue, step]
  );

  const drawCurve = () => {
    if (curveEl.current) {
      curveEl.current.setAttribute(
        'd',
        `M${curve.x},${curve.y} Q${curve.cpx},${curve.cpy} ${curve.endx},${curve.endy}`
      );
    }
  };

  const drawThumb = (percent: number) => {
    const pos = getQuadraticBezierXYatPercent(percent);
    const newValue = calculateValue(percent);
    if (!isInputActive) {
      setValue(newValue);
    }
    setSliderValue(newValue);
    if (thumbEl.current) {
      thumbEl.current.setAttribute('cx', pos.x.toString());
      thumbEl.current.setAttribute('cy', pos.y.toString());
    }
  };

  const moveThumb = (newPercent: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(() => {
      setPercent(newPercent);
      drawThumb(newPercent);
    });
  };

  const snapToValue = useCallback(
    (newPercent: number) => {
      const newValue = calculateValue(newPercent);
      const snappedPercent = 1 - (newValue - startValue) / (finalValue - startValue);
      return snappedPercent;
    },
    [calculateValue, startValue, finalValue]
  );

  const handleDrag = (e: any) => {
    e.preventDefault();
    if (svgEl.current) {
      const svgRect = svgEl.current.getBoundingClientRect();
      const offsetX =
        'touches' in e ? e.touches[0].clientX - svgRect.left : e.clientX - svgRect.left;
      const sensitivity = 0.1;
      const newPercent = Math.max(
        0,
        Math.min(
          1,
          1 - (offsetX - svgRect.width * sensitivity) / (svgRect.width * (1 - sensitivity))
        )
      );
      const snappedPercent = snapToValue(newPercent);
      moveThumb(snappedPercent);
    }
  };

  const handleDragStart = (e: any) => {
    e.preventDefault();
    setIsInputActive(false)
    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag, { passive: false });
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
  };

  const handleDragEnd = (e: any) => {
    e.preventDefault();
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, '');
    const newValue = parseFloat(inputValue);

    if (!isNaN(newValue)) {
      setIsInputActive(true);
      setValue(newValue);
      const newPercent = 1 - (newValue - startValue) / (finalValue - startValue);
      moveThumb(newPercent);
    } else {
      setValue(0);
    }
  };

  const formatSliderValue = (val: number, min: number, max: number, isRupee: boolean) => {
    if (!isRupee) {
      return `${val}`;
    } else {
      if (val > max) {
        let formattedValue = '';
        if (val >= 10000000) {
          formattedValue = `${(val / 10000000).toFixed(0)}Cr+`;
        } else if (val >= 100000) {
          formattedValue = `${(val / 100000).toFixed(0)}L+`;
        }
        return `Rs. ${formattedValue}`;
      } else {
        return `Rs. ${val.toLocaleString("en-In", {
          maximumFractionDigits: 0
        })}`;
      }
    }
  };

  useEffect(() => {
    drawCurve();
    drawThumb(percent);

    const handleResize = () => {
      drawCurve();
      drawThumb(percent);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [percent]);

  return (
    <div className={styles.wrap}>
      <div className='flex justify-center items-center sm:justify-end'>
        <div className='bg-[#00B3B026] border border-[#035782] rounded-md text-[#035782] font-medium px-4 w-fit mb-2 h-10 flex justify-center items-center'>
          <input
            type={`${isRupee ? 'text' : 'number'}`}
            min={min}
            max={max}
            value={formatSliderValue(value, min, max, isRupee ? isRupee : false)}
            onChange={handleInputChange}
            onBlur={() => setIsInputActive(false)}
            className="w-auto text-center bg-transparent focus:outline-none focus:border-transparent z-50"
          />
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <svg
          ref={svgEl}
          id="slider"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMinYMin meet"
          style={{ width: '100%', height: 'auto', transform: "rotate(180deg)", marginTop: "-50px" }}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <path ref={curveEl} id="curve" stroke="#CFCFCF" strokeWidth="4" fill="none" />
          <circle ref={thumbEl} id="thumb" stroke="#035782" fill="#035782" r="8" />
        </svg>
      </div>
    </div>
  );
};

export default CurveRange;
