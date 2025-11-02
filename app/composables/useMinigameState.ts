import { ref, provide, inject, type Ref } from 'vue'

export const MINIGAME_STATE_KEY = Symbol('minigameState')

export interface MinigameState {
  isRunning: Ref<boolean>
  setIsRunning: (value: boolean) => void
}

export function provideMinigameState() {
  const isRunning = ref(false)

  const minigameState: MinigameState = {
    isRunning,
    setIsRunning: (value: boolean) => {
      isRunning.value = value
    }
  }

  provide(MINIGAME_STATE_KEY, minigameState)
  return minigameState
}

export function useMinigameState(): MinigameState {
  const state = inject<MinigameState | undefined>(MINIGAME_STATE_KEY)
  
  if (!state) {
    // Return a fallback state if not provided
    return {
      isRunning: ref(false),
      setIsRunning: () => {}
    }
  }
  
  return state
}
