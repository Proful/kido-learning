import { Text, Paper, Radio, RadioGroup } from "@mantine/core";
import { useEffect, useState } from "react";
import { getQuizOptions } from "../../backend/core";
import { Count, QuizOption } from "../../types";

const getRnd = (except: number[]) => {
  let rnd = Math.floor(Math.random() * 10 + 1);

  while (except.includes(rnd)) {
    rnd = Math.floor(Math.random() * 10 + 1);
  }

  return rnd;
};

const Division = ({ render }: { render: number }) => {
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [color, setColor] = useState("red");
  const [optionSelected, setOptionSelected] = useState("");

  const [count, setCount] = useState<Count>({ correct: 0, incorrect: 0 });

  const [x, setX] = useState(0);
  const [result, setResult] = useState(0);
  const y = 5;

  useEffect(() => {
    setOptionSelected("");

    setX(getRnd([x / 5]) * 5);
  }, [render]);

  useEffect(() => {
    setResult(x / y);
  }, [x]);

  useEffect(() => {
    if (result !== 0) {
      let r1 = getRnd([result]);
      let r2 = getRnd([result, r1]);
      let r3 = getRnd([result, r1, r2]);

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
      ];

      //shuffle array
      opts = opts.sort(() => Math.random() - 0.5);

      setOptions(opts);
    }
  }, [result]);

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
          setOptionSelected(v);
          if (v === "A") {
            setCount({ ...count, correct: count.correct + 1 });
            setColor("teal");
          } else {
            setCount({ ...count, incorrect: count.incorrect + 1 });
            setColor("red");
          }
        }}
      >
        {options.map((option, index) => (
          <Radio key={index} value={option.value} label={option.label} />
        ))}
      </RadioGroup>
      {count && (
        <Paper shadow="md" p="md" mt={"md"} style={{ width: 400 }}>
          <Text>{count.correct} Correct</Text>
          <Text>{count.incorrect} Wrong</Text>
        </Paper>
      )}
    </div>
  );
};

export default Division;
