var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Keyboard = (function (_super) {
    __extends(Keyboard, _super);
    function Keyboard() {
        var _this = _super.call(this) || this;
        _this.inputs = [];
        _this.keyValue = {
            "27": Keyboard.Esc,
            "112": Keyboard.F1,
            "113": Keyboard.F2,
            "114": Keyboard.F3,
            "115": Keyboard.F4,
            "116": Keyboard.F5,
            "117": Keyboard.F6,
            "118": Keyboard.F7,
            "119": Keyboard.F8,
            "120": Keyboard.F9,
            "121": Keyboard.F10,
            "122": Keyboard.F11,
            "123": Keyboard.F12,
            "42": Keyboard.PrintScreen,
            "145": Keyboard.ScrollLock,
            "19": Keyboard.PauseBreak,
            "192": Keyboard.Key_Points,
            "49": Keyboard.Key_1,
            "50": Keyboard.Key_2,
            "51": Keyboard.Key_3,
            "52": Keyboard.Key_4,
            "53": Keyboard.Key_5,
            "54": Keyboard.Key_6,
            "55": Keyboard.Key_7,
            "56": Keyboard.Key_8,
            "57": Keyboard.Key_9,
            "48": Keyboard.Key_0,
            "189": Keyboard.Key_Sub,
            "187": Keyboard.Key_Plus,
            "8": Keyboard.Backspace,
            "45": Keyboard.Insert,
            "36": Keyboard.Home,
            "33": Keyboard.PageUp,
            "144": Keyboard.Num_Lock,
            "111": Keyboard.Num_Slash,
            "106": Keyboard.Num_Mul,
            "109": Keyboard.Num_Sub,
            "9": Keyboard.Tab,
            "81": Keyboard.Q,
            "87": Keyboard.W,
            "69": Keyboard.E,
            "82": Keyboard.R,
            "84": Keyboard.T,
            "89": Keyboard.Y,
            "85": Keyboard.U,
            "73": Keyboard.I,
            "79": Keyboard.O,
            "80": Keyboard.P,
            "219": Keyboard.LBraces,
            "221": Keyboard.RBraces,
            "13": Keyboard.Enter,
            "46": Keyboard.Delete,
            "35": Keyboard.End,
            "34": Keyboard.PageDown,
            "103": Keyboard.Num_7,
            "104": Keyboard.Num_8,
            "105": Keyboard.Num_9,
            "107": Keyboard.Num_Plus,
            "20": Keyboard.CapsLock,
            "65": Keyboard.A,
            "83": Keyboard.S,
            "68": Keyboard.D,
            "70": Keyboard.F,
            "71": Keyboard.G,
            "72": Keyboard.H,
            "74": Keyboard.J,
            "75": Keyboard.K,
            "76": Keyboard.L,
            "186": Keyboard.Semicolon,
            "222": Keyboard.Quotes,
            "220": Keyboard.Bar,
            "100": Keyboard.Num_4,
            "101": Keyboard.Num_5,
            "102": Keyboard.Num_6,
            "16": Keyboard.LShift,
            "90": Keyboard.Z,
            "88": Keyboard.X,
            "67": Keyboard.C,
            "86": Keyboard.V,
            "66": Keyboard.B,
            "78": Keyboard.N,
            "77": Keyboard.M,
            "188": Keyboard.Key_Semicolon,
            "190": Keyboard.Key_Dot,
            "191": Keyboard.Question,
            "38": Keyboard.UpArrow,
            "97": Keyboard.Num_1,
            "98": Keyboard.Num_2,
            "99": Keyboard.Num_3,
            "17": Keyboard.LCtrl,
            "91": Keyboard.LWin,
            "18": Keyboard.LAlt,
            "32": Keyboard.Space,
            "92": Keyboard.RWin,
            "93": Keyboard.NoteSign,
            "37": Keyboard.LeftArrow,
            "40": Keyboard.DownArrow,
            "39": Keyboard.RightArrow,
            "96": Keyboard.Num_0,
            "110": Keyboard.Num_Dot
        };
        _this.init();
        return _this;
    }
    Keyboard.prototype.init = function () {
        var self = this;
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            self.addKey(e);
            self.dispatchEventWith(Keyboard.onKeyDown, true, self.inputs, true);
        };
        document.onkeyup = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            var keycode = e.keyCode;
            var keyvalue = self.keyValue;
            if (keycode in keyvalue) {
                var vv = keyvalue[keycode];
                self.dispatchEventWith(Keyboard.onKeyUp, true, [vv], true);
                self.removeKey(vv);
            }
        };
    };
    Keyboard.prototype.addKey = function (e) {
        var keycode = e.keyCode;
        var keyvalue = this.keyValue;
        if (keycode in keyvalue) {
            var key = keyvalue[keycode];
            var inputs = this.inputs;
            var index = inputs.indexOf(key);
            if (index < 0) {
                inputs.push(key);
            }
        }
    };
    Keyboard.prototype.removeKey = function (key) {
        var inputs = this.inputs;
        for (var i = 0, length = inputs.length; i < length; ++i) {
            if (inputs[i] === key) {
                inputs.splice(i, 1);
                break;
            }
        }
    };
    Keyboard.onKeyDown = "onKeyDown";
    Keyboard.onKeyUp = "onKeyUp";
    Keyboard.Num_Lock = "NumLock";
    Keyboard.Num_Slash = "Num_/";
    Keyboard.Num_Mul = "Num_*";
    Keyboard.Num_Sub = "Num_-";
    Keyboard.Num_Plus = "Num_+";
    Keyboard.Num_1 = "Num_1";
    Keyboard.Num_2 = "Num_2";
    Keyboard.Num_3 = "Num_3";
    Keyboard.Num_4 = "Num_4";
    Keyboard.Num_5 = "Num_5";
    Keyboard.Num_6 = "Num_6";
    Keyboard.Num_7 = "Num_7";
    Keyboard.Num_8 = "Num_8";
    Keyboard.Num_9 = "Num_9";
    Keyboard.Num_0 = "Num_0";
    Keyboard.Num_Enter = "Num_Enter";
    Keyboard.Num_Dot = "Num_.";
    //第一行
    Keyboard.Esc = "Esc";
    Keyboard.F1 = "F1";
    Keyboard.F2 = "F2";
    Keyboard.F3 = "F3";
    Keyboard.F4 = "F4";
    Keyboard.F5 = "F5";
    Keyboard.F6 = "F6";
    Keyboard.F7 = "F7";
    Keyboard.F8 = "F8";
    Keyboard.F9 = "F9";
    Keyboard.F10 = "F10";
    Keyboard.F11 = "F11";
    Keyboard.F12 = "F12";
    Keyboard.PrintScreen = "PrintScreen";
    Keyboard.ScrollLock = "ScrollLock";
    Keyboard.PauseBreak = "PauseBreak";
    //第二行
    Keyboard.Key_Points = "`";
    Keyboard.Key_1 = "1";
    Keyboard.Key_2 = "2";
    Keyboard.Key_3 = "3";
    Keyboard.Key_4 = "4";
    Keyboard.Key_5 = "5";
    Keyboard.Key_6 = "6";
    Keyboard.Key_7 = "7";
    Keyboard.Key_8 = "8";
    Keyboard.Key_9 = "9";
    Keyboard.Key_0 = "0";
    Keyboard.Key_Sub = "-";
    Keyboard.Key_Plus = "=";
    Keyboard.Backspace = "Backspace";
    Keyboard.Insert = "Insert";
    Keyboard.Home = "Home";
    Keyboard.PageUp = "PageUp";
    //第三行
    Keyboard.Tab = "Tab";
    Keyboard.Q = "Q";
    Keyboard.W = "W";
    Keyboard.E = "E";
    Keyboard.R = "R";
    Keyboard.T = "T";
    Keyboard.Y = "Y";
    Keyboard.U = "U";
    Keyboard.I = "I";
    Keyboard.O = "O";
    Keyboard.P = "P";
    Keyboard.LBraces = "[";
    Keyboard.RBraces = "]";
    Keyboard.Enter = "Enter";
    Keyboard.Delete = "Delete";
    Keyboard.End = "End";
    Keyboard.PageDown = "PageDown";
    //第四行
    Keyboard.CapsLock = "CapsLock";
    Keyboard.A = "A";
    Keyboard.S = "S";
    Keyboard.D = "D";
    Keyboard.F = "F";
    Keyboard.G = "G";
    Keyboard.H = "H";
    Keyboard.J = "J";
    Keyboard.K = "K";
    Keyboard.L = "L";
    Keyboard.Semicolon = ";";
    Keyboard.Quotes = ",";
    Keyboard.Bar = "|";
    //第五行
    Keyboard.LShift = "LShift";
    Keyboard.RShift = "RShift";
    Keyboard.Z = "Z";
    Keyboard.X = "X";
    Keyboard.C = "C";
    Keyboard.V = "V";
    Keyboard.B = "B";
    Keyboard.N = "N";
    Keyboard.M = "M";
    Keyboard.Key_Semicolon = ",";
    Keyboard.Key_Dot = ".";
    Keyboard.Question = "/";
    Keyboard.UpArrow = "UpArrow";
    //第六行
    Keyboard.LCtrl = "LCtrl";
    Keyboard.RCtrl = "RCtrl";
    Keyboard.LAlt = "LAlt";
    Keyboard.RAlt = "RAlt";
    Keyboard.LWin = "LWin";
    Keyboard.RWin = "RWin";
    Keyboard.Space = "Space";
    Keyboard.NoteSign = "NoteSign";
    Keyboard.LeftArrow = "LeftArrow";
    Keyboard.DownArrow = "DownArrow";
    Keyboard.RightArrow = "RightArrow";
    return Keyboard;
}(egret.EventDispatcher));
__reflect(Keyboard.prototype, "Keyboard");
