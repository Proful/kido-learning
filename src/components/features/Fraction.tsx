import { Card, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { getRndInRange } from "../../shared/utils"
import Sketch from "react-p5"
import p5Types from "p5"
import { Answer, Count, QuizOption } from "../../shared/types"
import Quiz from "./Quiz"

type FractionProps = {
  render: number
  count: Count
  onAnswer: (answer: Answer) => void
}

const Fraction = ({ render, count, onAnswer }: FractionProps) => {
  const [options, setOptions] = useState<QuizOption[]>([])

  useEffect(() => {
    let opts = [
      { value: "A", label: `1/2` },
      {
        value: "B",
        label: `1/3`,
      },
      {
        value: "C",
        label: `2/3`,
      },
      {
        value: "D",
        label: `1/5`,
      },
    ]

    //shuffle array
    opts = opts.sort(() => Math.random() - 0.5)

    setOptions(opts)
  }, [render])

  return (
    <>
      <Title order={4}>Fraction</Title>
      <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: "50%", height: "50%" }}>
        <Card.Section>
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" />
            <path d="M50,0 L50,100 C117,100 117,0 50,0" fill="red" />
          </svg>
        </Card.Section>
      </Card>
      <Quiz render={render} count={count} options={options} onAnswer={onAnswer} />
    </>
  )
}

export default Fraction
