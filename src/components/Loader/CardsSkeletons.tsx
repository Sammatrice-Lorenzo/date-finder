import { ReactElement } from "react"
import CardSkeleton from "./CardSkeleton"

const getNumberInArray = (number: number): number[] => {
  let numbers = []

  for (let i = 1; i <= number; i++) {
    numbers.push(i)
  }

  return numbers
}

export type CardsSkeletonsProps = {
  totalCardSkeletons?: number
}

export const CardsSkeletons = ({ totalCardSkeletons = 3 }: CardsSkeletonsProps): ReactElement => {
  return (
    <>
      {getNumberInArray(totalCardSkeletons).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </>
  )
}
