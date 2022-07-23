import { useEffect, useState } from "react"
import Clock from "react-clock"
import "react-clock/dist/Clock.css"
import { getQuizOptions } from "../../backend/core"
import { QuizOption, Count, Answer } from "../../shared/types"
import Quiz from "./Quiz"

type MagicClockProps = {
  render: number
  count: Count
  onAnswer: (answer: Answer) => void
}

const MagicClock = ({ render, count, onAnswer }: MagicClockProps) => {
  const [clockDate, setClockDate] = useState<Date | null>(null)
  const [options, setOptions] = useState<QuizOption[]>([])

  useEffect(() => {
    getQuizOptions().then((opts) => {
      setOptions(opts)

      const correct = opts.find((o) => o.value === "A")

      if (correct) {
        let d = new Date()
        let [hr, mm] = correct.label.split(":")

        d.setHours(parseInt(hr))
        d.setMinutes(parseInt(mm))

        setClockDate(d)
      }
    })
  }, [render])

  if (!clockDate) {
    return null
  }

  return (
    <div>
      <Clock value={clockDate} renderSecondHand={false} renderNumbers={false} />
      <br />

      <Quiz
        render={render}
        count={count}
        options={options}
        onAnswer={onAnswer}
      />
    </div>
  )
}

export default MagicClock
