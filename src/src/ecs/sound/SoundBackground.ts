class SoundBackground extends BaseSound {
    private curKey: string = "";
    public constructor() {
        super();
    }

    public play(key: string): void {
        if (key == this.curKey) {
            return;
        }

        if (this.curKey != "") {
            this.stop(this.curKey);
        }
        this.curKey = key;
        let voice: Voice = this.find(key);
        if (voice) {
            voice.play();
            voice.setVolume(this.volume);
        }
    }

    public stop(key: string): void {
        if (key == "") {
            key = this.curKey;
        }
        if (key == '') {
            return;
        }
        let voice: Voice = this.find(key);
        if (voice) {
            voice.stop();
        }
    }

    public resume(): void {
        let voice: Voice = this.find(this.curKey);
        if (voice) {
            voice.resume();
            voice.setVolume(this.volume);
        }
    }
}