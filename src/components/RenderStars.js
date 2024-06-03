import React, { useEffect, useState } from 'react'

const RenderStars = ({ rate }) => {
    const [stars, setStars] = useState([])

    useEffect(() => {
        setStars([])
        for (let index = 0; index < 5; index++) {
            if (index < rate) {
                setStars((prev) => [...prev, '/images/starfilled.svg'])
            } else {
                setStars((prev) => [...prev, '/images/star.svg'])
            }
        }
    }, [rate])

    return (
        <div className='stars'>
            {
                stars.map((item, index) => <img key={index} src={item} alt={item} />)
            }
        </div>
    )
}

export default RenderStars