class SoundManager {

    private static soundManager: SoundManager;

    private effectOn: boolean;
    private backgroundOn: boolean;
    private effectVolume: number;
    private backgroundVolume: number;

    private effectSound: SoundEffects;
    private backgroundSound: SoundBackground;

    private constructor() {
        this.effectOn = true;
        this.backgroundOn = true;
        this.effectVolume = 0.5;
        this.backgroundVolume = 0.5;

        this.effectSound = new SoundEffects();
        this.effectSound.setVolume(this.effectVolume);

        this.backgroundSound = new SoundBackground();
        this.backgroundSound.setVolume(this.backgroundVolume);

        // egret.lifecycle.onPause = () => {
        //     this.backgroundSound.stop("");
        // }

        // egret.lifecycle.onResume = () => {
        //     if (this.backgroundOn) {
        //         this.backgroundSound.resume();
        //     }
        // }
    }

    public static getInstance(): SoundManager {
        if (!SoundManager.soundManager) {
            SoundManager.soundManager = new SoundManager();
        }
        return SoundManager.soundManager;
    }

    public pause() {
        this.backgroundSound.stop('');
    }

    public resume() {
        if (this.backgroundOn) {
            this.backgroundSound.resume();
        }
    }

    public getEffectOn(): boolean {
        return this.effectOn;
    }

    public setEffectOn(value: boolean): void {
        if (this.effectOn == value) {
            return;
        }
        this.effectOn = value;
        let v = value ? "0" : "1";
        Platform.getInstance().setLocalStorage(LocalStorageItems.SOUND, v);
        if (!this.effectOn) {
            this.effectSound.stopAll();
        }
    }

    public getBackgroundOn(): boolean {
        return this.backgroundOn;
    }

    public setBackgroundOn(value: boolean): void {
        if (this.backgroundOn == value) {
            return;
        }
        this.backgroundOn = value;
        let v = value ? "0" : "1";
        Platform.getInstance().setLocalStorage(LocalStorageItems.BGM, v);
        if (this.backgroundOn) {
            this.backgroundSound.resume();
        } else {
            this.backgroundSound.stop("");
        }
    }

    public getEffectVolume(): number {
        return this.effectVolume;
    }

    public setEffectVolume(value: number) {
        value = Math.min(value, 1);
        value = Math.max(value, 0);
        this.effectVolume = value;
        this.effectSound.setVolume(this.effectVolume);
    }

    public getBackgroundVolume(): number {
        return this.backgroundVolume;
    }

    public setBackgroundVolume(value: number) {
        value = Math.min(value, 1);
        value = Math.max(value, 0);
        this.backgroundVolume = value;
        this.backgroundSound.setVolume(this.backgroundVolume);
    }

    public playEffect(key: string): void {
        if (!this.effectOn) {
            return;
        }
        this.effectSound.play(key);
    }

    public stopEffect(key: string): void {
        if (!this.effectOn) {
            return;
        }
        this.effectSound.stop(key);
    }

    public stopAllEffect(): void {
        if (!this.effectOn) {
            return;
        }
        this.effectSound.stopAll();
    }

    public playBackground(key: string): void {
        if (!this.backgroundOn) {
            return;
        }
        this.backgroundSound.play(key);
    }

    public stopBackground(): void {
        if (!this.backgroundOn) {
            return;
        }
        this.backgroundSound.stop("");
    }

    public clearCache(): void {
        this.effectSound.clearCache();
        this.backgroundSound.clearCache();
    }

    public initState(): void {
        const bgm = Platform.getInstance().getLocalStorage(LocalStorageItems.BGM);
        if (!bgm || bgm == "0") {
            this.setBackgroundOn(true);
        } else {
            this.setBackgroundOn(false);
        }

        const sound = Platform.getInstance().getLocalStorage(LocalStorageItems.SOUND);
        if (!sound || sound == "0") {
            this.setEffectOn(true);
        } else {
            this.setEffectOn(false);
        }
    }
}