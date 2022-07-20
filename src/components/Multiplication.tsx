import { Radio, RadioGroup } from "@mantine/core";
import { useEffect, useState } from "react";
import { getQuizOptions } from "../backend/core";
import { QuizOption } from "../types";

const Multiplication = ({ render }: { render: number }) => {
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
            setColor("teal");
          } else {
            setColor("red");
          }
        }}
      >
        {options.map((option, index) => (
          <Radio key={index} value={option.value} label={option.label} />
        ))}
      </RadioGroup>
    </div>
  );
};

export default Multiplication;
