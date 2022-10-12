import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { createCard, readDeck } from '../utils/api'

import CardForm from './CardForm'

function AddCard() {
    const history = useHistory()
    const initialFormState = {
        front: "",
        back: "",
    }

    const { deckId } = useParams()
    const [deck, setDeck] = useState({})
    const [formData, setFormData] = useState({...initialFormState});
    
    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setDeck)
    }, [deckId])

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        createCard(deckId, formData, abortController.signal).then(history.goBack())
    }

    if (!deck.id) {
        return <p>Loading...</p>
    } else {
        return (
            <div>
                <h2><span>{deck.name}</span>:<span>Add Card</span></h2>
                <CardForm 
                    formData={formData}
                    changeHandler={changeHandler}
                    submitHandler={submitHandler}
                />
            </div>
        )
    }

}

export default AddCard