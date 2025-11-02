export class NumberifierFilter implements Filter {
    private state: number = 1;
    private alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
    private validStates: Record<number, string>;

    constructor(private states: Record<number, string>){
        this.validStates = { ...states };
    }

    setState(state: number){
        this.state = Number(state);
    }

    filter(text: string): string {
        return this.state === 0 ? this.unNumberifyText(text) :
                this.state === 1 ? text :
                this.numberifyText(text);
    }

    private numberifyText(text: string) : string{
    let outputText: string = '';
    for(let i = 0; i < text.length; i++){
      const char = text[i];
      if(!isNaN(parseInt(char))){
        outputText += char;
      }
      else{
        const index = this.alphabet.indexOf(char.toLowerCase());
        if(index !== -1){
          outputText += (index + 1).toString();
        }
      }
    }
    return outputText;
  }

  private unNumberifyText(text: string) : string{
    let outputText: string = '';
    for(let i = 0; i < text.length; i++){
      const char = text[i];
      if(!isNaN(parseInt(char))){
        const index = parseInt(char);
        if(index >= 0 && index < this.alphabet.length){
          outputText += this.alphabet.charAt(index);
        }
      } else {
        outputText += char;
      }
    }
    return outputText;
  }

  randomizeConfiguration(): void {
    this.setState(Math.floor(Math.random() * Object.keys(this.validStates).length));
  }

  toString(): string {
    return "Numberifier: " + this.validStates[this.state] + "\n";
  }

}
