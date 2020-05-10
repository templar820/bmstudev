import {state} from "./State"

export var canvas
export var ctx
export let backgroundContext
export let background
export var HEIGHT
export var WIDTH 
export let STEP = 100

export let Scrol = {
    scale : 0.5,
    wx    : 0,
    wy    : 0,
    sx    : 0,
    sy    : 0,
} 

export var mouse = {
    x: 0,
    y: 0,
    rx: 0,
    ry: 0,
    button: 0
};

export class Drawing{
    STEP = 100;
    constructor(params){
        background = params.background;
        backgroundContext = background.getContext('2d')
        background.width  = background.offsetWidth;
        background.height = background.offsetHeight;
        canvas = params.canvas;
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx = canvas.getContext('2d');
        HEIGHT = canvas.height;
        WIDTH = canvas.width;
    }
}

export function zoomed(number) {
    return (number * Scrol.scale);
}
export function zoomedX(number) {
    return (number - Scrol.wx) * Scrol.scale + Scrol.sx;
}
export function zoomedY(number) {
    return ((number - Scrol.wy) * Scrol.scale + Scrol.sy);
}
export function zoomedX_INV(number) {
    return ((number - Scrol.sx) * (1 / Scrol.scale) + Scrol.wx);
}
export function zoomedY_INV(number) {
    return ((number - Scrol.sy) * (1 / Scrol.scale) + Scrol.wy);
}

export function buildGrid(context){
    context.clearRect(0,0, WIDTH, HEIGHT);
    for(let i = -100; i < 100; i++){
        for(let j = -100; j < 100; j++){
            context.fillStyle = '#F0F0F0';   
            context.fillRect( zoomedX( (i*STEP) + 2), zoomedY((j*STEP) + 2), zoomed(STEP - 4), zoomed(STEP - 4) )
        }
    }
}


export function render() {
    // if(event && event.ctrlKey){
    //     debugger
    // }
    ctx.clearRect(0,0, WIDTH, HEIGHT);

    state.circles.forEach( el=> {
        el.render(ctx, mouse.x, mouse.y)
    });
    state.straightLines.forEach( el=> {
        el.render(ctx, mouse.x, mouse.y);
    });
    state.segments.forEach( el=> {
        el.render(ctx, mouse.x, mouse.y);
    });
    state.rays.forEach( el=> {
        el.render(ctx, mouse.x, mouse.y);
    });
    if(mouse.button && state.Line){
        let target = mouse;
        var headlen = zoomed(15);
        let source = state.Line.start
        var angle = Math.atan2(target.y-source.y,target.x-source.x);
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y)
        ctx.lineTo(target.x-headlen*Math.cos(angle-Math.PI/7),target.y-headlen*Math.sin(angle-Math.PI/7));
        ctx.lineTo(target.x-headlen*Math.cos(angle-Math.PI/7),target.y-headlen*Math.sin(angle-Math.PI/7));
        ctx.moveTo(target.x, target.y);
        ctx.lineTo(target.x-headlen*Math.cos(angle+Math.PI/7),target.y-headlen*Math.sin(angle+Math.PI/7));
        ctx.lineTo(target.x, target.y);
        ctx.lineTo(target.x-headlen*Math.cos(angle-Math.PI/7),target.y-headlen*Math.sin(angle-Math.PI/7));
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }else if (!mouse.button && state.Line){
        state.Line = null
    }
}