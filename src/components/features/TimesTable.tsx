import { Table, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { getRndInRange } from "../../shared/utils"
type TimesTableProps = {
  render: number
}

const TimesTable = ({ render }: TimesTableProps) => {
  const [x, setX] = useState(2)

  useEffect(() => {
    setX(getRndInRange(2, 12, [x, 1]))
  }, [render])

  const rows = [...Array(6).keys()]
    .map((i) => i + 1)
    .map((n) => (
      <tr key={n}>
        <td
          style={{
            fontSize: "50px",
            fontFamily: "Victor Mono",
          }}
        >
          {x}x{n}={x * n}
        </td>
        <td
          style={{
            fontSize: "50px",
            fontFamily: "Victor Mono",
          }}
        >
          {x}x{n + 6}={x * (n + 6)}
        </td>
      </tr>
    ))

  return (
    <>
      <Title order={4}>Times Table</Title>
      <Table>
        <tbody>{rows}</tbody>
      </Table>
    </>
  )
}

export default TimesTable
