// React
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
// functions for API
import { listDecks } from '../utils/api';
// components
import DeckTile from './DeckTile'

function DeckList() {
    const [allDecks, setAllDecks] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        listDecks(abortController.signal).then(setAllDecks)
    }, [])

    const listOfDecks = allDecks.map((deck, index) => <DeckTile key={index} deck={deck}/>)

    return (
        <section>
            <Link to="/decks/new">
                <button type="button" className="btn btn-primary">+ Create Deck</button>
            </Link>
            <br />
            {listOfDecks}
        </section>
    )
}

export default DeckList;