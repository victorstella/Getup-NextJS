import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export default function CompletedChallenges() {
  const { completedChallenges } = useContext( ChallengesContext )

  return(
    <div className={ styles.completedChallengesContainer } >
      <span>Completed Challenges</span>
      <span>{ completedChallenges }</span>
    </div>
  )
}