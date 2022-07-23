import { Paper, Radio, RadioGroup, Text } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { getQuizOptions } from "../../backend/core";
import { QuizOption, Count, Answer } from "../../types";

type MagicClockProps = {
  render: number;
  count: Count;
  onAnswer: (answer: Answer) => void;
};

const MagicClock = ({ render, count, onAnswer }: MagicClockProps) => {
  const [clockDate, setClockDate] = useState<Date | null>(null);
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [color, setColor] = useState("red");
  const [optionSelected, setOptionSelected] = useState("");

  useEffect(() => {
    setOptionSelected("");
    getQuizOptions().then((opts) => {
      setOptions(opts);

      const correct = opts.find((o) => o.value === "A");

      if (correct) {
        let d = new Date();
        let [hr, mm] = correct.label.split(":");

        d.setHours(parseInt(hr));
        d.setMinutes(parseInt(mm));

        setClockDate(d);
      }
    });
  }, [render]);

  if (!clockDate) {
    return null;
  }

  return (
    <div>
      <Clock value={clockDate} renderSecondHand={false} renderNumbers={false} />
      <br />

      <RadioGroup
        orientation="vertical"
        label="What is the time now?"
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

export default MagicClock;
