
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ApiRequestService } from "../../api-request.service";
declare var require: any;

interface Text {
    text: string;
    id: number,
    safeHtml: SafeHtml,
    user: string,
    date: string,
    chains: string[];
}
interface Voice {
    name: string;
    id: number;
    ngrams: NGram[];
    selected: Boolean,
    color: string
}
interface NGram {
    name: string,
    identifier: number;
}

@Component({
    selector: 'dialogism-chat',
    styleUrls: ['./dialogism-chat.css'],
    templateUrl: './dialogism-chat.html',
    providers: [ApiRequestService],
    encapsulation: ViewEncapsulation.None,
  })
  export class DialogismChatComponent implements OnInit{

    constructor(private apiRequestService: ApiRequestService, 
        private sanitizer:DomSanitizer) {
    }

    private texts: Text[] = [];
    private htmlTexts: Text[] = [];
    private voices: Voice[] = [];
    private voicesLoaded: Boolean =  false;
    private colors = [];
    private paths = [];
    private drawedPaths = [];
    private showPath: Boolean = false;
    private groupedTextsByUser = [];
 
    ngOnInit() {

        this.getTexts();
        this.getVoices();

        console.log(this.groupedTextsByUser);
        console.log(this.htmlTexts);
        
    }

    clearData() {
        this.htmlTexts = this.copyData(this.texts);
        this.showPath = false;
    }

    reloadVoices(event: any){

        this.clearData();
        this.showVoices();
        //draw paths
        var _this = this;
        setTimeout(function (){
            _this.connectAll();
        }, 5000);
        //this.connectAll();
        
    }

    private showVoices() {
        
        this.paths = [];
        var selectedVoices = this.voices.filter(function(voice) {
            return voice.selected;
        });
        selectedVoices.forEach(selectedVoice => {
            var voiceColor = selectedVoice.color;//this.colors[selectedVoice.id-1];
            var points = [];
            //console.log("voice: " + JSON.stringify(selectedVoice));
            selectedVoice.ngrams.forEach(ngram => {

                //var ngramName = ngram.name.replace("'",  "i");
                var ngramId = selectedVoice.name+"-"+ngram.name+"-"+ngram.identifier;
                var selectedTexts = this.htmlTexts.filter(function(text) {
                    return text.id == ngram.identifier;
                });
                selectedTexts.forEach(selectedText => {
                    var indexOf = selectedText.text.indexOf(ngram.name + '</b>');
                    var indexOfNgram = selectedText.text.indexOf(ngram.name);
                    var nextChar = selectedText.text.substring(indexOfNgram + ngram.name.length, indexOfNgram + ngram.name.length + 1);
                    var isChar = (/[a-zA-Z]/).test(nextChar);
                    
                    //if (indexOf == -1 && !isChar) {
            
                    if (indexOf == -1) {
                        selectedText.text = selectedText.text.replace(ngram.name, ' <span id="' + ngramId + '" style="color: ' + voiceColor + ';"><b>'+ngram.name+'</b></span>');
                    }
                    selectedText.chains.push('<span id="' + ngramId + '" style="color: ' + voiceColor + ';"><b>'+ngram.name+'</b></span>');
                    
                });
                points.push(ngramId);

            });
            //this.paths.push({color: voiceColor, points: points});
            for (var i = 0; i < points.length-1; i++) {
                this.paths.push({color: voiceColor, id: 'voicePath-'+points[i]+points[i+1], source: points[i], target: points[i+1]});
            }
        })
        this.htmlTexts.forEach(text => {
            text.safeHtml = this.sanitizer.bypassSecurityTrustHtml(text.text);
        });

        this.groupByUser();
    
    }

    private groupByUser() {
        this.groupedTextsByUser = this.groupBy(this.htmlTexts, 'user');
    }

    private groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
           const key = obj[property];
           if (!acc[key]) {
              acc[key] = [];
           }
           // Add object to list for given key's value
           acc[key].push(obj);
           return acc;
        }, {});
    }

    private getVoices() {
        this.drawedPaths = [];
        
        let response = require('assets/dialogism/chains.json');
        response.data.forEach(voice => {
            
            //var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            var randomColor = require('randomcolor');
            var color = randomColor({luminosity: 'dark'});
            this.colors.push(color);

            this.voices.push({
                name: voice.name,
                id: voice.id,
                ngrams: voice.nGrams,
                selected: true,
                color: color
            });
        });
        
        this.voices.forEach(selectedVoice => {
            var points = [];
            var voiceColor = selectedVoice.color;//this.colors[selectedVoice.id-1];
            selectedVoice.ngrams.forEach(ngram => {
                var ngramId = selectedVoice.name+"-"+ngram.name+"-"+ngram.identifier;
                points.push(ngramId);
            });
            for (var i = 0; i < points.length-1; i++) {
                this.drawedPaths.push({color: voiceColor, id: 'voicePath-'+points[i]+points[i+1]});
            }
        })

        this.showVoices();
        var _this = this;
        setTimeout(function (){
            _this.connectAll();
        }, 5000);
        this.voicesLoaded = true;
    }

    private getTexts() {
        let response = require('assets/dialogism/sentences.json');
        response.data.forEach(text => {
            this.texts.push({
                id: text.id,
                text: text.text,
                safeHtml: this.sanitizer.bypassSecurityTrustHtml(text.text),
                user: text.user,
                date: text.date,
                chains: []
            });
        });
        this.htmlTexts = this.copyData(this.texts);
    }

    private copyData(source) {
        var destination = [];
        source.forEach(element => {
            destination.push( {
                id: element.id,
                text: element.text,
                safeHtml: this.sanitizer.bypassSecurityTrustHtml(element.text),
                user: element.user,
                date: element.date,
                chains: []
            });
        });

        return destination;
    }

    private connectAll() {
        // connect all the paths you want!
        this.paths.forEach(path => {
            //svg, path, start, end
            this.connectElements($("#svg-dialogism-chats"), $("#" + path.id), $("#"+path.source),   $("#"+path.target));
        })
    }

    //helper functions, it turned out chrome doesn't support Math.sgn() 
