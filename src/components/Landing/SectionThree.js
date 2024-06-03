import React from 'react'
import { whyChooseUs } from '../../utils/data'

const SectionThree = () => {
    return (
        <section className='section_three_container'>
            <div className="section_three">
                <h2>Why Choose Us</h2>
                <div className="section_three_items">
                    {
                        whyChooseUs.map((item, index) => (
                            <div key={index} className="item">
                                <img src={`/images/${item.image}`} alt={item.heading} />
                                <h3>{item.heading}</h3>
                                <p>{item.text}</p>
                            </div>
                        ))
                    }
                </div>
                <button>
                    Get Started
                </button>
            </div>

        </section>
    )
}

export default SectionThree