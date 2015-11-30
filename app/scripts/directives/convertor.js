MyApp.directive('cyrillic', [
    '$window', '$browser', function($window, $browser) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, modelCtrl) {

                var enabled = true;
                if (attrs.cyrillicEnabled != undefined) {
                    enabled = attrs.cyrillicEnabled !== 'false';
                }

                if (enabled == false) {
                    return;
                }

                var i1 = 0;
                var azBk = new Array();
                azBk[i1++] = new Array("џ", "Џ", "120", "88");
                        azBk[i1++] = new Array("ќ", "Ќ", "39", "34");
                        azBk[i1++] = new Array("љ", "Љ", "113", "81");
                        azBk[i1++] = new Array("њ", "Њ", "119", "87");
                        azBk[i1++] = new Array("ѕ", "Ѕ", "121", "89");
                        azBk[i1++] = new Array("ж", "Ж", "92", "124");
                        azBk[i1++] = new Array("а", "А", "97", "65");
                        azBk[i1++] = new Array("б", "Б", "98", "66");
                        azBk[i1++] = new Array("в", "В", "118", "86");
                        azBk[i1++] = new Array("г", "Г", "103", "71");
                        azBk[i1++] = new Array("д", "Д", "100", "68");
                        azBk[i1++] = new Array("е", "Е", "101", "69");
                        azBk[i1++] = new Array("з", "З", "122", "90");
                        azBk[i1++] = new Array("и", "И", "105", "73");
                        azBk[i1++] = new Array("ј", "Ј", "106", "74");
                        azBk[i1++] = new Array("к", "К", "107", "75");
                        azBk[i1++] = new Array("л", "Л", "108", "76");
                        azBk[i1++] = new Array("м", "М", "109", "77");
                        azBk[i1++] = new Array("н", "Н", "110", "78");
                        azBk[i1++] = new Array("о", "О", "111", "79");
                        azBk[i1++] = new Array("п", "П", "112", "80");
                        azBk[i1++] = new Array("р", "Р", "114", "82");
                        azBk[i1++] = new Array("с", "С", "115", "83");
                        azBk[i1++] = new Array("т", "Т", "116", "84");
                        azBk[i1++] = new Array("у", "У", "117", "85");
                        azBk[i1++] = new Array("ф", "Ф", "102", "70");
                        azBk[i1++] = new Array("х", "Х", "104", "72");
                        azBk[i1++] = new Array("ц", "Ц", "99", "67");
                        azBk[i1++] = new Array("ч", "Ч", "59", "58");
                        azBk[i1++] = new Array("ш", "Ш", "91", "123");
                        azBk[i1++] = new Array("ѓ", "Ѓ", "93", "125");
                        azBk[i1++] = new Array("ш", "Ш", "353", "352");
                        azBk[i1++] = new Array("џ", "Џ", "273", "272");
                        azBk[i1++] = new Array("ч", "Ч", "269", "268");
                        azBk[i1++] = new Array("ќ", "Ќ", "263", "262");
                        azBk[i1++] = new Array("ж", "Ж", "382", "381");

                //Detect Browser
                var userAgent = $window.navigator.userAgent;
                var browser = '';

                var browsers = {
                    chrome: /chrome/i,
                    safari: /safari/i,
                    firefox: /firefox/i,
                    ie9: /MSIE 9.0/i,
                    ie10: /MSIE 10.0/i,
                    ie11: /rv:11.0/i,
                    ie: /MSIE/i
                };
                for (var key in browsers) {
                    if (browsers[key].test(userAgent)) {
                        browser = key;
                        break;
                    }
                };

                var getReplacement = function(keyCode) {

                    var i;
                    var upper = false;
                    var tmpChar = String.fromCharCode(keyCode);

                    for (i = 0; i < azBk.length; i++) {
                        if (keyCode == azBk[i][3]) {
                            upper = true;
                        } else if (tmpChar == azBk[i][1]) {
                            upper = true;
                        }
                    }

                    for (i = 0; i < azBk.length; i++) {
                        if (upper) {
                            if (keyCode == azBk[i][3]) {
                                return azBk[i][1];
                            } else if (tmpChar == azBk[i][1]) {
                                return azBk[i][1];
                            }
                        } else {
                            if (keyCode == azBk[i][2]) {
                                return azBk[i][0];
                            } else if (tmpChar == azBk[i][0]) {
                                return azBk[i][0];
                            }
                        }
                    }

                    return null;
                };

                element.bind('keypress', function(e) {

                    var repLetter;
                    var preventDefault = false;

                    switch (browser) {
                        case "ie":
                            repLetter = getReplacement(event.keyCode);
                            if (repLetter != null) {
                                window.event.keyCode = repLetter.charCodeAt();
                                preventDefault = true;
                            }
                            break;

                        case "chrome":
                        case "safari":
                            repLetter = getReplacement(e.which);
                            if (repLetter != null) {
                                var newEvent = document.createEvent('TextEvent');
                                newEvent.initTextEvent('textInput', true, true, null, repLetter);

                                this.dispatchEvent(newEvent);
                                preventDefault = true;
                            }
                            break;

                        case "ie9":
                        case "ie10":
                        case "ie11":
                        case "firefox":

                            try {
                                //Firefox
                                repLetter = getReplacement(e.which);
                                if (repLetter != null) {

                                    var charStr = String.fromCharCode(e.which);
                                    var transformedChar = getReplacement(e.which);
                                    if (transformedChar != charStr) {

                                        // Move the caret
                                        var start = this.selectionStart,
                                            end = this.selectionEnd,
                                            val = this.value;
                                        this.value = val.slice(0, start) + transformedChar + val.slice(end);
                                        this.selectionStart = this.selectionEnd = start + 1;

                                        modelCtrl.$setViewValue(this.value);
                                        scope.$apply();
                                        preventDefault = true;
                                    }
                                }
                            } catch (e) {
                                console.log(e);
                            }

                            break;
                    };

                    if (preventDefault) {
                        e.preventDefault();
                        return false;
                    }
                });


                element.bind('paste', function($event) {
                    $browser.defer(function() {

                        var initialValue = element.val();

                        var result = '';
                        for (var i = 0; i < initialValue.length; i++) {

                            var character = initialValue[i];
                            var code = initialValue.charCodeAt(i);

                            var found = false;
                            for (var j = 0; j < azBk.length; j++) {
                                if (azBk[j][2] == code) {
                                    result += azBk[j][0];
                                    found = true;
                                    continue;
                                } else if (azBk[j][3] == code) {
                                    result += azBk[j][1];
                                    found = true;
                                    continue;
                                }
                            }

                            if (!found) {
                                result += character;
                            }
                        }

                        $event.preventDefault();

                        modelCtrl.$setViewValue(result);
                        element.val(result);
                        scope.$apply();

                    });
                });
            }
        };
    }]);