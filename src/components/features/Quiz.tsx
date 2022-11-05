import { Paper, Text, Radio } from "@mantine/core"
import { useEffect, useState } from "react"
import { Answer, Count, QuizOption } from "../../shared/types"

const initDisabled = {
  "A": false,
  "B": false,
  "C": false,
  "D": false,
}

type QuizProps = {
  render: number
  count: Count
  options: QuizOption[]
  onAnswer: (answer: Answer) => void
}

const Quiz = ({ render, count, options, onAnswer }: QuizProps) => {
  const [color, setColor] = useState("")
  const [optionSelected, setOptionSelected] = useState("")
  const [disabled, setDisabled] = useState(initDisabled)

  useEffect(() => {
    setDisabled(initDisabled)
    setOptionSelected("")
  }, [render])

  return (
    <div>
      <Radio.Group
        orientation="vertical"
        label={`Which of the following  is correct?`}
        spacing="lg"
        size="xl"
        value={optionSelected}
        color={color}
        onChange={(v) => {
          setOptionSelected(v)
          if (v === "A") {
            setDisabled({ "A": false, "B": true, "C": true, "D": true })
            onAnswer(Answer.Correct)
            setColor("teal")
          } else {
            onAnswer(Answer.Incorrect)
            setColor("red")
          }
        }}
      >
        {options.map((option, index) => (
          <Radio
            key={index}
            value={option.value}
            label={option.label}
            disabled={disabled[option.value as keyof typeof disabled]}
          />
        ))}
      </Radio.Group>
      <Paper shadow="md" p="md" mt={"md"} style={{ width: 400 }}>
        <Text>{count[Answer.Correct]} Correct</Text>
        <Text>{count[Answer.Incorrect]} Wrong</Text>
      </Paper>
    </div>
  )
}

export default Quiz
