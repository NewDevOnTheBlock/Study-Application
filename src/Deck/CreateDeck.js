// react features
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
// components
import DeckForm from './DeckForm'
// functions
import { createDeck } from '../utils/api'

function CreateDeck() {
    const history = useHistory();

    const initialFormState = {
        name: "",
        description: "",
        cards: [],
    }

    const [formData, setFormData] = useState({...initialFormState})

    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        createDeck(formData, abortController.signal).then(history.goBack())
    }

    return (
        <div>
            <h2>Create Deck</h2>
            <DeckForm 
                formData={formData}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </div>

    )
}

export default CreateDeck