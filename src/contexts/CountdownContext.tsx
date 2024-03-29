import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ChallengesContext } from './ChallengesContext';

type CountdownContextData = {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  countdownStart: () => void;
  resetCountdown: () => void;
}

type CountdownProviderProps = {
  children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext( {} as CountdownContextData )

export function CountdownProvider( props: CountdownProviderProps ) {
  
  const { startNewChallenge } = useContext( ChallengesContext )

  const [ time, setTime ] = useState( 0.05 * 60 )
  const [ isActive, setIsActive ] = useState( false )
  const [ hasFinished, setHasFinished ] = useState( false )

  const minutes = Math.floor( time / 60 )
  const seconds = time % 60

  function countdownStart() {
    setIsActive( true )
  }

  function resetCountdown() {
    clearTimeout( countdownTimeout )
    setIsActive( false )
    setHasFinished( false )
    setTime( 0.05 * 60 )
  }

  useEffect( () => {
    if( isActive && time > 0 ) {
      countdownTimeout = setTimeout( () => {
        setTime( time - 1 )
      }, 1000 )
    } else if ( isActive && time === 0 ) {
      setHasFinished( true )
      setIsActive( false )
      startNewChallenge()
    }
  }, [ isActive, time ] )

  return(
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        countdownStart,
        resetCountdown,
      }}
    >
      { props.children }
    </CountdownContext.Provider>
  )
}