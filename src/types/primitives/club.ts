export type Club = {
    name: string;
    desc: string;
    contact: string;
    image: string;
    events: string[];
  };

export type Clubs = {
    [clubID: number] :Club;
}


  