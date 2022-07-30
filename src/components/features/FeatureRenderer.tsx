import { useCallback } from "react"
import { Answer, Feature, Scores } from "../../shared/types"
import AddSub from "./AddSub"
import Division from "./Division"
import MagicClock from "./MagicClock"
import Multiplication from "./Multiplication"
import TimesTable from "./TimesTable"

type FeatureRendererProps = {
  feature: Feature
  seed: number
  scores: Scores
  updateScores: (feature: Feature, answer: Answer) => void
}

const FeatureRenderer = ({
  feature,
  seed,
  scores,
  updateScores,
}: FeatureRendererProps) => {
  const renderContent = useCallback(() => {
    switch (feature) {
      case Feature.Clock:
        return (
          <MagicClock
            render={seed}
            count={scores[feature]}
            onAnswer={(answer) => updateScores(feature, answer)}
          />
        )
      case Feature.Multiplication:
        return (
          <Multiplication
            render={seed}
            count={scores[feature]}
            onAnswer={(answer) => updateScores(feature, answer)}
          />
        )
      case Feature.Division:
        return (
          <Division
            render={seed}
            count={scores[feature]}
            onAnswer={(answer) => updateScores(feature, answer)}
          />
        )
      case Feature.AddSub:
        return <AddSub render={seed} />
      case Feature.TimesTable:
        return <TimesTable render={seed} />
      default:
        return null
    }
  }, [feature, seed, scores])

  return <>{renderContent()}</>
}

export default FeatureRenderer
