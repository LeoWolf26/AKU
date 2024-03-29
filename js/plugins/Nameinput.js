﻿//-----------------------------------------------------------------------------
// Window_NameFace
//
// The window for editing an actor's name on the name input screen.
function Window_NameFace() {
    this.initialize.apply(this, arguments);
}

Window_NameFace.prototype = Object.create(Window_Base.prototype);
Window_NameFace.prototype.constructor = Window_NameFace;

Window_NameFace.prototype.initialize = function(actor, maxLength) {
    var width = 192;
    var height = 192;
    var x = (Graphics.boxWidth - width) / 2 -208;
    var y = (Graphics.boxHeight - (height + this.fittingHeight(9) + 8)) / 2;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = actor;
    this._name = actor.name().slice(0, this._maxLength);
    this._index = this._name.length;
    this._maxLength = maxLength;
    this._defaultName = this._name;
    this.deactivate();
    this.refresh();
    ImageManager.reserveFace(actor.faceName());
};

Window_NameFace.prototype.windowWidth = function() {
    return 480;
};

Window_NameFace.prototype.windowHeight = function() {
    return this.fittingHeight(4);
};

Window_NameFace.prototype.name = function() {
    return this._name;
};

Window_NameFace.prototype.restoreDefault = function() {
    this._name = this._defaultName;
    this._index = this._name.length;
    this.refresh();
    return this._name.length > 0;
};

Window_NameFace.prototype.add = function(ch) {
    if (this._index < this._maxLength) {
        this._name += ch;
        this._index++;
        this.refresh();
        return true;
    } else {
        return false;
    }
};

Window_NameFace.prototype.back = function() {
    if (this._index > 0) {
        this._index--;
        this._name = this._name.slice(0, this._index);
        this.refresh();
        return true;
    } else {
        return false;
    }
};

Window_NameFace.prototype.faceWidth = function() {
    return 144;
};

Window_NameFace.prototype.charWidth = function() {
    var text = $gameSystem.isJapanese() ? '\uff21' : 'A';
    return this.textWidth(text);
};

Window_NameFace.prototype.left = function() {
    var nameCenter = (this.contentsWidth() + this.faceWidth()) / 2;
    var nameWidth = (this._maxLength + 1) * this.charWidth();
    return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
};

Window_NameFace.prototype.itemRect = function(index) {
    return {
        x: this.left() + index * this.charWidth(),
        y: 54,
        width: this.charWidth(),
        height: this.lineHeight()
    };
};

Window_NameFace.prototype.underlineRect = function(index) {
    var rect = this.itemRect(index);
    rect.x++;
    rect.y += rect.height - 4;
    rect.width -= 2;
    rect.height = 2;
    return rect;
};

Window_NameFace.prototype.underlineColor = function() {
    return this.normalColor();
};

Window_NameFace.prototype.drawUnderline = function(index) {
    var rect = this.underlineRect(index);
    var color = this.underlineColor();
    this.contents.paintOpacity = 48;
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.contents.paintOpacity = 255;
};

Window_NameFace.prototype.drawChar = function(index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.drawText(this._name[index] || '', rect.x, rect.y);
};

Window_NameFace.prototype.refresh = function() {
    this.contents.clear();
    
     this.drawActorFace(this._actor, 6, 6);
};



//-----------------------------------------------------------------------------
// Window_NameEdit
//
// The window for editing an actor's name on the name input screen.

function Window_NameEdit() {
    this.initialize.apply(this, arguments);
}

Window_NameEdit.prototype = Object.create(Window_Base.prototype);
Window_NameEdit.prototype.constructor = Window_NameEdit;

Window_NameEdit.prototype.initialize = function(actor, maxLength) {
    var width = this.windowWidth();
    var height = this.windowHeight();
    var x = (Graphics.boxWidth - width) / 2 +110;
    var y = (Graphics.boxHeight - (height + this.fittingHeight(9) + 8)) / 2 +60;
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._actor = actor;
    this._name = actor.name().slice(0, this._maxLength);
    this._index = this._name.length;
    this._maxLength = maxLength;
    this._defaultName = this._name;
    this.deactivate();
    this.refresh();
    ImageManager.reserveFace(actor.faceName());
};

Window_NameEdit.prototype.windowWidth = function() {
    return 430;
};

