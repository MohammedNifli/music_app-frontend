export interface Song{
    id:string;
    title:string;
    artist:string;
    coverArt:string;
    duration:string;
    lyrics:string;
}


export interface PlayerState{
    isPlaying:boolean;
    progress:number;
}