import CanvasItem from "./CanvasItem"
import {state} from "../State"
import {zoomedX_INV, zoomedY_INV, STEP} from "../Drawing.js"
import {Palette, PaletteSettings} from "../Palette"

export default class Circle extends CanvasItem{  
    name = 'Circle';                          
    moving = false;
    label;
    constructor(X, Y, id , label, selected){
        super(PaletteSettings.CircleWidth, X, Y,X,Y);
        let x_dis = Math.round(zoomedX_INV(X));
        let y_dis = Math.round(zoomedY_INV(Y));
        this.x = Math.min(x_dis-x_dis%STEP,x_dis-x_dis%STEP + STEP)
        this.y = Math.min(y_dis-y_dis%STEP,y_dis-y_dis%STEP + STEP);
        this.id = id;
        this.label = label
        this.selected = selected;
    }

    changeCoors(x,y){ 
        this.x = zoomedX_INV(x - this.dragged.x)
        this.y = zoomedY_INV(y - this.dragged.y);
        //console.log(this.x + ":"+ this.y)
    }

    delete(){
        let edgesDelete = []
        for(let edges of state.edges){
            for(let port of this.ports){
                if(port === edges.SourcePort || port === edges.TargetPort){
                    edgesDelete.push(edges);
                }
            }
        }
        edgesDelete.forEach(el => {el.delete()})
        this.deleted = true;
    }

    render(ctx, mouseX, mouseY){
        Palette.PaintCircle(this)
        this.findCircle(mouseX, mouseY);
        if(this.moving){
            this.changeCoors(mouseX, mouseY );
        }
    }
}

