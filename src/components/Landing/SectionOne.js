import React from 'react'

const SectionOne = () => {
  return (
    <section className="section_one_container">
      <section
        className="section_one"
        style={{
          backgroundImage: 'url(/images/looper.svg)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right',
        }}
      >
        <div className="section_one_center">
          <div className="left">
            <h1>
              Achieve <span>Trading</span> Success with Universal FX
            </h1>
            <p>
              Welcome to Universal FX, your gateway to hassle-free trading
              success! We specialize in copy trading, a revolutionary concept
              that allows you to follow the strategies of experienced traders
              automatically.
            </p>
            <button>Download PDF</button>
          </div>
          <div className="right">
            <img src="/images/crypto.png" alt="crypto" />
          </div>
        </div>
        <div className="section_one_bottom">
          <h2>We predict accurate market trends</h2>
          <article className="trends">
            <div className="trend">
              <div className="trend_top">
                <img className="logo" src="/images/tesla.svg" alt="tesla" />
                <p>TESLA</p>
                <img src="/images/arrowtr.svg" alt="arrow" />
              </div>
              <aside className="trend_bottom">
                <div className="left">
                  <p className="price">
                    174.24 <span>D</span>
                  </p>
                  <p>+5.50 (+3.17%)</p>
                </div>
                <img src="/images/trendline.svg" alt="trendline" />
              </aside>
            </div>
            <div className="trend">
              <div className="trend_top">
                <img className="logo" src="/images/apple.svg" alt="apple" />
                <p>Apple</p>
                <img src="/images/arrowtr.svg" alt="arrow" />
              </div>
              <aside className="trend_bottom">
                <div className="left">
                  <p className="price">
                    189.98 <span>D</span>
                  </p>
                  <p>+5.50 (+3.17%)</p>
                </div>
                <img src="/images/trendline.svg" alt="trendline" />
              </aside>
            </div>
            <div className="trend">
              <div className="trend_top">
                <img className="logo" src="/images/apple.svg" alt="apple" />
                <p>Apple</p>
                <img src="/images/arrowtr.svg" alt="arrow" />
              </div>
              <aside className="trend_bottom">
                <div className="left">
                  <p className="price">
                    189.98 <span>D</span>
                  </p>
                  <p>+5.50 (+3.17%)</p>
                </div>
                <img src="/images/trendline.svg" alt="trendline" />
              </aside>
            </div>
          </article>
        </div>
      </section>
    </section>
  )
}

export default SectionOne
