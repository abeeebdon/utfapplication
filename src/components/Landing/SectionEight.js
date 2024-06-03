import React, { useState } from 'react'
import { questions } from '../../utils/data'

const SectionEight = () => {
    const [showContent, setShowContent] = useState()
    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        text: '',
    })
    const [contentArr, setContentArr] = useState([...questions])
    const handleContentDisplay = (id) => {
        const filteredData = contentArr.map((data) =>
            data.id === id ? { ...data, status: true } : data
        )
        setContentArr(filteredData)
    }
    const handleHideContent = (id) => {
        const filteredData = contentArr.map((data) =>
            data.id === id ? { ...data, status: false } : data
        )
        setContentArr(filteredData)
    }
    const handleFormSubmit = async () => { }

    return (
        <section className="section_eight_container">
            <div className="section_eight">
                <h2>Any Questions? We’ve Got You!</h2>
                <main className="content">
                    <section className="content-wrapper">
                        {contentArr.map((data) => {
                            const { heading, content, status, id } = data
                            return (
                                <article key={id} className="content-box">
                                    <img src="/images/ph_question-fill.svg" alt="question" />
                                    <div className='content-box-item'>
                                        <h3 className="content-heading">{heading}</h3>
                                        {status && <p className="paragraph">{content}</p>}
                                    </div>
                                    {status ? (
                                        <img
                                            src="/images/outline_down.svg"
                                            alt="down-icon"
                                            onClick={() => handleHideContent(id)}
                                        />
                                    ) : (
                                        <img
                                            src="/images/outline_up.svg"
                                            alt="down-icon"
                                            onClick={() => handleContentDisplay(id)}
                                        />
                                    )}
                                </article>
                            )
                        })}
                    </section>
                    <section className="contact-us">
                        <h2 className="contact-heading">Contact Us</h2>
                        <form className="contact-form" onSubmit={handleFormSubmit}>
                            <input
                                type="text"
                                placeholder="Your name"
                                className="input"
                                value={inputData.name}
                                onChange={(e) =>
                                    setInputData({ ...inputData, name: e.target.value })
                                }
                            />
                            <input
                                type="email"
                                placeholder="Your email"
                                className="input"
                                value={inputData.email}
                                onChange={(e) =>
                                    setInputData({ ...inputData, email: e.target.value })
                                }
                            />
                            <textarea
                                placeholder="Your message"
                                className="textarea"
                                value={inputData.text}
                                onChange={(e) =>
                                    setInputData({ ...inputData, text: e.target.value })
                                }
                            ></textarea>
                            <div className="contact-btn">
                                <button type="submit" className="button">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        </section>
    )
}

export default SectionEight
