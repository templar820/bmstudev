import {state} from "./State"
import {zoomed, ctx, WIDTH, HEIGHT} from "./Drawing"



export let PaletteSettings = {
    SelectedCircleColor :'#99ccff',
    SelectedLineColor : '#3399ff',

    CircleWidth: 300,
    CircleHeight: 300,

    CircleBackgroundColor:'#eee',
    CircleOutlineColor : '#999',

    CircleFont : "Arial",
    CircleFontSize: 25,
    CircleFontColor: "black",
    CircleFontAlign: "center",

    StraightLineColor: 'black',
    StraightLineFont : "Arial",
    StraightLineFontSize: 25,
    StraightLineFontColor: "black",
    StraightLineFontAlign: "center",

    LineFont : "Arial",
    LineFontSize: 25,
    LineFontColor: "black",
    LineFontAlign: "center",
}

function PaintCircleLabel(el){
    let lineHeight = zoomed(PaletteSettings[`${el.name}` + 'FontSize'] + 4)
    let x = el.x;
    let y = el.y;
    let text   = el.label;
    let width  = el.width;

    ctx.font = lineHeight + "px " + PaletteSettings[`${el.name}` + 'Font'];
    ctx.fillStyle = PaletteSettings[`${el.name}` + 'FontColor'];
    ctx.textAlign = PaletteSettings[`${el.name}` + 'FontAlign'];

    var words = text.split("-");
    var countWords = words.length;
    var line = "";
    for (var n = 0; n < countWords; n++) {
        var testLine = line + words[n] + " ";
        var testWidth = ctx.measureText(testLine).width;
        if (testWidth > width) {
            ctx.fillText(line, x, y);
            line = words[n] + " ";
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

function PaintLineLabel(line){
    let alignment = 'center';
    let padding = 0;
    let p1 = {x:line.x, y:line.y}
    let p2 = {x: line.x1, y: line.y1}
  
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;  
    var p, pad;


    p = p1;
    pad = 1/2;
    let lineHeight = zoomed(PaletteSettings[`${line.name}` + 'FontSize'] + 4)
    ctx.font = lineHeight + "px " + PaletteSettings[`${line.name}` + 'Font'];
    ctx.fillStyle = 'black'
    ctx.save();
    ctx.textAlign = alignment;
    ctx.translate(p.x+dx*pad,p.y+dy*pad);
    ctx.rotate(Math.atan2(dy,dx));
    ctx.fillText(line.label,0,0);
    ctx.restore();
}



export let Palette = {

    PaintCircle(circle){
        if(circle.selected){
            ctx.fillStyle = PaletteSettings.SelectedCircleColor;
            ctx.strokeStyle = PaletteSettings.SelectedCircleColor;
        }else{
            ctx.fillStyle = PaletteSettings.CircleBackgroundColor;
            ctx.strokeStyle = PaletteSettings.CircleOutlineColor;
        }
        let circleDraw = new Path2D();
        circleDraw.moveTo(circle.x, circle.y);

        circleDraw.arc(circle.x, circle.y, circle.width/2, 0, 2 * Math.PI);
        ctx.stroke(circleDraw)
        ctx.fill(circleDraw)

        
        PaintCircleLabel(circle)
    },

    PaintSegment(line){
        let color = (line.selected)? PaletteSettings.SelectedLineColor: PaletteSettings.StraightLineColor
        ctx.save();
        let outlinecircle = new Path2D();
        if(line.hovered){
            ctx.fillStyle = "rgba(255,255,255,0.8)"
            outlinecircle.arc(line.x, line.y, line.width, 0, 2 * Math.PI);
            outlinecircle.arc(line.x1, line.y1, line.width, 0, 2 * Math.PI);
            ctx.fill(outlinecircle)
        }
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x1, line.y1);
        ctx.stroke();
        ctx.restore();
      
        ctx.save();
        ctx.beginPath();
        ctx.arc(line.x, line.y, 4, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(line.x1, line.y1, 4, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
        PaintLineLabel(line)
    },

    PaintRay(line){
        let equation = line.lineEquation()
        let color = (line.selected)? PaletteSettings.SelectedLineColor: PaletteSettings.StraightLineColor
        let outlinecircle = new Path2D();
        if(line.hovered){
            ctx.fillStyle = "rgba(255,255,255,0.8)"
            outlinecircle.arc(line.x, line.y, line.width, 0, 2 * Math.PI);
            outlinecircle.arc(line.x1, line.y1, line.width, 0, 2 * Math.PI);
            ctx.fill(outlinecircle)
        }
        const minX = 0;
        const maxX = ctx.canvas.width;
        let from, to;
        if (!equation.vertical) {
            const { k, c } = equation;
            if(line.x >line.x1){
                to = { x: minX, y: k * minX + c };
            }else{
                to = { x: maxX, y: k * maxX + c };
            }
            // from = { x: minX, y: k * minX + c };
        }
        if(equation.vertical){
            from = { x: line.x, y: 0};
            to = { x: line.x, y: ctx.canvas.height};
        }


        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.restore();
      
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = color
        ctx.arc(line.x, line.y, 4, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(line.x1, line.y1, 4, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
        PaintLineLabel(line)
    },



    PaintStraightLine(line){
        let equation = line.lineEquation()
        let color = (line.selected)? PaletteSettings.SelectedLineColor: PaletteSettings.StraightLineColor
        let outlinecircle = new Path2D();
        if(line.hovered){
            ctx.fillStyle = "rgba(255,255,255,0.8)"
            outlinecircle.arc(line.x, line.y, line.width, 0, 2 * Math.PI);
            outlinecircle.arc(line.x1, line.y1, line.width, 0, 2 * Math.PI);
            ctx.fill(outlinecircle)
        }
        const minX = 0;
        const maxX = ctx.canvas.width;
        let from, to;
        if (!equation.vertical) {
            const { k, c } = equation;
          from = { x: minX, y: k * minX + c };
          to = { x: maxX, y: k * maxX + c };
        }
        if(equation.vertical){
            from = { x: line.x, y: 0};
            to = { x: line.x, y: ctx.canvas.height};
        }
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.restore();
      
        ctx.save();
        ctx.beginPath();
        ctx.arc(line.x, line.y, 4, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(line.x1, line.y1, 4, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.restore();
        PaintLineLabel(line)
    },
}
