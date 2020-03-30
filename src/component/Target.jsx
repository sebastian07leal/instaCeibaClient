import React from 'react'

import '../styles/component/target.css';

const Target = ({ title, url, like, description, id, likeFunction }) => {

  const callFunciont = () => {
    likeFunction(id);
  }

  return (
    <section className='container__target'>
      <div className='container__title'>
        <h3>{title}</h3>
      </div>
      <img src={url} alt="img"/>
        <p>{description}</p>
      <div className='container__button'>
        <button onClick={callFunciont} type='button'>Like</button>
        <h5>{like}</h5>
      </div>
    </section>
  );
}

export default Target;