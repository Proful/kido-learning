import getStroke from "perfect-freehand"
import { PointerEventHandler, useEffect, useState } from "react"

const options = {
  size: 3,
  smoothing: 0.5,
  thinning: 0.5,
  streamline: 0.5,
  start: {
    taper: 0,
    cap: true,
  },
  end: {
    taper: 0,
    cap: true,
  },
}

const TOP = 120
const LEFT = 100

function getSvgPathFromStroke(stroke: number[][]) {
  if (!stroke.length) return ""

  const d = stroke.reduce(
    (acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length]
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2)
      return acc
    },
    ["M", ...stroke[0], "Q"]
  )

  d.push("Z")
  return d.join(" ")
}

type Point = [number, number, number]

const Drawing = ({ render }: { render: number }) => {
  const [points, setPoints] = useState<Point[]>([])
  const [bag, setBag] = useState<string[]>([])

  useEffect(() => {
    setBag([])
  }, [render])

  useEffect(() => {
    const stroke = getStroke(points, options)
    const svgPath = getSvgPathFromStroke(stroke)
    setBag([...bag, svgPath])
  }, [points])

  const handlePointerDown: PointerEventHandler<SVGSVGElement> = (e) => {
    if (e.target) {
      const target = e.target as SVGElement
      target.setPointerCapture(e.pointerId)

      setPoints([[e.pageX - LEFT, e.pageY - TOP, e.pressure]])
    }
  }

  const handlePointerMove: PointerEventHandler<SVGSVGElement> = (e) => {
    if (e.buttons !== 1) return
    setPoints([...points, [e.pageX - LEFT, e.pageY - TOP, e.pressure]])
  }
  return (
    <svg
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      style={{
        position: "fixed",
        top: TOP,
        left: LEFT,
        width: "100%",
        height: "400px",
        touchAction: "none",
      }}
    >
      {bag.map((d, i) => (
        <path key={i} d={d} fill="#05DACF" />
      ))}
    </svg>
  )
}

export default Drawing
