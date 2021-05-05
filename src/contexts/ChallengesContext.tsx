import { createContext, useState, ReactNode } from 'react'
import challenges from '../../challenges.json'

type Challenge = {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

type ChallengesContextData = {
  level: number;
  currentXp: number;
  completedChallenges: number;
  activeChallenge: Challenge;
  xpToNextLevel: number;
  levelup: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

type ChallengesProviderProps = {
  children: ReactNode;
}

export const ChallengesContext = createContext( {} as ChallengesContextData )

export function ChallengesProvider( props: ChallengesProviderProps ) {
  const [ level, setLevel ] = useState( 1 )
  const [ currentXp, setCurrentXp ] = useState( 0 )
  const [ completedChallenges, setCompletedChallenges ] = useState( 0 )
  const [ activeChallenge, setActiveChallenge ] = useState( null )
  
  const xpToNextLevel = Math.pow( ( level + 1 ) * 4, 2 )

  function levelup() {
    setLevel( level + 1 )
  }

  function startNewChallenge() {
    const randIndex = Math.floor( Math.random() * challenges.length )
    const newChallenge = challenges[ randIndex ]

    setActiveChallenge( newChallenge )
  }

  function resetChallenge() {
    setActiveChallenge( null )
  }

  function completeChallenge() {
    if( !activeChallenge ) {
      return
    }

    const { amount } = activeChallenge
    let finalXp = currentXp + amount

    if( finalXp >= xpToNextLevel ) {
      levelup()
      finalXp -= xpToNextLevel
    }

    setCurrentXp( finalXp )
    setActiveChallenge( null )
    setCompletedChallenges( completedChallenges + 1 )
  }

  return(
    <ChallengesContext.Provider
      value={{
        level,
        currentXp,
        completedChallenges,
        activeChallenge,
        xpToNextLevel,
        levelup,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      { props.children }
    </ChallengesContext.Provider>  
  )
}