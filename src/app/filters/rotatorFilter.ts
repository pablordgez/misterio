export class RotatorFilter implements Filter {
    private alphabet: string = "abcdefghijklmnopqrstuvwxyz0123456789";
    private rotation: number = 0;
    private advancerValue: number = 0;

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

}