Window_NameEdit.prototype.windowHeight = function() {
    return this.fittingHeight(1);
};

Window_NameEdit.prototype.name = function() {
    return this._name;
};

Window_NameEdit.prototype.restoreDefault = function() {
    this._name = this._defaultName;
    this._index = this._name.length;
    this.refresh();
    return this._name.length > 0;
};

Window_NameEdit.prototype.add = function(ch) {
    if (this._index < this._maxLength) {
        this._name += ch;
        this._index++;
        this.refresh();
        return true;
    } else {
        return false;
    }
};

Window_NameEdit.prototype.back = function() {
    if (this._index > 0) {
        this._index--;
        this._name = this._name.slice(0, this._index);
        this.refresh();
        return true;
    } else {
        return false;
    }
};

Window_NameEdit.prototype.faceWidth = function() {
    return 144;
};

Window_NameEdit.prototype.charWidth = function() {
    var text = $gameSystem.isJapanese() ? '\uff21' : '自';
    return this.textWidth(text);
};

Window_NameEdit.prototype.left = function() {
    var nameCenter = this.contentsWidth() / 2;
    var nameWidth = (this._maxLength + 1) * this.charWidth();
    return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
};

Window_NameEdit.prototype.itemRect = function(index) {
    return {
        x: this.left() + index * this.charWidth(),
        y: 0,
        width: this.charWidth(),
        height: this.lineHeight()
    };
};

Window_NameEdit.prototype.underlineRect = function(index) {
    var rect = this.itemRect(index);
    rect.x++;
    rect.y += rect.height - 4;
    rect.width -= 2;
    rect.height = 2;
    return rect;
};

Window_NameEdit.prototype.underlineColor = function() {
    return this.normalColor();
};

Window_NameEdit.prototype.drawUnderline = function(index) {
    var rect = this.underlineRect(index);
    var color = this.underlineColor();
    this.contents.paintOpacity = 48;
    this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
    this.contents.paintOpacity = 255;
};

Window_NameEdit.prototype.drawChar = function(index) {
    var rect = this.itemRect(index);
    this.resetTextColor();
    this.drawText(this._name[index] || '', rect.x, rect.y);
};

Window_NameEdit.prototype.refresh = function() {
    this.contents.clear();
   // this.drawActorFace(this._actor, 0, 0);
    for (var i = 0; i < this._maxLength; i++) {
        this.drawUnderline(i);
    }
    for (var j = 0; j < this._name.length; j++) {
        this.drawChar(j);
    }
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};

//-----------------------------------------------------------------------------
// Window_NameInput
//
// The window for selecting text characters on the name input screen.

function Window_NameInput() {
    this.initialize.apply(this, arguments);
}

Window_NameInput.prototype = Object.create(Window_Selectable.prototype);
Window_NameInput.prototype.constructor = Window_NameInput;
Window_NameInput.LATIN1 = 
	//繁體中文
       [ '大','中','小','名','字',  '咲','音','偉','帥','平',
             '親','卍','焰','國','其',  '美','月','日','星','洛',
             '凌','堤','嚨','翔','源',  '江','北','流','吳','明',
             '爾','騷','修','死','文',  '魂','破','喉','精','雨',
             '碎','鬼','翠','燿','玄',  '旦','澈','喔','刺','憲',
             '痾','悔','偽','喵','櫻',  '是','織','法','咳','咦',
             '天','女','斷','利','開',  '朵','結','雲','霧','那',
             '個','哥','沃','靠','瑟',  '牙','恩','哈','禿','夕',
             '過','鎖','戀','鍊','妖',  '雷','我','你','其他','確定'];
Window_NameInput.LATIN2 =
	//英文數字
        [ 'Ａ','Ｂ','Ｃ','Ｄ','Ｅ',  'ａ','ｂ','ｃ','ｄ','ｅ',
             'Ｆ','Ｇ','Ｈ','Ｉ','Ｊ',  'ｆ','ｇ','ｈ','ｉ','ｊ',
             'Ｋ','Ｌ','Ｍ','Ｎ','Ｏ',  'ｋ','ｌ','ｍ','ｎ','ｏ',
             'Ｐ','Ｑ','Ｒ','Ｓ','Ｔ',  'ｐ','ｑ','ｒ','ｓ','ｔ',
             'Ｕ','Ｖ','Ｗ','Ｘ','Ｙ',  'ｕ','ｖ','ｗ','ｘ','ｙ',
             'Ｚ','［','］','＾','＿',  'ｚ','｛','｝','｜','～',
             '０','１','２','３','４',  '！','.','＄','％','＆',
             '５','６','７','８','９',  '（','）','＊','＋','－',
             '／','＝','＠','＜','＞',  '：','；','※','其他','確定'];


