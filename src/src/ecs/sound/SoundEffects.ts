class SoundEffects extends BaseSound {

    public play(key: string): void {
        let voice: Voice = this.find(key, true);
        if (voice) {
            voice.play(0, 1);
            voice.setVolume(this.volume);
        }
    }

    public stop(key: string): void {
        let voices: Voice[] = this.finds(key);
        if (voices) {
            voices.map(voice => {
                voice.stop();
            })
        }
    }

    public stopAll(): void {
        let voices: Voice[];
        for (let key in this.cache) {
            voices = this.cache[key];
            voices.map(voice => {
                voice.stop();
            })
        }
    }

}