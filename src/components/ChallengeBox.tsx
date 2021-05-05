import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ChallengeBox.module.css'

export default function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext( ChallengesContext )
  const { resetCountdown } = useContext( CountdownContext )

  function handleChallengeSucceeded() {
    completeChallenge()
    resetCountdown()
  }

  function handleChallengeFailed() {
    resetChallenge()
    resetCountdown()
  }

  return(
    <div className={ styles.challengeBoxContainer } >
      
      { activeChallenge ? (
        <div className={ styles.challengeActive } >
          <header>Win { activeChallenge.amount }</header>

          <main>
            <img src={ `icons/${ activeChallenge.type }.svg` } />
            <strong>New challenge</strong>
            <p>{ activeChallenge.description }</p>
          </main>

          <footer>
            <button
              type="button"
              className={ styles.challengeFailedButton }
              onClick={ handleChallengeFailed }
            >
              Failed
            </button>
            <button
              type="button"
              className={ styles.challengeSucceededButton }
              onClick={ handleChallengeSucceeded }
            >
              Succeeded
            </button>
          </footer>
        </div>
      ) : (
        <div className={ styles.challengeNotActive } >
          <strong>Start a cicle to get new challenges</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Complete challenges to level up. 
          </p>
        </div>
      ) }
      
    </div>
  )
}