import React from "react";
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { deleteCard } from "../utils/api";

function CardTile({ card }) {
    const history = useHistory()
    const { url } = useRouteMatch();
    const cardId = card.id

    const handleDelete = () => {
        const abortController = new AbortController()
        window.confirm("Delete this card? \n \n You cannot get it back if you do!") ?
        deleteCard(cardId, abortController.signal).then(history.push("/")) :
        history.push("/")
    }

    return (
        <main>
            <section className="card">
                <div className="d-flex justify-content-between">
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                </div>
                <div className="d-flex">
                    <Link to={`${url}/cards/${card.id}/edit`}>
                        <button type="button" className="btn btn-secondary">Edit</button>
                    </Link>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
            </section>
        </main>

    )
}

export default CardTile;