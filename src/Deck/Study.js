import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'

// components 
import StudyCard from '../Card/StudyCard'

// functions
import { readDeck } from '../utils/api';

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck)
    }, [deckId])
    
    if (!deck.id) {
        return <p>Loading...</p>
    } else if (deck.cards.length < 3) {     
        return (
            <div>
                <h2>Study: {deck.name}</h2>
                <p>Not enough cards</p>
                <Link to={`decks/${deckId}/cards/new`}>
                    <button type="button" className="btn btn-primary">+ Add Cards</button>
                </Link>
            </div>
        )
    } else {
        return (
            <div>
                <h2>Study: {deck.name}</h2>
                <br />
                <StudyCard cards={deck.cards} />
            </div>
        )
    }
}

export default Study;