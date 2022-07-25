import { getStroke } from "perfect-freehand"
import { PointerEventHandler, useEffect, useState } from "react"
import { Button, Divider, Text, TextInput } from "@mantine/core"
import { getRndInRange, numberWithSpaces } from "../../shared/utils"

type AdditionProps = {
  render: number
}
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

const Addition = ({ render }: AdditionProps) => {
  const [points, setPoints] = useState<Point[]>([])
  const [bag, setBag] = useState<string[]>([])
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [result, setResult] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    setMessage("")
    setResult("")
    setX(numberWithSpaces(getRndInRange(10000, 99999, [])))
    setY(numberWithSpaces(getRndInRange(10000, 99999, [])))
    setBag([])
  }, [render])

  const handlePointerDown: PointerEventHandler<SVGSVGElement> = (e) => {
    if (e.target) {
      const target = e.target as SVGElement
      target.setPointerCapture(e.pointerId)

      setPoints([[e.pageX - 100, e.pageY - 150, e.pressure]])
    }
  }

  const handlePointerMove: PointerEventHandler<SVGSVGElement> = (e) => {
    if (e.buttons !== 1) return
    setPoints([...points, [e.pageX - 100, e.pageY - 150, e.pressure]])
  }

  useEffect(() => {
    const stroke = getStroke(points, options)
    const svgPath = getSvgPathFromStroke(stroke)
    setBag([...bag, svgPath])
  }, [points])

  return (
    <div>
      <h1>Addition</h1>
      <br />
      <Text style={{ fontSize: "60px", fontFamily: "Victor Mono" }}>
        &nbsp;{x}
      </Text>
      <Text style={{ fontSize: "60px", fontFamily: "Victor Mono" }}>
        {"+" + y}
      </Text>
      <Divider my="sm" style={{ width: "32%" }} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <TextInput
        value={result}
        onChange={(e) => setResult(e.target.value)}
        placeholder="Enter your answer"
        style={{ width: "32%" }}
      />
      <br />
      <Button
        variant="outline"
        onClick={() => {
          let x1 = parseInt(x.replace(/\s/g, ""))
          let y1 = parseInt(y.replace(/\s/g, ""))
          if (+result === x1 + y1) {
            setMessage("Correct!")
          } else {
            setMessage("Incorrect!")
          }
        }}
      >
        Check
      </Button>
      {message && <Text>{message}</Text>}
      <svg
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        style={{
          position: "fixed",
          top: 150,
          left: 100,
          width: "100%",
          height: "400px",
          // backgroundColor: "#ffffff",
          touchAction: "none",
        }}
      >
        {/* {points && <path d={pathData} fill="#05DACF" />} */}
        {bag.map((d, i) => (
          <path key={i} d={d} fill="#05DACF" />
        ))}
      </svg>
    </div>
  )
}

export default Addition
