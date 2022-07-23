import { useEffect, useState } from "react"
import { Answer, Count, QuizOption } from "../../types"
import { getRnd } from "../../utils"
import Quiz from "./Quiz"

type DivisionProps = {
  render: number
  count: Count
  onAnswer: (answer: Answer) => void
}

const Division = ({ render, count, onAnswer }: DivisionProps) => {
  const [options, setOptions] = useState<QuizOption[]>([])

  const [x, setX] = useState(0)
  const [result, setResult] = useState(0)
  const y = 4

  useEffect(() => {
    setX(getRnd([x / y]) * y)
  }, [render])

  useEffect(() => {
    setResult(x / y)
  }, [x])

  useEffect(() => {
    if (result !== 0) {
      let r1 = getRnd([result])
      let r2 = getRnd([result, r1])
      let r3 = getRnd([result, r1, r2])

      let opts = [
        { value: "A", label: `${x} / ${y} = ${result}` },
        {
          value: "B",
          label: `${x} / ${y} = ${r1}`,
        },
        {
          value: "C",
          label: `${x} / ${y} = ${r2}`,
        },
        {
          value: "D",
          label: `${x} / ${y} = ${r3}`,
        },
      ]

      //shuffle array
      opts = opts.sort(() => Math.random() - 0.5)

      setOptions(opts)
    }
  }, [result])

  return (
    <Quiz render={render} count={count} options={options} onAnswer={onAnswer} />
  )
}

export default Division
