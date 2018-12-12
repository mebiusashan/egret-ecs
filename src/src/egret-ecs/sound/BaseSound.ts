class BaseSound {
    protected cache: any;
    protected volume: number;

    constructor() {
        this.cache = {};
        this.volume = 0.5;
    }

    public play(key: string): void {

    }

    public stop(key: string): void {

    }

    public setVolume(value: number): void {
        this.volume = value;
        let voices: Voice[];
        for (let key in this.cache) {
            voices = this.cache[key];
            voices.map(voice => {
                voice.setVolume(value);
            })
        }
    }

    public clearCache(): void {
        let voices: Voice[];
        for (let key in this.cache) {
            voices = this.cache[key];
            for (let i: number = 0; i < voices.length; i++) {
                if (!voices[i].isPlay) {
                    voices[i].dispose();
                    voices.splice(i);
                    i--;
                }
            }
            if (voices.length == 0) {
                delete this.cache[key];
            }
        }
    }

    protected find(key: string, unused: boolean = false): Voice {
        let voices: Voice[] = this.cache[key];
        if (voices) {
            if (unused) {
                voices.map(voice => {
                    if (!voice.isPlay) {
                        return voice;
                    }
                })
            } else {
                return voices[0];
            }
        }

        let sound: egret.Sound = RES.getRes(key);
        if (sound) {
            if (!voices) {
                voices = [];
                this.cache[key] = voices;
            }
            let voice: Voice = new Voice(sound);
            voices.push(voice);
            return voice;
        }
        console.error("sound resource not found, key:", key);
        return null;
    }

    protected finds(key: string): Voice[] {
        return this.cache[key];
    }
}