
import {zoomedX, zoomedY, Drawing, mouse, render, zoomedX_INV, zoomedY_INV, buildGrid} from "./Drawing"
import {initListeners} from  "./ActionControl"
import {state} from "./State"
import Circle from "./GraphComponents/Circle"
import StraightLines from "./GraphComponents/StraightLine"
import Segment from "./GraphComponents/Segment"
import Ray from "./GraphComponents/Ray"




const toCircle = (element) => {
    let circles = state.circles;
    if(!element.deleted){
        circles.push(new Circle(zoomedX(element.x), zoomedY(element.y),element.id,element.label, element.selected))
        state.circles = circles
    }

}
const toStraightLine = (element) => {
    let straightLines = state.straightLines;
    // console.log("Пришли:[{" +element.x+', '+element.y + "},{" + element.x1 + ', ' + element.y1+"}]")
    // console.log("Записали:[{" +zoomedX(element.x)+', '+zoomedY(element.y) + "},{" + zoomedX(element.x) + ', ' + zoomedY(element.y)+"}]")
    if(!element.deleted){
        straightLines.push(new StraightLines(zoomedX(element.x), zoomedY(element.y),zoomedX(element.x1), zoomedY(element.y1),element.id,element.label, element.selected))
        state.straightLines = straightLines
    }
}

const toSegment = (element) => {
    let segments = state.segments;
    if(!element.deleted){
        segments.push(new Segment(zoomedX(element.x), zoomedY(element.y),zoomedX(element.x1), zoomedY(element.y1),element.id,element.label, element.selected))
        state.segments = segments
    }
}

const toRay = (element) => {
    let reays = state.rays;
    if(!element.deleted){
        reays.push(new Ray(zoomedX(element.x), zoomedY(element.y),zoomedX(element.x1), zoomedY(element.y1),element.id,element.label, element.selected))
        state.reays = reays
    }

}



function initState(Graph){
    console.log(Graph)
    Graph.forEach(currentItem => {
        switch (currentItem.type) {
            case 'Circle':
                toCircle(currentItem)
                break;
            case 'Ray':
                toRay(currentItem)
                break;
            case 'StraightLine':
                toStraightLine(currentItem)
                break;
            case 'Segment':
                toSegment(currentItem)
                break;
        }
    });
}








export const initGraph = (params) =>{
    state.circles = [];
    state.straightLines = [];
    state.segments = [];
    state.rays = [];
    let background = params.background
    let canvas = params.element;
    new Drawing({canvas: canvas, background: background});
    if(params.first)initListeners(canvas, mouse, params.callback);
    initState(params.state.Elements)
    //state.tools = tools;
    window.onresize = () => {
        let container = document.getElementById('three')
        canvas.width = container.offsetWidth ;
        canvas.height = container.offsetHeight ;
        background.width = container.offsetWidth ;
        background.height = container.offsetHeight ;
        initGraph(params)
    }
    buildGrid(params.background.getContext('2d'))
    state.syncCallback = params.callback
    if(params.state.Ray){
        state.typeLine = 'Ray'
    }else if(params.state.Segment){
        state.typeLine = 'Segment'
    }else if(params.state.StraightLine){
        state.typeLine = 'StraightLine'
    }
    render();
}