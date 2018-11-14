class Voice {

    private _isPlay: boolean;
    private _channel: egret.SoundChannel;
    private _sound: egret.Sound;
    private _position: number = 0;

    public constructor(sound: egret.Sound) {
        this._sound = sound;
        this._isPlay = false;
    }

    public setVolume(value: number): void {
        if (this._channel) {
            this._channel.volume = value;
        }
    }

    public get isPlay(): boolean {
        return this._isPlay;
    }

    public play(startTime: number = 0, loops: number = 0): egret.SoundChannel {
        this._isPlay = true;
        if (this._channel) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.playComplete, this);
        }
        this._channel = this._sound.play(startTime, loops);
        this._channel.addEventListener(egret.Event.SOUND_COMPLETE, this.playComplete, this);
        return this._channel;
    }

    private playComplete(evt: egret.Event): void {
        this._isPlay = false;
    }

    public stop(): void {
        this._isPlay = false;
        if (this._channel) {
            this._position = this._channel.position;
            this._channel.stop();
        }
    }

    public resume() {
        this.play(this._position);
    }

    public dispose(): void {
        if (this._channel) {
            this._channel.stop();
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.playComplete, this);
        }
        this._channel = null;
        this._sound = null;
    }
}