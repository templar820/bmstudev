import {state} from "./State"
import {zoomedX_INV, zoomedY_INV,zoomedX, zoomedY, mouse, canvas, render, Scrol, buildGrid, backgroundContext } from "./Drawing.js"
let renderGrig = null;

function move(event) {

    if(state.Line){
        state.Line.finish = {
            x:zoomedX(mouse.rx),
            y:zoomedY(mouse.ry),
        }
    }

    mouse.bounds = canvas.getBoundingClientRect();
    mouse.x = event.clientX - mouse.bounds.left;
    mouse.y = event.clientY - mouse.bounds.top;
    var xx  = mouse.rx;
    var yy  = mouse.ry;
    mouse.rx = zoomedX_INV(mouse.x); 
    mouse.ry = zoomedY_INV(mouse.y);

    if ( (mouse.button === 1 && event.ctrlKey) || event.metaKey) {
        Scrol.wx -= mouse.rx - xx;
        Scrol.wy -= mouse.ry - yy;
        mouse.rx = zoomedX_INV(mouse.x);
        mouse.ry = zoomedY_INV(mouse.y);
        renderGrig = true
        
    }
    render();
}

function out (){
    mouse.button = 0
    render();  
}

function mousedown(e){
    if(e.shiftKey){
        state.Line = {
            type: state.typeLine,
            start:{
                x:zoomedX(mouse.rx),
                y:zoomedY(mouse.ry),
            }
        }
    }
    mouse.button = 1;
    render();  
}

function mouseup(e,syncCallback){
    mouse.button = 0;
    let exportState =[]
    

    if(state.Line){
        let exportState = []
        console.log(state.Line.type)
        switch(state.Line.type){
            case 'StraightLine':
                exportState.push({
                    type: 'StraightLine',
                    x:zoomedX_INV(state.Line.start.x),
                    y:zoomedX_INV(state.Line.start.y),
                    x1:zoomedX_INV(state.Line.finish.x),
                    y1:zoomedX_INV(state.Line.finish.y),
                })
                break;
            case "Segment":
                exportState.push({
                    type: 'Segment',
                    x:zoomedX_INV(state.Line.start.x),
                    y:zoomedX_INV(state.Line.start.y),
                    x1:zoomedX_INV(state.Line.finish.x),
                    y1:zoomedX_INV(state.Line.finish.y),
                })
                break;
            case 'Ray':
                exportState.push({
                    type: 'Ray',
                    x:zoomedX_INV(state.Line.start.x),
                    y:zoomedX_INV(state.Line.start.y),
                    x1:zoomedX_INV(state.Line.finish.x),
                    y1:zoomedX_INV(state.Line.finish.y),
                })
                break;
        }
        syncCallback({
            event:'Create',
            state: exportState,
        })
        return
    }
    render()

    state.circles.forEach(el =>{
        if(el.selected){
            exportState.push({
                type: 'Circle',
                id: el.id,
                label: el.label,
                x:el._x,
                y:el._y,
                selected:el.selected,
            })
        }
    })
    state.straightLines.forEach(el =>{
        if(el.selected){
            exportState.push({
                type: 'StraightLine',
                label: el.label,
                id: el.id,
                x:el._x,
                y:el._y,
                x1: el._x1,
                y1:el._y1,
                selected:el.selected
            })
        }
    })
    state.segments.forEach(el =>{
        if(el.selected){
            exportState.push({
                type: 'Segment',
                label: el.label,
                id: el.id,
                x:el._x,
                y:el._y,
                x1: el._x1,
                y1:el._y1,
                selected:el.selected
            })
        }
    })
    state.rays.forEach(el =>{
        if(el.selected){
            exportState.push({
                type: 'Ray',
                label: el.label,
                id: el.id,
                x:el._x,
                y:el._y,
                x1: el._x1,
                y1:el._y1,
                selected:el.selected
            })
        }
    })
    if(renderGrig){
        buildGrid(backgroundContext)
        renderGrig = null;
    }
    syncCallback({
        event:'Select',
        state: exportState,
    })
}


function trackWheel(e) {
    if(e.ctrlKey || e.metaKey){
        if (e.deltaY < 0) {
            Scrol.scale = Math.min(5, Scrol.scale * 1.1);
        } else {
            Scrol.scale = Math.max(0.1, Scrol.scale * (1 / 1.1));
        }
        Scrol.wx = mouse.rx;
        Scrol.wy = mouse.ry;
        Scrol.sx = mouse.x;
        Scrol.sy = mouse.y;
        mouse.rx = zoomedX_INV(mouse.x);
        mouse.ry = zoomedY_INV(mouse.y);
        e.preventDefault();
        render();
        buildGrid(backgroundContext)
    }
}

function keyManager(e, syncCallback){
    if(e.altKey){
        console.log(state)
    }



    if(e.key === 'Delete' || e.key === 'Backspace'){
        let exportState =[]
        state.circles.forEach(el =>{
            if(el.selected){
                exportState.push({
                    type: 'Circle',
                    id: el.id,
                    label: el.label,
                    x:el._x,
                    y:el._y,
                    selected:el.selected,
                    deleted:true
                })
            }
        })
        state.straightLines.forEach(el =>{
            if(el.selected){
                exportState.push({
                    type: 'StraightLine',
                    label: el.label,
                    id: el.id,
                    x:el._x,
                    y:el._y,
                    x1: el._x1,
                    y1:el._y1,
                    selected:el.selected
                })
            }
        })
        state.segments.forEach(el =>{
            if(el.selected){
                exportState.push({
                    type: 'Segment',
                    label: el.label,
                    id: el.id,
                    x:el._x,
                    y:el._y,
                    x1: el._x1,
                    y1:el._y1,
                    selected:el.selected
                })
            }
        })
        state.rays.forEach(el =>{
            if(el.selected){
                exportState.push({
                    type: 'Ray',
                    label: el.label,
                    id: el.id,
                    x:el._x,
                    y:el._y,
                    x1: el._x1,
                    y1:el._y1,
                    selected:el.selected
                })
            }
        })


        syncCallback({
            event:'Delete',
            state: exportState,
        })
    }        
}



const onCreateCircle = (e,syncCallback) => {
    let circles = state.circles;
    if(!circles.find(el => el.hovered ===true)){
        syncCallback({
            event: 'Create',
            state: [
                {
                    type: 'Circle',
                    x:mouse.rx,
                    y:mouse.ry,
                },
            ]
        })
    }
}









export function initListeners(canvas, mouse, syncCallback){
    let map = {
        dblclick: onCreateCircle,
        wheel: trackWheel,
        mousemove: move,
        mousedown: mousedown,
        mouseup: mouseup,
        mouseout: out,
        keydown: keyManager
    };


    for ( let event in map ){
        canvas.addEventListener(event, e=> {
            if(
                event == 'dblclick'
                || event == 'mouseup'
                || event == 'keydown'
            ){
                map[event](e, syncCallback);
            }else{
                map[event](e)
            };
        });   
    }
} 