import React from 'react';
import './App.css';
import {initGraph} from "./GraphLib/Graph"





class GraphLib extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      Elements:[],
      counter:0,
      StraightLine:null,
      Segment:null,
      Ray:null,
    }
    this.onStateChanged = this.onStateChanged.bind(this)
  }


  onStateChanged(params){
    //console.log(params)
    switch (params.event) {
        case 'Select':
            if(params.state[0]) {
                let view = params.state[0];
                let Elements
                switch (view.type) {
                    case 'Circle':
                          Elements= this.state.Elements.map(el => {
                          if(el.id === view.id){
                            el = view;
                          }else{
                            el.selected=false;
                          }
                          return el
                        })
                        this.setState({Elements });
                        break;
                    default :
                          Elements = this.state.Elements.map(el => {
                          if(el.id === view.id){
                            el = view;
                          }else{
                            el.selected=false;
                          }
                            return el
                          })
                          this.setState({Elements });
                        
                }
            }
            break;
        case 'Create':
            if(params.state[0]) {
                let view = params.state[0];
                let Elements = this.state.Elements.map(el => {el.selected = false; return el});
                switch (view.type) {
                    case 'Circle':
                        view.id = this.state.counter;
                        view.label = "Круг №"+ view.id;
                        view.selected = true;
                        Elements.push(view)
                        break;
                    case 'StraightLine':
                        view.id = this.state.counter;
                        view.label = "Прямая №"+ view.id;
                        view.selected = true;
                        Elements.push(view)
                        break;
                    case 'Segment':
                        view.id = this.state.counter;
                        view.label = "Отрезок №"+ view.id;
                        view.selected = true;
                        Elements.push(view)
                        break;
                    case 'Ray':
                        view.id = this.state.counter;
                        view.label = "Луч №"+ view.id;
                        view.selected = true;
                        Elements.push(view)
                        break;
                }
                this.setState({Elements, counter:this.state.counter+1});
            }
            break;
        case 'Delete':
            if(params.state[0]){
              let Elements = this.state.Elements
              Elements.splice(this.state.Elements.findIndex(el => el.id == params.state[0].id),1)
              this.setState({Elements})
            }
            break;
    }
  }


  componentDidMount(){

    initGraph(
      {
        state: {...this.state},
        callback: this.onStateChanged,
        element: this.refs.canvas,
        background: this.refs.background,
        first: true
      }
    );
  }

  componentDidUpdate(){

    initGraph(
      {
        state: {...this.state},
        callback: this.onStateChanged,
        element: this.refs.canvas,
        background: this.refs.background,
      }
    );
  }



  render() {
    return (
        <div id = 'three' style = {{width : '100%', height: '100%'}}>
          <canvas id ="background" ref="background" tabIndex= '1' style={{position:'absolute', outline: 'none'}}/>
          <canvas id="canvas"  ref="canvas" tabIndex= '2' style={{position:'relative',backgroundColor: 'transparent', outline: 'none'}} />
          <div className="controlPanel">
              <div className="Label">
                  <label>Прямая</label>
                  <input type="checkbox" className="checkbox" id="checkbox" checked = {this.state.StraightLine}/>
                  <label htmlFor="checkbox" onClick = {() => {this.setState({StraightLine:!this.state.StraightLine, Segment:false, Ray:false})}}/>
              </div>
              <div className="Label">
                  <label>Отрезок</label>
                  <div>
                    <input type="checkbox" className="checkbox" id="checkbox" checked = {this.state.Segment}/>
                    <label htmlFor="checkbox" onClick = {() => {this.setState({StraightLine:false, Segment:!this.state.Segment, Ray:false})}}/>
                  </div>
              </div>
              <div className="Label">
                  <label>Луч</label>
                  <div>
                    <input type="checkbox" className="checkbox" id="checkbox" checked = {this.state.Ray}/>
                    <label htmlFor="checkbox" onClick = {() => {this.setState({StraightLine:false, Segment:false, Ray:!this.state.Ray})}}/>
                  </div>
              </div>
          </div>
        </div>
      )
  }

}


export default GraphLib;
