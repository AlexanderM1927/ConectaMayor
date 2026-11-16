import { defineBoot } from '#q-app/wrappers'
import { useLearningStore } from 'src/stores/learning'

export default defineBoot(async ({ store }) => {
  await useLearningStore(store).initialize()
})
