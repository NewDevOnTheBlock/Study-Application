import React from 'react'

import { Link, useHistory } from 'react-router-dom'

import { deleteDeck } from '../utils/api'

function DeckTile({ deck }) {
    const history = useHistory()
    const deckId = deck.id

    const handleDelete = () => {
        const abortController = new AbortController()
        window.confirm("Delete this deck? \n \n You cannot get it back if you do!") ?
        deleteDeck(deckId, abortController.signal).then(history.go(0)) :
        history.push("/")
    }

    return (
        <article className="card" style={{padding: "24px"}}>
            <div className="d-flex justify-content-between">
                <h3>{deck.name}</h3>
                <p>{deck.cards.length} cards</p>
            </div>
            <p>{deck.description}</p>
            <div className="d-flex justify-content-between">
                <Link to={`/decks/${deck.id}`}>
                    <button type="button" className="btn btn-secondary">View</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                    <button type="button" className="btn btn-primary">Study</button>
                </Link>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </article>
    )
}

export default DeckTile