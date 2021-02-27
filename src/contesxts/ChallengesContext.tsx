import {createContext, useState, ReactNode} from 'react';
import challenges from '../../challenges.json';

interface challenge{

    type: 'body' | 'eye';
    description: string;
    amount: number;

}

interface ChallengesContextData{
    level: number;
    currentExperience:number;
    experienceToNextLevel:number;
    completedChallenges: number;
    activeChallenge: challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;

}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);


export function ChallengesProvider({children}: ChallengesProviderProps){

    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(70);
    const [completedChallenges, setCompletedChallenges] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4,2);

    function levelUp(){
        setLevel(level + 1);
    }

    function startNewChallenge() {

        
    const randonChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randonChallengeIndex];
   

    setActiveChallenge(challenge);
   
    }

    function resetChallenge() {

        setActiveChallenge(null);
    }

    return (

        <ChallengesContext.Provider 
            value={{
                level,
                currentExperience,
                experienceToNextLevel,
                completedChallenges,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge
                
                }}>
        {children}
        </ChallengesContext.Provider>
    )

}
