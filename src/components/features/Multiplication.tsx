import { Text, Paper, Radio, RadioGroup } from "@mantine/core";
import { useEffect, useState } from "react";
import { Answer, Count, QuizOption } from "../../types";

type MultiplicationProps = {
  render: number;
  count: Count;
  onAnswer: (answer: Answer) => void;
};

const Multiplication = ({ render, count, onAnswer }: MultiplicationProps) => {
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [color, setColor] = useState("red");
  const [optionSelected, setOptionSelected] = useState("");

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    setOptionSelected("");

    let rnd = Math.floor(Math.random() * 10 + 1);

    while (rnd === x) {
      rnd = Math.floor(Math.random() * 10 + 1);
    }

    setX(rnd);
  }, [render]);

  useEffect(() => {
    let rnd = Math.floor(Math.random() * 10 + 1);

    while (rnd === y) {
      rnd = Math.floor(Math.random() * 10 + 1);
    }

    setY(rnd);
  }, [x]);

  useEffect(() => {
    let opts = [
      { value: "A", label: `${x} x ${y} = ${x * y}` },
      {
        value: "B",
        label: `${x} x ${y} = ${Math.floor(Math.random() * (100 - x + 1) + x)}`,
      },
      {
        value: "C",
        label: `${x} x ${y} = ${Math.floor(Math.random() * (100 - y + 1) + y)}`,
      },
      {
        value: "D",
        label: `${x} x ${y} = ${Math.floor(Math.random() * (100 - x + 1) + x)}`,
      },
    ];

    //shuffle array
    opts = opts.sort(() => Math.random() - 0.5);

    setOptions(opts);
  }, [y]);

  return (
    <div>
      <RadioGroup
        orientation="vertical"
        label={`What is the value of ${x} X ${y}?`}
        spacing="lg"
        size="xl"
        value={optionSelected}
        color={color}
        onChange={(v) => {
          setOptionSelected(v);
          if (v === "A") {
            onAnswer(Answer.Correct);
            setColor("teal");
          } else {
            onAnswer(Answer.Incorrect);
            setColor("red");
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
  );
};

export default Multiplication;
