import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { readDeck, updateDeck } from '../utils/api';

import DeckForm from './DeckForm'

function EditDeck() {
    const { deckId } = useParams();
    const history = useHistory();

    const [formData, setFormData] = useState({})  

    useEffect(() => {
        const abortController = new AbortController();
        readDeck(deckId, abortController.signal).then(setFormData)
    }, [deckId])
    
    const changeHandler = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        })
    }

    console.log(formData)

    const submitHandler = (event) => {
        event.preventDefault()
        const abortController = new AbortController();
        updateDeck(formData, abortController.signal).then(history.push('/'));
    }

    if (!formData.id) {
        return <p>Loading...</p>
    } else {
        return (
            <div>
                <h2>Edit Deck</h2>
                <DeckForm 
                    submitHandler={submitHandler}
                    changeHandler={changeHandler}
                    formData={formData}
                />
            </div>

        )
    }


}

export default EditDeck