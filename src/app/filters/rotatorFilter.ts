export class RotatorFilter implements Filter {
    private alphabet: string = "abcdefghijklmnopqrstuvwxyz0123456789";
    private rotation: number = 0;
    private advancerValue: number = 0;
    private maxRotation: number;
    private hasAdvancer: boolean;
    private maxAdvancer: number;

    constructor(maxRotation: number){
        this.maxRotation = maxRotation;
        this.hasAdvancer = false;
        this.maxAdvancer = 0;
    }

    setHasAdvancer(hasAdvancer: boolean) {
        this.hasAdvancer = hasAdvancer;
    }

    setMaxAdvancer(maxAdvancer: number) {
        this.maxAdvancer = maxAdvancer;
    }

    setRotation(rotation: number){
        this.rotation = Number(rotation);
    }

    setAdvancer(advancer: number){
        this.advancerValue = advancer;
    }

    filter(text: string): string {
        let rotatedText: string = '';
        let shift: number = 0;
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const index = this.alphabet.indexOf(char.toLowerCase());
          if(index !== -1) {
            let newIndex = (index + this.rotation + shift) % this.alphabet.length;
            if(newIndex < 0) {
              newIndex += this.alphabet.length;
            }
            rotatedText += this.alphabet.charAt(newIndex);
          }
          shift += this.advancerValue;
        }
        return rotatedText;
    }

    randomizeConfiguration(): void {
      this.rotation = Math.floor(Math.random() * this.maxRotation + 1) * (Math.random() < 0.5 ? -1 : 1);
      if(this.hasAdvancer) {
          this.advancerValue = Math.floor(Math.random() * this.maxAdvancer + 1) * (Math.random() < 0.5 ? -1 : 1);
      }
    }

    toString(): string {
      return "Rotator: Rotation=" + this.rotation + ", Advancer=" + this.advancerValue + "\n";
    }
}