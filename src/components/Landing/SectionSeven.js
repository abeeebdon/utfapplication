import React, { useState, useEffect, useRef } from 'react';
import { reviews } from '../../utils/data';
import RenderStars from '../RenderStars';

const SectionSeven = () => {
    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
    const boxRefs = useRef([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentReviewIndex(prevIndex => (prevIndex + 2) % reviews.length);
        }, 5000); // Adjust the interval for auto-scrolling speed

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        boxRefs.current.forEach((box, index) => {
            if (Math.floor(index) === Math.floor(currentReviewIndex / 2)) {
                box.classList.add('filled');
            } else {
                box.classList.remove('filled');
            }
        });
    }, [currentReviewIndex]);

    const numBoxes = Math.ceil(reviews.length / 2);

    return (
        <section className='section_seven_container'>
            <div className='section_seven'>
                <h2>What are our customers saying?</h2>

                <div className="reviews">
                    {reviews.slice(currentReviewIndex, currentReviewIndex + 2).map((item, index) => {
                        const { stars, text, image, name } = item;
                        return (
                            <div className='reviews_item'>
                                <div><RenderStars rate={stars} /></div>
                                <p>{text}</p>
                                <div className="profile">
                                    <img src={`/images${image}`} alt={name} />
                                    <p>{name}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='boxes'>
                    {Array.from({ length: numBoxes }, (_, index) => (
                        <span
                            key={index}
                            className='box'
                            ref={el => boxRefs.current[index] = el}
                        ></span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SectionSeven;


// import React from 'react'
// import { reviews } from '../../utils/data'
// import RenderStars from '../RenderStars'

// const SectionSeven = () => {
//     return (
//         <section className='section_seven_container'>
//             <div className='section_seven'>
//                 <h2>What are our customers saying?</h2>

//                 <div className="reviews">
//                     {
//                         reviews.slice(0, 2).map((item) => {
//                             const { stars, text, image, name } = item
//                             return (
//                                 <div className='reviews_item'>
//                                     <RenderStars rate={stars} />
//                                     <p>{text}</p>
//                                     <div className="profile">
//                                         <img src={`/images${image}`} alt={name} />
//                                         <p>{name}</p>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }
//                 </div>

//                 <div>
//                     <span className='box filled'></span>
//                     <span className='box'></span>
//                 </div>
//             </div>
//         </section >
//     )
// }

// export default SectionSeven