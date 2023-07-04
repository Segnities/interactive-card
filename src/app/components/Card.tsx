'use client';

import "../styles/Card.scss";

export default function Card() {
    return (
        <div className='bank-card'>
            <div className='front-side__card' onDragStart={e => e.preventDefault()}></div>
            <div className='back-side__card' onDragStart={e => e.preventDefault()}></div>
        </div>
    );
}