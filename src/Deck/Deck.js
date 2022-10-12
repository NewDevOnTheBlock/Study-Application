// React
import React, { useEffect, useState } from 'react';
import { useParams, useRouteMatch, Link, Route, useHistory } from 'react-router-dom'
// Components
import CardTile from '../Card/CardTile'
// functions
import { readDeck } from '../utils/api/index';
import { deleteDeck } from '../utils/api/index';

function Deck() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const { url } = useRouteMatch();
    const history = useHistory();
    
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck)
    }, [deckId])

    const handleDelete = () => {
        const abortController = new AbortController()
        window.confirm("Delete this deck? \n \n You cannot get it back if you do!") ? 
        deleteDeck(deckId, abortController.signal).then(history.push("/")) :
        history.push("/")
    }

    if (!deck.id) {
        return <p>Loading...</p>
    } else {
        return (
            <Route path={`${url}`}>
                <section>
                    <header>
                        <h2>{deck.name}</h2>
                        <p>{deck.description}</p>
                        <div className="d-flex">
                            <Link to={`${url}/edit`}>
                                <button type="button" className="btn btn-secondary">Edit</button>
                            </Link>

                            <Link to={`${url}/study`}>
                                <button type="button" className="btn btn-primary">Study</button>
                            </Link>

                            <Link to={`${url}/cards/new`}>
                                <button type="button" className="btn btn-primary">+ Add Card</button>
                            </Link>
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>                    
                        </div>
                    </header>
                    <br />
                    <main>
                        {deck.cards.map((card, index) => <CardTile key={index} card={card} />)}
                    </main>
                </section>
            </Route>
        )
    }
    
}

export default Deck;