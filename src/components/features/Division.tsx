import { useEffect, useState } from "react"
import { useSettings } from "../../shared/settingsContext"
import { Answer, Count, QuizOption } from "../../shared/types"
import { getRnd } from "../../shared/utils"
import Quiz from "./Quiz"

type DivisionProps = {
  render: number
  count: Count
  onAnswer: (answer: Answer) => void
}

const Division = ({ render, count, onAnswer }: DivisionProps) => {
  const [options, setOptions] = useState<QuizOption[]>([])
  const [settings, setSettings] = useSettings()

  const [x, setX] = useState(0)
  const [result, setResult] = useState(0)

  useEffect(() => {
    setX(getRnd([x / settings.denominator]) * settings.denominator)
  }, [render])

  useEffect(() => {
    setResult(x / settings.denominator)
  }, [x])

  useEffect(() => {
    if (result !== 0) {
      let r1 = getRnd([result])
      let r2 = getRnd([result, r1])
      let r3 = getRnd([result, r1, r2])

      let opts = [
        { value: "A", label: `${x} / ${settings.denominator} = ${result}` },
        {
          value: "B",
          label: `${x} / ${settings.denominator} = ${r1}`,
        },
        {
          value: "C",
          label: `${x} / ${settings.denominator} = ${r2}`,
        },
        {
          value: "D",
          label: `${x} / ${settings.denominator} = ${r3}`,
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
