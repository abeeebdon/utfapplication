import React from 'react'

const SectionFour = () => {
    return (
        <section className='section_four_container'>
            <div className="section_four">
                <div className="left">
                    <h2>Earn with Universal FX</h2>
                    <h3 className="gold">Unlock streams of income with Universal FX</h3>
                    <p>Universal FX offers tailored profit ratios to suit every trader's experience level, helping you grow your investments efficiently.</p>
                    <div className="bottom">
                        <div className='bottom_item'>
                            <p> Beginners: Earn between 1.1% to 1.4%</p>
                            <span>Start your trading journey with consistent and steady returns.</span>
                        </div>
                        <div className='bottom_item'>
                            <p> Medium: Earn between 1.5% to 1.8%</p>
                            <span> Increase your earnings with more experience and proven strategies.</span>
                        </div>
                        <div className='bottom_item'>
                            <p>Advance: Earn between 1.9% to 2.5%</p>
                            <span>Maximize your profits by leveraging the expertise of top traders.</span>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <img src="/images/bagcoins.svg" alt="bagcoins" />
                </div>
            </div>
        </section>
    )
}

export default SectionFour