Window_NameInput.JAPAN1 =
	//日文1
        [ '〇','一','二','三','四',  '五','六','七','八','九',
             '十','百','千','萬','億',  '兆','吉','太','拍','艾',
             '賢','者','游','俠','的',  '里','克','龍','馬','之',
             '娜','塔','莉','瑞','戰',  '泰','倫','斯','愛','絲',
             '阿','奈','思','特','士',  '祈','達','諾','亞','金',
             '伊','薩','貝','苦','師',  '丑','魔','法','導','銀',
             '赤','橙','黃','綠','青',  '藍','紫','黑','白','色',
             '騎','斧','劍','弓','槍',  '刀','銃','爪','錘','杖',
             '光','闇','炎','水','風',  '地','電','冰','其他','確定'];
Window_NameInput.JAPAN2 =
	//日文2
        [ 'ㄅ','ㄆ','ㄇ','ㄈ','ㄉ', 'ㄊ','ㄋ','ㄌ','ㄍ', 'ㄎ',
             'ㄏ','ㄐ','ㄑ','ㄒ', 'ㄓ', 'ㄔ','ㄕ','ㄖ','ㄗ','ㄘ',
             'ㄙ','ㄧ','ㄨ','ㄩ','ㄚ',  'ㄛ','ㄜ','ㄝ','ㄞ','ㄟ',
             'ㄠ','ㄡ','ㄢ','ㄣ','ㄤ',  'ㄥ','ㄦ','？','☆','安',
             '吼','歐','齁','藥','吃',  '粗','乃','玩','巫','暗',
             '領','人','主','男','又',  '貓','尼','瑪','隻','爵',
             '力','孔','子','老','夫',  '帝','醜','觀','他','了',
             '奧','格','夭','鳳','凰',  '孟','台','春','路','哭',
             '沒','顏','咪','啾','有',  '凱','蛇','佬','其他','確定'];


Window_NameInput.prototype.initialize = function(editWindow) {
    var x = editWindow.x -200;
    var y = editWindow.y + editWindow.height + 8;
    var width = editWindow.width+200;
    var height = this.windowHeight();
    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
    this._editWindow = editWindow;
    this._page = 0;
    this._index = 0;
    this.refresh();
    this.updateCursor();
    this.activate();
};

Window_NameInput.prototype.windowHeight = function() {
    return this.fittingHeight(9);
};

Window_NameInput.prototype.table = function() {
    
        return [Window_NameInput.LATIN1,
                Window_NameInput.LATIN2,
		Window_NameInput.JAPAN1,
                Window_NameInput.JAPAN2,];
    
};

Window_NameInput.prototype.maxCols = function() {
    return 10;
};

Window_NameInput.prototype.maxItems = function() {
    return 90;
};

Window_NameInput.prototype.character = function() {
    return this._index < 88 ? this.table()[this._page][this._index] : '';
};

Window_NameInput.prototype.isPageChange = function() {
    return this._index === 88;
};

Window_NameInput.prototype.isOk = function() {
    return this._index === 89;
};

Window_NameInput.prototype.itemRect = function(index) {
    return {
        x: index % 10 * 56 + Math.floor(index % 10 / 5) * 24,
        y: Math.floor(index / 10) * this.lineHeight(),
        width: 56,
        height: this.lineHeight()
    };
};

Window_NameInput.prototype.refresh = function() {
    var table = this.table();
    this.contents.clear();
    this.resetTextColor();
    for (var i = 0; i < 90; i++) {
        var rect = this.itemRect(i);
        rect.x += 3;
        rect.width -= 6;
        this.drawText(table[this._page][i], rect.x, rect.y, rect.width, 'center');
    }
};

Window_NameInput.prototype.updateCursor = function() {
    var rect = this.itemRect(this._index);
    this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
};

