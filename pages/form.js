// index.html
//import { useState } from 'react';
//import Link from 'next/link';

export default function Form() {
    const handleSubmit = async event => {
        event.preventDefault();
        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
        };
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/form';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };
        const response = await fetch(endpoint, options);

        const result = await response.json();
        alert(`Your name and e-mail: ${result.data}`);
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required type="text" />

            <label htmlFor="email">e-mail</label>
            <input id="email" name="email" required type="text" />

            <button type="submit">Submit</button>
        </form>
    );
}
