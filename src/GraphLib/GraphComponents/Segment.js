import CanvasItem from "./CanvasItem"
import {state} from "../State"
import {zoomedX_INV, zoomedY_INV, WIDTH, HEIGHT} from "../Drawing.js"
import {Palette, PaletteSettings} from "../Palette"

export default class Segment extends CanvasItem{  
    name = 'Segment';                          
    movingStart = false;
    movingFinish = false;
    label;
    constructor(X, Y, X1, Y1, id , label, selected){
        super(40, X, Y,X1,Y1);
        this.id = id;
        this.label = label
        this.selected = selected;
        this.lineEquation()
    }

    changeCoorsStart(x,y){ 
        this.x = zoomedX_INV(x - this.dragged.x)
        this.y = zoomedY_INV(y - this.dragged.y);
        //console.log(this.x + ":"+ this.y)
    }
    changeCoorsFinish(x,y){ 
        this.x1 = zoomedX_INV(x - this.dragged.x)
        this.y1 = zoomedY_INV(y - this.dragged.y);
        //console.log(this.x + ":"+ this.y)
    }

    lineEquation() {
        let p1 = {x: this.x, y : this.y}
        let p2 = {x: this.x1, y : this.y1}
        const dx = p1.x - p2.x;
        if (Math.abs(dx) < 1e-3) {
                return { x: p1.x, vertical: true, points: [p1, p2] };
        }
        const k = (p1.y - p2.y) / dx;
        const c = p1.y - k * p1.x;
        return { k, c, vertical: false, points: [p1, p2] };
    }


    render(ctx, mouseX, mouseY, event){
        Palette.PaintSegment(this)
        this.findSegment(mouseX, mouseY);
        if(this.movingStart){
            this.changeCoorsStart(mouseX, mouseY );
        }
        if(this.movingFinish){
            this.changeCoorsFinish(mouseX, mouseY );
        }
    }

    
}

