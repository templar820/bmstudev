import {state} from "../State"
import {zoomed, zoomedX, zoomedX_INV, zoomedY, zoomedY_INV, mouse, canvas } from "../Drawing.js"

export default  class CanvasItem{
    _width;
    get width() { return zoomed(this._width) };
    set width(v) { this._width = v; }

    _height;
    get height(){return zoomed(this._height) }
    set height(v){ this._height = v; }

    _x;
    get x(){ return zoomedX(this._x) }
    set x(v){ this._x = v; }

    _y;
    get y(){return zoomedY(this._y) }
    set y(v){ this._y = v; }

    
    _x1;
    get x1(){ return zoomedX(this._x1) }
    set x1(v){ this._x1 = v; }

    _y1;
    get y1(){return zoomedY(this._y1) }
    set y1(v){ this._y1 = v; }
    
    

    constructor(width, X, Y, X1, Y1){
        this.width = width;
        this.x = zoomedX_INV(X);
        this.y = zoomedY_INV(Y);
        this.x1 = zoomedX_INV(X1);
        this.y1 = zoomedY_INV(Y1);
    }



    findCircle(x,y){
        if(this.hoveredCircle(x,y)){
            if(mouse.button){
                if(!state.SelectedElement && !state.Line){
                    this.dragged = {
                        x: x - this.x,
                        y: y - this.y
                    };
                    this.moving=true
                    state.SelectedElement = this;
                };
            }else{
                if(this.dragged) this.selected = true;
                this.dragged = null;
                state.SelectedElement = null;
                this.moving = false;
            }
        }else{
            if(this.dragged){
                this.selected = true;
            }
            if(mouse.button){
                this.selected = null;
                if(this === state.SelectedElement){
                    state.SelectedElement = null;
                }
            }
        }
    }

    findStraightLine(x,y){
        if(this.hoveredCircle(x,y)){
            if(mouse.button){
                if(this.dragged){
                    this.movingStart = true
                }
                if(!state.SelectedElement && !state.Line){
                    this.dragged = {
                        x: x - this.x,
                        y: y - this.y
                    };
                    state.SelectedElement = this;
                };
            }else{
                if(this.dragged) this.selected = true;
                this.dragged = null;
                state.SelectedElement = null;
                this.movingStart = false;
            }
        }else if (this.hoveredCircle1(x,y)){
            if(mouse.button){
                if(this.dragged){
                    this.movingFinish = true
                }
                if(!state.SelectedElement && !state.Line){
                    this.dragged = {
                        x: x - this.x1,
                        y: y - this.y1
                    };
                    state.SelectedElement = this;
                };
            }else{
                if(this.dragged) this.selected = true;
                this.dragged = null;
                state.SelectedElement = null;
                this.movingFinish = false;
            }
        }else{
            if(this.dragged){
                this.selected = true;
            }
            if(mouse.button){
                this.selected = null;
                if(this === state.SelectedElement){
                    state.SelectedElement = null;
                }
            }
        }
    }

    findSegment(x,y){
        if(this.hoveredCircle(x,y)){
            if(mouse.button){
                if(this.dragged){
                    this.movingStart = true
                }
                if(!state.SelectedElement && !state.Line){
                    this.dragged = {
                        x: x - this.x,
                        y: y - this.y
                    };
                    state.SelectedElement = this;
                };
            }else{
                if(this.dragged) this.selected = true;
                this.dragged = null;
                state.SelectedElement = null;
                this.movingStart = false;
            }
        }else if (this.hoveredCircle1(x,y)){
            if(mouse.button){
                if(this.dragged){
                    this.movingFinish = true
                }
                if(!state.SelectedElement && !state.Line){
                    this.dragged = {
                        x: x - this.x1,
                        y: y - this.y1
                    };
                    state.SelectedElement = this;
                };
            }else{
                if(this.dragged) this.selected = true;
                this.dragged = null;
                state.SelectedElement = null;
                this.movingFinish = false;
            }
        }else{
            if(this.dragged){
                this.selected = true;
            }
            if(mouse.button){
                this.selected = null;
                if(this === state.SelectedElement){
                    state.SelectedElement = null;
                }
            }
        }
    }



    findRay(x,y){
        if(this.hoveredCircle(x,y)){
            if(mouse.button){
                if(this.dragged){
                    this.movingStart = true
                }
                if(!state.SelectedElement && !state.Line){
                    this.dragged = {
                        x: x - this.x,
                        y: y - this.y
                    };
                    state.SelectedElement = this;
                };
            }else{
                if(this.dragged) this.selected = true;
                this.dragged = null;
                state.SelectedElement = null;
                this.movingStart = false;
            }
        }else if (this.hoveredCircle1(x,y)){
            if(mouse.button){
                if(this.dragged){
                    this.movingFinish = true
                }
                if(!state.SelectedElement && !state.Line){
                    this.dragged = {
                        x: x - this.x1,
                        y: y - this.y1
                    };
                    state.SelectedElement = this;
                };
            }else{
                if(this.dragged) this.selected = true;
                this.dragged = null;
                state.SelectedElement = null;
                this.movingFinish = false;
            }
        }else{
            if(this.dragged){
                this.selected = true;
            }
            if(mouse.button){
                this.selected = null;
                if(this === state.SelectedElement){
                    state.SelectedElement = null;
                }
            }
        }
    }


    hoveredCircle(x,y){
        if((x- this.x)**2 + (y-this.y)**2 <(this.width)**2){
            this.hovered = true;
            canvas.style.cursor = "pointer"
        }else{
            this.hovered = false;
            canvas.style.cursor = "default"
        }
        return this.hovered
    }
    hoveredCircle1(x,y){
        if((x- this.x1)**2 + (y-this.y1)**2 <(this.width)**2){
            this.hovered = true;
            canvas.style.cursor = "pointer"
        }else{
            this.hovered = false;
            canvas.style.cursor = "default"
        }
        return this.hovered
    }
}

