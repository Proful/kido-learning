import { useEffect, useState } from "react"
import { Button, Divider, Text, TextInput, Title } from "@mantine/core"
import { getRndInRange, numberWithSpaces } from "../../shared/utils"
import Drawing from "../Drawing"
import { useSettings } from "../../shared/settingsContext"

type AddSubProps = {
  render: number
}

const AddSub = ({ render }: AddSubProps) => {
  const [x, setX] = useState("")
  const [y, setY] = useState("")
  const [result, setResult] = useState("")
  const [message, setMessage] = useState("")
  const [settings] = useSettings()

  useEffect(() => {
    setMessage("")
    setResult("")

    let a = getRndInRange(10000, 99999, [])
    let b = getRndInRange(10000, 99999, [])

    if (b > a) {
      ;[a, b] = [b, a]
    }
    setX(numberWithSpaces(a))
    setY(numberWithSpaces(b))
  }, [render])

  return (
    <div>
      <Title order={4}>
        {settings.operation === "add" ? "Addition" : "Substraction"}
      </Title>
      <Text
        style={{
          fontSize: "60px",
          fontFamily: "Victor Mono",
          marginTop: "30px",
        }}
      >
        &nbsp;{x}
      </Text>
      <Text style={{ fontSize: "60px", fontFamily: "Victor Mono" }}>
        {settings.operation === "add" ? "+" : "-"}
        {y}
      </Text>
      <Divider my="sm" style={{ width: "32%" }} />

      <TextInput
        value={result}
        onChange={(e) => setResult(e.target.value)}
        placeholder="Enter your answer"
        style={{ width: "32%", marginTop: "14rem" }}
      />
      <br />
      <Button
        variant="outline"
        onClick={() => {
          let x1 = parseInt(x.replace(/\s/g, ""))
          let y1 = parseInt(y.replace(/\s/g, ""))
          let expected = settings.operation === "add" ? x1 + y1 : x1 - y1
          if (+result === expected) {
            setMessage("Correct!")
          } else {
            setMessage("Incorrect!")
          }
        }}
      >
        Check
      </Button>
      {message && <Text>{message}</Text>}
      <Drawing render={render} />
    </div>
  )
}

export default AddSub
