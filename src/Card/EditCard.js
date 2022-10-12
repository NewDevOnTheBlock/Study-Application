import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { readCard, readDeck, updateCard } from '../utils/api';

import CardForm from './CardForm'

function EditCard() {
    const history = useHistory();

    const [deck, setDeck] = useState({})
    const [formData, setFormData] = useState({})
    
    const { deckId, cardId } = useParams();

    useEffect(() => {
        const abortController = new AbortController()
        readDeck(deckId, abortController.signal).then(setDeck)
        readCard(cardId, abortController.signal).then(setFormData)
    }, [deckId, cardId])

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController()
        updateCard(formData, abortController.signal).then(history.push("/"))
        
    }

    if (!deck.id) {
        return <p>Loading...</p>
    } else {
        return (
            <div>
                <h2>{deck.name}: Edit Card</h2>
                <CardForm 
                    formData={formData}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                />
            </div>
        )
    }

}

export default EditCard