private signum(x) {
    return (x < 0) ? -1 : 1;
}
private absolute(x) {
    return (x < 0) ? -x : x;
}

private drawPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY + 3000);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < this.absolute(deltaX) ? deltaY : this.absolute(deltaX);
    //var delta  =  this.absolute(deltaY) < this.absolute(deltaX) ? this.absolute(deltaY) : this.absolute(deltaX);

    if (deltaY < 0) {
        delta = this.absolute(deltaY);
    }

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
    path.attr("d",  "M"  + startX + " " + startY +
                    " V" + (startY + delta) +
                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*this.signum(deltaX)) + " " + (startY + 2*delta) +
                    " H" + (endX - delta*this.signum(deltaX)) + 
                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
                    " V" + endY );

}

private drawArcPath(svg, path, startX, startY, endX, endY) {
    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
    var stroke =  parseFloat(path.attr("stroke-width"));
    // check if the svg is big enough to draw the path, if not, set heigh/width
    if (svg.attr("height") <  endY)                 svg.attr("height", endY + 150);
    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
    
    var deltaX = (endX - startX) * 0.15;
    var deltaY = (endY - startY) * 0.15;
    // for further calculations which ever is the shortest distance
    var delta  =  deltaY < this.absolute(deltaX) ? deltaY : this.absolute(deltaX);
    //var delta  =  this.absolute(deltaY) < this.absolute(deltaX) ? this.absolute(deltaY) : this.absolute(deltaX);

    if (deltaY < 0) {
        delta = this.absolute(deltaY);
    }

    // set sweep-flag (counter/clock-wise)
    // if start element is closer to the left edge,
    // draw the first arc counter-clockwise, and the second one clock-wise
    var arc1 = 0; var arc2 = 1;
    if (startX > endX) {
        arc1 = 1;
        arc2 = 0;
    }
    // draw tha pipe-like path
    // mid-point of line:
    var mpx = (startX + endX) * 0.5;
    var mpy = (startY + endY) * 0.5;

    // angle of perpendicular to line:
    var theta = Math.atan2(endY - startY, endX - startX) - Math.PI / 2;

    // distance of control point from mid-point of line:
    var offset = 30;

    // location of control point:
    var c1x = mpx + offset * Math.cos(theta);
    var c1y = mpy + offset * Math.sin(theta);
    var curve = "M" + startX + " " + startY + " Q " + c1x + " " + c1y + " " + endX + " " + endY;
    path.attr("d",  curve);
}


private connectElements(svg, path, startElem, endElem) {
    var svgContainer = $("#svgContainerDialogismChats");//document.getElementById('svgContainer');
    
    // if first element is lower than the second, swap!
    if(startElem.offset().top > endElem.offset().top){
        var temp = startElem;
        startElem = endElem;
        endElem = temp;
    }

    // get (top, left) corner coordinates of the svg container   
    var svgTop  = svgContainer.offset().top;
    var svgLeft = svgContainer.offset().left;

    // get (top, left) coordinates for the two elements
    var startCoord = startElem.offset();
    var endCoord   = endElem.offset();

    // calculate path's start (x,y)  coords
    // we want the x coordinate to visually result in the element's mid point
    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset

        // calculate path's end (x,y) coords
    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
    var endY = endCoord.top  - svgTop;

    // call function for drawing the path
    this.drawPath(svg, path, startX, startY, endX, endY);

}

    private getChainsForUserBySentence(sentences, id) {
        var selectedSentence = sentences.filter(function(sentence) {
            return sentence.id == id;
        });
        if(selectedSentence.length > 0) {
            var result = '';
            selectedSentence[0].chains.forEach(element => {
                result += element + '</br>';
            });
            return this.sanitizer.bypassSecurityTrustHtml(result);
        }

        return '';
    }

}