import { useEffect, useState } from "react"
import { Answer, Count, QuizOption } from "../../shared/types"
import Quiz from "./Quiz"
import { getRnd, getRndInRange } from "../../shared/utils"

type MultiplicationProps = {
  render: number
  count: Count
  onAnswer: (answer: Answer) => void
}

const Multiplication = ({ render, count, onAnswer }: MultiplicationProps) => {
  const [options, setOptions] = useState<QuizOption[]>([])

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  useEffect(() => {
    setX(getRnd([x]))
  }, [render])

  useEffect(() => {
    setY(getRnd([y]))
  }, [x])

  useEffect(() => {
    let result = x * y
    let r1 = getRndInRange(100, x, [result])
    let r2 = getRndInRange(100, y, [result, r1])
    let r3 = getRndInRange(100, x, [result, r1, r2])

    let opts = [
      { value: "A", label: `${x} x ${y} = ${result}` },
      {
        value: "B",
        label: `${x} x ${y} = ${r1}`,
      },
      {
        value: "C",
        label: `${x} x ${y} = ${r2}`,
      },
      {
        value: "D",
        label: `${x} x ${y} = ${r3}`,
      },
    ]

    //shuffle array
    opts = opts.sort(() => Math.random() - 0.5)

    setOptions(opts)
  }, [y])

  return (
    <Quiz render={render} count={count} options={options} onAnswer={onAnswer} />
  )
}

export default Multiplication
