import React from 'react'
import { useHistory } from 'react-router-dom'

function CardForm({ formData, changeHandler, submitHandler }) {
    const history = useHistory();

    const goHome = () => {
        history.push("/")
    }

    return (
        <form onSubmit={submitHandler} className="card">
            <label htmlFor="front" className="d-flex flex-column">
                Front
                <textarea 
                    id="front"
                    type="text"
                    name="front"
                    placeholder={formData.front}
                    onChange={changeHandler}
                    value={formData.front}
                />
            </label>
            <label htmlFor="back" className="d-flex flex-column">
                Back
                <textarea 
                    id="back"
                    type="text"
                    name="back"
                    placeholder={formData.back}
                    onChange={changeHandler}
                    value={formData.back}
                />
            </label>
            <div>
                <button type="button" className="btn btn-secondary" onClick={goHome}>Cancel</button>
                <button type="submit button" className="btn btn-primary">Submit</button>                
            </div>

        </form>
    )
}

export default CardForm