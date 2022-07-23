import { Paper, Text, RadioGroup, Radio } from "@mantine/core"
import { useEffect, useState } from "react"
import { Answer, Count, QuizOption } from "../../types"

type QuizProps = {
  render: number
  count: Count
  options: QuizOption[]
  onAnswer: (answer: Answer) => void
}

const Quiz = ({ render, count, options, onAnswer }: QuizProps) => {
  const [color, setColor] = useState("")
  const [optionSelected, setOptionSelected] = useState("")

  useEffect(() => {
    setOptionSelected("")
  }, [render])

  return (
    <div>
      <RadioGroup
        orientation="vertical"
        label={`Which of the following  is correct?`}
        spacing="lg"
        size="xl"
        value={optionSelected}
        color={color}
        onChange={(v) => {
          setOptionSelected(v)
          if (v === "A") {
            onAnswer(Answer.Correct)
            setColor("teal")
          } else {
            onAnswer(Answer.Incorrect)
            setColor("red")
          }
        }}
      >
        {options.map((option, index) => (
          <Radio key={index} value={option.value} label={option.label} />
        ))}
      </RadioGroup>
      <Paper shadow="md" p="md" mt={"md"} style={{ width: 400 }}>
        <Text>{count[Answer.Correct]} Correct</Text>
        <Text>{count[Answer.Incorrect]} Wrong</Text>
      </Paper>
    </div>
  )
}

export default Quiz
