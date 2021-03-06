(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
	(factory((global.angular2Mdl = global.angular2Mdl || {}, global.angular2Mdl.select = global.angular2Mdl.select || {}),global.ng.core,global.ng.forms,global.ng.common));
}(this, (function (exports,_angular_core,_angular_forms,_angular_common) { 'use strict';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MdlOptionComponent = (function () {
    function MdlOptionComponent(changeDetectionRef) {
        this.changeDetectionRef = changeDetectionRef;
        this.multiple = false;
        this.selected = false;
        this.onSelect = Function.prototype;
    }
    MdlOptionComponent.prototype.setMultiple = function (multiple) {
        this.multiple = multiple;
        this.changeDetectionRef.detectChanges();
    };
    MdlOptionComponent.prototype.updateSelected = function (value) {
        var _this = this;
        if (this.multiple) {
            this.selected = (value.map(function (v) { return _this.stringifyValue(v); }).indexOf(this.stringValue) != -1);
        }
        else {
            this.selected = this.value == value;
        }
        this.changeDetectionRef.detectChanges();
    };
    MdlOptionComponent.prototype.ngAfterViewInit = function () {
        this.text = this.contentWrapper.nativeElement.textContent.trim();
    };
    Object.defineProperty(MdlOptionComponent.prototype, "stringValue", {
        get: function () {
            return this.stringifyValue(this.value);
        },
        enumerable: true,
        configurable: true
    });
    MdlOptionComponent.prototype.stringifyValue = function (value) {
        switch (typeof value) {
            case 'number': return String(value);
            case 'object': return JSON.stringify(value);
            default: return (!!value) ? String(value) : '';
        }
    };
    __decorate([
        _angular_core.Input('value'), 
        __metadata('design:type', Object)
    ], MdlOptionComponent.prototype, "value", void 0);
    __decorate([
        _angular_core.ViewChild('contentWrapper'), 
        __metadata('design:type', _angular_core.ElementRef)
    ], MdlOptionComponent.prototype, "contentWrapper", void 0);
    MdlOptionComponent = __decorate([
        _angular_core.Component({selector: 'mdl-option',
            host: {
                '[class.mdl-option__container]': 'true'
            },
            template: "<div class=\"mdl-list__item\" (click)=\"onSelect($event, value)\" [class.is-active]=\"selected\"> <div *ngIf=\"multiple\" class=\"mdl-list__item-secondary-action\"> <div class=\"mdl-checkbox is-upgraded\" [class.is-checked]=\"selected\" (click)=\"onSelect($event, value)\"> <input type=\"checkbox\" class=\"mdl-checkbox__input\"> <span class=\"mdl-checkbox__label\"></span> <span class=\"mdl-checkbox__focus-helper\"></span> <span class=\"mdl-checkbox__box-outline\"> <span class=\"mdl-checkbox__tick-outline\"></span> </span> </div> </div> <div #contentWrapper class=\"mdl-list__item-primary-content\"> <ng-content></ng-content> </div> </div> "
        }), 
        __metadata('design:paramtypes', [_angular_core.ChangeDetectorRef])
    ], MdlOptionComponent);
    return MdlOptionComponent;
}());

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MdlPopoverComponent = (function () {
    function MdlPopoverComponent(changeDetectionRef, elementRef) {
        this.changeDetectionRef = changeDetectionRef;
        this.elementRef = elementRef;
        this.hideOnClick = false;
        this.isVisible = false;
        this.directionUp = false;
    }
    MdlPopoverComponent.prototype.ngAfterViewInit = function () {
        // Add a hide listener to native element
        this.elementRef.nativeElement.addEventListener('hide', this.hide.bind(this));
    };
    MdlPopoverComponent.prototype.onDocumentClick = function (event) {
        if (this.isVisible &&
            (this.hideOnClick || !this.elementRef.nativeElement.contains(event.target))) {
            this.hide();
        }
    };
    MdlPopoverComponent.prototype.ngOnDestroy = function () {
        this.elementRef.nativeElement.removeEventListener('hide');
    };
    MdlPopoverComponent.prototype.toggle = function (event) {
        if (this.isVisible) {
            this.hide();
        }
        else {
            this.hideAllPopovers();
            this.show(event);
        }
    };
    MdlPopoverComponent.prototype.hide = function () {
        this.isVisible = false;
        this.changeDetectionRef.markForCheck();
    };
    MdlPopoverComponent.prototype.hideAllPopovers = function () {
        var nodeList = document.querySelectorAll('.mdl-popover.is-visible');
        for (var i = 0; i < nodeList.length; ++i) {
            nodeList[i].dispatchEvent(new Event('hide'));
        }
    };
    MdlPopoverComponent.prototype.show = function (event) {
        event.stopPropagation();
        this.isVisible = true;
        this.updateDirection(event);
    };
    MdlPopoverComponent.prototype.updateDirection = function (event) {
        var _this = this;
        var nativeEl = this.elementRef.nativeElement;
        var targetRect = event.target.getBoundingClientRect();
        var viewHeight = window.innerHeight;
        setTimeout(function () {
            var height = nativeEl.offsetHeight;
            if (height) {
                var spaceAvailable = {
                    top: targetRect.top,
                    bottom: viewHeight - targetRect.bottom
                };
                _this.directionUp = spaceAvailable.bottom < height;
                _this.changeDetectionRef.markForCheck();
            }
        });
    };
    __decorate$2([
        _angular_core.Input('hide-on-click'), 
        __metadata$2('design:type', Boolean)
    ], MdlPopoverComponent.prototype, "hideOnClick", void 0);
    __decorate$2([
        _angular_core.HostBinding('class.is-visible'), 
        __metadata$2('design:type', Object)
    ], MdlPopoverComponent.prototype, "isVisible", void 0);
    __decorate$2([
        _angular_core.HostBinding('class.direction-up'), 
        __metadata$2('design:type', Object)
    ], MdlPopoverComponent.prototype, "directionUp", void 0);
    __decorate$2([
        _angular_core.HostListener('document:click', ['$event']), 
        __metadata$2('design:type', Function), 
        __metadata$2('design:paramtypes', [Event]), 
        __metadata$2('design:returntype', void 0)
    ], MdlPopoverComponent.prototype, "onDocumentClick", null);
    MdlPopoverComponent = __decorate$2([
        _angular_core.Component({selector: 'mdl-popover',
            host: {
                '[class.mdl-popover]': 'true'
            },
            template: "<ng-content></ng-content> ",
            encapsulation: _angular_core.ViewEncapsulation.None,
        }), 
        __metadata$2('design:paramtypes', [_angular_core.ChangeDetectorRef, _angular_core.ElementRef])
    ], MdlPopoverComponent);
    return MdlPopoverComponent;
}());
var MdlPopoverModule = (function () {
    function MdlPopoverModule() {
    }
    MdlPopoverModule.forRoot = function () {
        return {
            ngModule: MdlPopoverModule,
            providers: []
        };
    };
    MdlPopoverModule = __decorate$2([
        _angular_core.NgModule({
            imports: [],
            exports: [MdlPopoverComponent],
            declarations: [MdlPopoverComponent],
        }), 
        __metadata$2('design:paramtypes', [])
    ], MdlPopoverModule);
    return MdlPopoverModule;
}());

var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var uniq = function (array) { return Array.from(new Set(array)); };
function randomId() {
    var S4 = function () { return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1); };
    return (S4() + S4());
}
var MDL_SELECT_VALUE_ACCESSOR = {
    provide: _angular_forms.NG_VALUE_ACCESSOR,
    useExisting: _angular_core.forwardRef(function () { return MdlSelectComponent; }),
    multi: true
};
var SearchableComponent = (function () {
    function SearchableComponent(searchTimeout) {
        if (searchTimeout === void 0) { searchTimeout = 300; }
        this.clearTimeout = null;
        this.query = '';
        this.searchTimeout = searchTimeout;
    }
    SearchableComponent.prototype.updateSearchQuery = function (event) {
        var _this = this;
        if (this.clearTimeout) {
            clearTimeout(this.clearTimeout);
        }
        this.clearTimeout = setTimeout(function () {
            _this.query = '';
        }, this.searchTimeout);
        this.query += String.fromCharCode(event.keyCode).toLowerCase();
    };
    SearchableComponent.prototype.getSearchQuery = function () {
        return this.query;
    };
    return SearchableComponent;
}());
var MdlSelectComponent = (function (_super) {
    __extends(MdlSelectComponent, _super);
    function MdlSelectComponent(changeDetectionRef) {
        _super.call(this);
        this.changeDetectionRef = changeDetectionRef;
        this.disabled = false;
        this.placeholder = '';
        this.multiple = false;
        this.change = new _angular_core.EventEmitter(true);
        this.text = '';
        this.textByValue = {};
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.focused = false;
        this.textfieldId = "mdl-textfield-" + randomId();
    }
    MdlSelectComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.bindOptions();
        this.renderValue(this.ngModel);
        this.optionComponents.changes.subscribe(function () { return _this.bindOptions(); });
    };
    MdlSelectComponent.prototype.onKeydown = function ($event) {
        if (!this.disabled && this.popoverComponent.isVisible) {
            var closeKeys = ["Escape", "Tab", "Enter"];
            var closeKeyCodes = [13, 27, 9];
            if (closeKeyCodes.indexOf($event.keyCode) != -1 || ($event.key && closeKeys.indexOf($event.key) != -1)) {
                this.popoverComponent.hide();
            }
            else if (!this.multiple) {
                if ($event.keyCode == 38 || ($event.key && $event.key == "ArrowUp")) {
                    this.onArrowUp($event);
                }
                else if ($event.keyCode == 40 || ($event.key && $event.key == "ArrowDown")) {
                    this.onArrowDown($event);
                }
                else if ($event.keyCode >= 31 && $event.keyCode <= 90) {
                    this.onCharacterKeydown($event);
                }
            }
        }
    };
    MdlSelectComponent.prototype.onCharacterKeydown = function ($event) {
        var _this = this;
        this.updateSearchQuery($event);
        var optionsList = this.optionComponents.toArray();
        var filteredOptions = optionsList.filter(function (option) {
            return option.text.toLowerCase().startsWith(_this.getSearchQuery());
        });
        var selectedOption = optionsList.find(function (option) { return option.selected; });
        if (filteredOptions.length > 0) {
            var selectedOptionInFiltered = filteredOptions.indexOf(selectedOption) != -1;
            if (!selectedOptionInFiltered && !filteredOptions[0].selected) {
                this.onSelect($event, filteredOptions[0].value);
            }
        }
        $event.preventDefault();
    };
    MdlSelectComponent.prototype.onArrowUp = function ($event) {
        var arr = this.optionComponents.toArray();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].selected) {
                if (i - 1 >= 0) {
                    this.onSelect($event, arr[i - 1].value);
                }
                break;
            }
        }
        $event.preventDefault();
    };
    MdlSelectComponent.prototype.onArrowDown = function ($event) {
        var arr = this.optionComponents.toArray();
        var selectedOption = arr.find(function (option) { return option.selected; });
        if (selectedOption) {
            var selectedOptionIndex = arr.indexOf(selectedOption);
            if (selectedOptionIndex + 1 < arr.length) {
                this.onSelect($event, arr[selectedOptionIndex + 1].value);
            }
        }
        else {
            this.onSelect($event, arr[0].value);
        }
        $event.preventDefault();
    };
    MdlSelectComponent.prototype.addFocus = function () {
        this.focused = true;
    };
    MdlSelectComponent.prototype.removeFocus = function () {
        this.focused = false;
    };
    MdlSelectComponent.prototype.isEmpty = function () {
        return this.multiple ? !this.ngModel.length : !this.ngModel;
    };
    // rebind options and reset value in connected select
    MdlSelectComponent.prototype.reset = function (resetValue) {
        if (resetValue === void 0) { resetValue = true; }
        if (resetValue && !this.isEmpty()) {
            this.ngModel = this.multiple ? [] : '';
            this.onChange(this.ngModel);
            this.change.emit(this.ngModel);
            this.renderValue(this.ngModel);
        }
    };
    MdlSelectComponent.prototype.bindOptions = function () {
        var _this = this;
        this.optionComponents.forEach(function (selectOptionComponent) {
            selectOptionComponent.setMultiple(_this.multiple);
            selectOptionComponent.onSelect = _this.onSelect.bind(_this);
            if (selectOptionComponent.value != null) {
                _this.textByValue[_this.stringifyValue(selectOptionComponent.value)] = selectOptionComponent.text;
            }
        });
    };
    MdlSelectComponent.prototype.renderValue = function (value) {
        var _this = this;
        if (this.multiple) {
            this.text = value.map(function (value) { return _this.textByValue[_this.stringifyValue(value)]; }).join(', ');
        }
        else {
            this.text = this.textByValue[this.stringifyValue(value)] || '';
        }
        this.changeDetectionRef.detectChanges();
        if (this.optionComponents) {
            this.optionComponents.forEach(function (selectOptionComponent) {
                selectOptionComponent.updateSelected(value);
            });
        }
    };
    MdlSelectComponent.prototype.stringifyValue = function (value) {
        switch (typeof value) {
            case 'number': return String(value);
            case 'object': return JSON.stringify(value);
            default: return (!!value) ? String(value) : '';
        }
    };
    MdlSelectComponent.prototype.toggle = function ($event) {
        if (!this.disabled) {
            this.popoverComponent.toggle($event);
            $event.stopPropagation();
        }
    };
    MdlSelectComponent.prototype.open = function ($event) {
        if (!this.disabled && !this.popoverComponent.isVisible) {
            this.popoverComponent.show($event);
        }
    };
    MdlSelectComponent.prototype.close = function ($event) {
        if (!this.disabled && this.popoverComponent.isVisible) {
            this.popoverComponent.hide();
        }
    };
    MdlSelectComponent.prototype.onSelect = function ($event, value) {
        if (this.multiple) {
            // prevent popup close on click inside popover when selecting multiple
            $event.stopPropagation();
        }
        else {
            var popover = this.popoverComponent.elementRef.nativeElement;
            var list = popover.querySelector(".mdl-list");
            var option_1 = null;
            this.optionComponents.forEach(function (o) {
                // not great for long lists because break is not available
                if (o.value == value) {
                    option_1 = o.contentWrapper.nativeElement;
                }
            });
            if (option_1) {
                var selectedItemElem = option_1.parentElement;
                var computedScrollTop = selectedItemElem.offsetTop - (list.clientHeight / 2) + (selectedItemElem.clientHeight / 2);
                list.scrollTop = Math.max(computedScrollTop, 0);
            }
        }
        this.writeValue(value);
        this.change.emit(this.ngModel);
    };
    MdlSelectComponent.prototype.writeValue = function (value) {
        var _this = this;
        if (this.multiple) {
            this.ngModel = this.ngModel || [];
            if (!value || this.ngModel === value) {
            }
            else if (Array.isArray(value)) {
                this.ngModel = uniq(this.ngModel.concat(value));
            }
            else if (this.ngModel.map(function (v) { return _this.stringifyValue(v); }).indexOf(this.stringifyValue(value)) != -1) {
                this.ngModel = this.ngModel.filter(function (v) { return _this.stringifyValue(v) !== _this.stringifyValue(value); }).slice();
            }
            else if (!!value) {
                this.ngModel = this.ngModel.concat([value]);
            }
        }
        else {
            this.ngModel = value;
        }
        this.onChange(this.ngModel);
        this.renderValue(this.ngModel);
    };
    MdlSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    MdlSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    MdlSelectComponent.prototype.getLabelVisibility = function () {
        return this.isFloatingLabel == null || (this.isFloatingLabel != null && this.text != null && this.text.length > 0) ? "block" : "none";
    };
    __decorate$1([
        _angular_core.Input(), 
        __metadata$1('design:type', Object)
    ], MdlSelectComponent.prototype, "ngModel", void 0);
    __decorate$1([
        _angular_core.Input(), 
        __metadata$1('design:type', Boolean)
    ], MdlSelectComponent.prototype, "disabled", void 0);
    __decorate$1([
        _angular_core.Input('floating-label'), 
        __metadata$1('design:type', Object)
    ], MdlSelectComponent.prototype, "isFloatingLabel", void 0);
    __decorate$1([
        _angular_core.Input(), 
        __metadata$1('design:type', String)
    ], MdlSelectComponent.prototype, "placeholder", void 0);
    __decorate$1([
        _angular_core.Input(), 
        __metadata$1('design:type', Boolean)
    ], MdlSelectComponent.prototype, "multiple", void 0);
    __decorate$1([
        _angular_core.Output(), 
        __metadata$1('design:type', _angular_core.EventEmitter)
    ], MdlSelectComponent.prototype, "change", void 0);
    __decorate$1([
        _angular_core.ViewChild(MdlPopoverComponent), 
        __metadata$1('design:type', MdlPopoverComponent)
    ], MdlSelectComponent.prototype, "popoverComponent", void 0);
    __decorate$1([
        _angular_core.ContentChildren(MdlOptionComponent), 
        __metadata$1('design:type', _angular_core.QueryList)
    ], MdlSelectComponent.prototype, "optionComponents", void 0);
    __decorate$1([
        _angular_core.HostListener('document:keydown', ['$event']), 
        __metadata$1('design:type', Function), 
        __metadata$1('design:paramtypes', [KeyboardEvent]), 
        __metadata$1('design:returntype', void 0)
    ], MdlSelectComponent.prototype, "onKeydown", null);
    MdlSelectComponent = __decorate$1([
        _angular_core.Component({selector: 'mdl-select',
            host: {
                '[class.mdl-select]': 'true',
                '[class.mdl-select--floating-label]': 'isFloatingLabel != null'
            },
            template: "<div class=\"mdl-textfield is-upgraded has-placeholder\" [class.is-focused]=\"this.popoverComponent.isVisible || this.focused\" [class.is-disabled]=\"this.disabled\" [class.is-dirty]=\"text != null && text.length > 0\"> <span [attr.tabindex]=\"!this.disabled ? 0 : null\" (focus)=\"open($event);addFocus();\" (blur)=\"removeFocus()\"> <!-- don't want click to also trigger focus --> </span> <input readonly tabindex=\"-1\" [placeholder]=\"placeholder\" class=\"mdl-textfield__input\" (click)=\"toggle($event)\" [attr.id]=\"textfieldId\" [value]=\"text\"> <span class=\"mdl-select__toggle material-icons\" (click)=\"toggle($event)\"> keyboard_arrow_down </span> <label class=\"mdl-textfield__label\" [attr.for]=\"textfieldId\">{{ placeholder }}</label> <span class=\"mdl-textfield__error\"></span> <mdl-popover hide-on-click=\"!multiple\" [style.width.%]=\"100\"> <div class=\"mdl-list mdl-shadow--6dp\"> <ng-content></ng-content> </div> </mdl-popover> </div> ",
            encapsulation: _angular_core.ViewEncapsulation.None,
            providers: [MDL_SELECT_VALUE_ACCESSOR]
        }), 
        __metadata$1('design:paramtypes', [_angular_core.ChangeDetectorRef])
    ], MdlSelectComponent);
    return MdlSelectComponent;
}(SearchableComponent));
var MdlSelectModule = (function () {
    function MdlSelectModule() {
    }
    MdlSelectModule.forRoot = function () {
        return {
            ngModule: MdlSelectModule,
            providers: []
        };
    };
    MdlSelectModule = __decorate$1([
        _angular_core.NgModule({
            imports: [
                _angular_common.CommonModule,
                MdlPopoverModule
            ],
            exports: [
                MdlSelectComponent,
                MdlOptionComponent
            ],
            declarations: [
                MdlSelectComponent,
                MdlOptionComponent
            ],
            providers: [
                MDL_SELECT_VALUE_ACCESSOR
            ]
        }), 
        __metadata$1('design:paramtypes', [])
    ], MdlSelectModule);
    return MdlSelectModule;
}());

exports.MdlOptionComponent = MdlOptionComponent;
exports.SearchableComponent = SearchableComponent;
exports.MdlSelectComponent = MdlSelectComponent;
exports.MdlSelectModule = MdlSelectModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
