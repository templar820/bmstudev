export let state = {
    _circles: [],
    set circles(circles){
        this._circles = circles;
    },
    get circles(){
        return this._circles;
    },
    _straightLines: [],
    set straightLines(straightLines){
        this._straightLines = straightLines;
    },
    get straightLines(){
        return this._straightLines;
    },
    _segments:[],
    set segments(el){
        this._segments = el
    },
    get segments(){
        return this._segments
    },
    _rays:[],
    set rays(el){
        this._rays = el
    },
    get rays(){
        return this._rays
    },


    Line: null,
    typeLine: '',
}





