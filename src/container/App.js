import React, { Component } from 'react';
import '../styles/container/App.css';

import Target from '../component/Target';
import Header from '../component/Header';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      urlAPI: 'http://localhost:4000/usercount/',
      dataTarget: []
    };

    this.postLike = this.postLike.bind(this);
    this.findLike = this.findLike.bind(this);
    this.getData = this.getData.bind(this);
    this.renderData = this.renderData.bind(this);
    this.insertDataTarget = this.insertDataTarget.bind(this);
  }

  async componentDidMount() {
    try {
      
      const url = this.state.urlAPI; 
      const dataArray = await this.getData(url);

      if(this.state.dataTarget !== dataArray) {
          this.insertDataTarget(dataArray);
      }

    } catch (err) {
      console.log(err)
    }

  }


  async getData(url) {

    const headerFetch = new Headers();
    headerFetch.get('Content-Type','application/json');
    const config = {headers: headerFetch, mode: 'cors'};

    try {

      const response = await fetch(url, config);
      const data = await response.json();
      return data;

    } catch (err) {
      console.log(err);
    }
  }

  insertDataTarget(data) {

    const dataPush = data.map((post) => {

      return (
        <Target
          key={post._id}
          id={post._id}
          title={post.title}
          like={post.likes}
          description={post.comment}
          url={post.url}
          likeFunction={this.findLike}
        />
      );
    });

    this.setState({ dataTarget: dataPush});
    return dataPush;
  }


  renderData() {
    const data = this.state.dataTarget;

    if(data !== []) {
      return data
    } else {

      return <h1>Espere un momento los datos se encuentran cargando</h1>;
    }

  }

  findLike(idPost) {

    const arrayPost = this.state.dataTarget;
    const findObject = arrayPost.find((elm) => elm.key === idPost);
    const objectNewData = {
      "likes": findObject.props.like + 1,
      "title": findObject.props.title,
      "comment": findObject.props.description,
      "url": findObject.props.url
    }

    console.log();

    this.postLike(objectNewData, idPost);
  }

  async postLike(data, id) {

    try {

      const url = `${this.state.urlAPI}${id}`;
      const config = { method: 'PUT', mode: 'cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)};
  
      const reques = await fetch(url, config);
      const dataReq = await reques.json();

      console.log(data);

      // eslint-disable-next-line no-restricted-globals
      location.reload()
      
    } catch (err) {
      console.log(err)
    }

  }


  render() {

    return (
      <>
      <Header></Header>
      <section className='container'>
        <div className='hero'>
          {
            this.renderData()
          }
        </div>
      </section>
    </>
    );
  }
  
}

export default App;
