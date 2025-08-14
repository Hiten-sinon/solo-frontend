import React from 'react'
import { Col, Container } from 'react-bootstrap'
import CountUp from "react-countup"

const Number = () => {
  const stats = [
    { value: 130, text: "Success project that tells the full story of our client dream" },
    { value: 40, text: "Success project that tells the full story of our client dream" },
    { value: 1000, text: "Success project that tells the full story of our client dream" },
    { value: 15, text: "Success project that tells the full story of our client dream" },
  ];
  return (
    <section className='number'>
      <Container>
        <div className='number-title'>
          <h2>Solo Numbers</h2>
          <p>A Success career must have a trusted partners to help you though the journey</p>
        </div>
        <div className='counter-main'>
          <div className="row g-4 justify-content-center">
            {stats.map((item, i) => (
              <div
                key={i}
                className="col-6 col-md-3"
              >
                <div
                  className="p-4 text-center bg-white shadow-sm box-number"
                  style={{ minHeight: "150px" }}
                >
                  <h3 className="fw-bold">
                    <CountUp end={item.value} duration={2} />+
                  </h3>
                  <p className="mb-0 small">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Number