Window_NameInput.prototype.isCursorMovable = function() {
    return this.active;
};

Window_NameInput.prototype.cursorDown = function(wrap) {
    if (this._index < 80 || wrap) {
        this._index = (this._index + 10) % 90;
    }
};

Window_NameInput.prototype.cursorUp = function(wrap) {
    if (this._index >= 10 || wrap) {
        this._index = (this._index + 80) % 90;
    }
};

Window_NameInput.prototype.cursorRight = function(wrap) {
    if (this._index % 10 < 9) {
        this._index++;
    } else if (wrap) {
        this._index -= 9;
    }
};

Window_NameInput.prototype.cursorLeft = function(wrap) {
    if (this._index % 10 > 0) {
        this._index--;
    } else if (wrap) {
        this._index += 9;
    }
};

Window_NameInput.prototype.cursorPagedown = function() {
    this._page = (this._page + 1) % this.table().length;
    this.refresh();
};

Window_NameInput.prototype.cursorPageup = function() {
    this._page = (this._page + this.table().length - 1) % this.table().length;
    this.refresh();
};

Window_NameInput.prototype.processCursorMove = function() {
    var lastPage = this._page;
    Window_Selectable.prototype.processCursorMove.call(this);
    this.updateCursor();
    if (this._page !== lastPage) {
        SoundManager.playCursor();
    }
};

Window_NameInput.prototype.processHandling = function() {
    if (this.isOpen() && this.active) {
        if (Input.isTriggered('shift')) {
            this.processJump();
        }
        if (Input.isRepeated('cancel')) {
            this.processBack();
        }
        if (Input.isRepeated('ok')) {
            this.processOk();
        }
    }
};

Window_NameInput.prototype.isCancelEnabled = function() {
    return true;
};

Window_NameInput.prototype.processCancel = function() {
    this.processBack();
};

Window_NameInput.prototype.processJump = function() {
    if (this._index !== 89) {
        this._index = 89;
        SoundManager.playCursor();
    }
};

Window_NameInput.prototype.processBack = function() {
    if (this._editWindow.back()) {
        SoundManager.playCancel();
    }
};

Window_NameInput.prototype.processOk = function() {
    if (this.character()) {
        this.onNameAdd();
    } else if (this.isPageChange()) {
        SoundManager.playOk();
        this.cursorPagedown();
    } else if (this.isOk()) {
        this.onNameOk();
    }
};

Window_NameInput.prototype.onNameAdd = function() {
    if (this._editWindow.add(this.character())) {
        SoundManager.playOk();
    } else {
        SoundManager.playBuzzer();
    }
};

Window_NameInput.prototype.onNameOk = function() {
    if (this._editWindow.name() === '') {
        if (this._editWindow.restoreDefault()) {
            SoundManager.playOk();
        } else {
            SoundManager.playBuzzer();
        }
    } else {
        SoundManager.playOk();
        this.callOkHandler();
    }
};

//-----------------------------------------------------------------------------
// Scene_Name
//
// The scene class of the name input screen.

function Scene_Name() {
    this.initialize.apply(this, arguments);
}

Scene_Name.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Name.prototype.constructor = Scene_Name;

Scene_Name.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Name.prototype.prepare = function(actorId, maxLength) {
    this._actorId = actorId;
    this._maxLength = maxLength;
};

Scene_Name.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._actor = $gameActors.actor(this._actorId);
    this.createEditWindow();
    this.createInputWindow();
	this.createFaceWindow();
};

Scene_Name.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._editWindow.refresh();
	this._faceWindow.refresh();
};


Scene_Name.prototype.createFaceWindow = function() {
    this._faceWindow = new Window_NameFace(this._actor, this._maxLength);
    this.addWindow(this._faceWindow);
};


Scene_Name.prototype.createEditWindow = function() {
    this._editWindow = new Window_NameEdit(this._actor, this._maxLength);
    this.addWindow(this._editWindow);
};

Scene_Name.prototype.createInputWindow = function() {
    this._inputWindow = new Window_NameInput(this._editWindow);
    this._inputWindow.setHandler('ok', this.onInputOk.bind(this));
    this.addWindow(this._inputWindow);
};

Scene_Name.prototype.onInputOk = function() {
    this._actor.setName(this._editWindow.name());
    this.popScene();
};