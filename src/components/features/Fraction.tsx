import { Table, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import { getRndInRange } from "../../shared/utils"
import Sketch from "react-p5"
import p5Types from "p5"

type FractionProps = {
  render: number
}

const Fraction = ({ render }: FractionProps) => {
  return (
    <>
      <Title order={4}>Fraction</Title>
    </>
  )
}

export default Fraction
