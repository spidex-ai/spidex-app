'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { useColorMode } from '@/app/_contexts/color-mode';
import { ColorType, createChart, IChartApi, Time } from 'lightweight-charts';

interface CandlestickData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface CandlestickChartProps {
  data: CandlestickData[];
}

export function CandlestickChart({ data }: CandlestickChartProps) {
  const { mode } = useColorMode();

  const colors = {
    backgroundColor: mode === 'dark' ? '#121212' : 'white',
    lineColor: mode === 'dark' ? '#404040' : '#f5f5f5',
    textColor: mode === 'dark' ? 'white' : 'black',
    upColor: mode === 'dark' ? '#26a69a' : '#26a69a',
    downColor: mode === 'dark' ? '#ef5350' : '#ef5350',
    wickUpColor: mode === 'dark' ? '#26a69a' : '#26a69a',
    wickDownColor: mode === 'dark' ? '#ef5350' : '#ef5350',
  };

  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;

    const updateSize = () => {
      const { clientWidth, clientHeight } = container;
      setContainerSize({ width: clientWidth, height: clientHeight });
    };

    updateSize();

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  useLayoutEffect(() => {
    const container = chartContainerRef.current;
    if (!container || containerSize.width === 0 || containerSize.height === 0)
      return;

    // Calculate dynamic precision based on data values
    const calculatePrecision = (data: CandlestickData[]) => {
      if (data.length === 0) return { precision: 5, minMove: 0.00001 };

      const allValues = data.flatMap(item => [
        item.open,
        item.high,
        item.low,
        item.close,
      ]);
      const minValue = Math.min(...allValues.filter(v => v > 0));

      // Calculate precision based on the smallest value
      const decimalPlaces = Math.max(2, Math.ceil(-Math.log10(minValue)) + 2);
      const precision = Math.min(decimalPlaces, 12); // Cap at 12 for performance
      const minMove = Math.pow(10, -precision);

      return { precision, minMove };
    };

    const { precision, minMove } = calculatePrecision(data);

    const chart = createChart(container, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: colors.textColor,
      },
      grid: {
        vertLines: { color: colors.lineColor },
        horzLines: { color: colors.lineColor },
      },
      width: containerSize.width,
      height: containerSize.height,
      handleScroll: true,
      handleScale: true,
      rightPriceScale: {
        borderColor: colors.lineColor,
      },
      timeScale: {
        borderColor: colors.lineColor,
        visible: true,
        timeVisible: true,
        fixLeftEdge: true,
        fixRightEdge: true,
        tickMarkFormatter: (time: Time) => {
          const date = new Date((time as number) * 1000);
          const now = new Date();
          const diffMs = now.getTime() - date.getTime();
          const diffDays = diffMs / (1000 * 60 * 60 * 24);

          // Adaptive formatting based on time distance
          if (diffDays < 1) {
            // Same day - show time only
            return date.toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
          } else if (diffDays < 7) {
            // Within a week - show day and time
            return date.toLocaleDateString(undefined, {
              weekday: 'short',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            });
          } else if (diffDays < 365) {
            // Within a year - show month and day
            return date.toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
            });
          } else {
            // Older than a year - show month and year
            return date.toLocaleDateString(undefined, {
              month: 'short',
              year: 'numeric',
            });
          }
        },
      },
      crosshair: {
        mode: 1, // Normal crosshair mode
        vertLine: {
          color: colors.textColor,
          width: 1,
          style: 2, // Dashed
          labelBackgroundColor: colors.lineColor,
        },
        horzLine: {
          color: colors.textColor,
          width: 1,
          style: 2, // Dashed
          labelBackgroundColor: colors.lineColor,
        },
      },
      localization: {
        timeFormatter: (time: Time) => {
          const date = new Date((time as number) * 1000);
          return date.toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
        },
      },
    });

    chartRef.current = chart;

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: colors.upColor,
      downColor: colors.downColor,
      borderVisible: false,
      wickUpColor: colors.wickUpColor,
      wickDownColor: colors.wickDownColor,
      priceFormat: {
        type: 'price',
        precision,
        minMove,
      },
    });

    candlestickSeries.setData(data);

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [containerSize, colors, data]);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-full max-h-full overflow-hidden"
      style={{
        position: 'relative',
        minHeight: '100%',
        minWidth: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
      }}
    />
  );
}
