


export class Pokemon {
  constructor(
    public id: number,
    public name: string,
    public types: string[],
    public avatar: string,
    public sprites: string[],

    public color: string,
    
    public games: string[],
    public stats: Stats[],
    public abilities: string[],
    public moves: Move[],
  ) {}
}


export class Stats {
  constructor(
    public name: string,
    public value: number,
  ) {}
}

export class Move {
  constructor(
    public name: string,
    public level: number,
  ) {}
}