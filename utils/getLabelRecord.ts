import { RecordType } from "../types"

export const getLabelRecord = (labels: string[]): RecordType => {
  const rec:RecordType = {}
  labels.forEach((label, index) => {
    rec[index] = label
  })

  return rec;
}