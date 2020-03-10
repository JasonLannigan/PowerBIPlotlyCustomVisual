/*
*  Power BI Visual CLI
*
*  Copyright (c) Microsoft Corporation
*  All rights reserved.
*  MIT License
*
*  Permission is hereby granted, free of charge, to any person obtaining a copy
*  of this software and associated documentation files (the ""Software""), to deal
*  in the Software without restriction, including without limitation the rights
*  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*  copies of the Software, and to permit persons to whom the Software is
*  furnished to do so, subject to the following conditions:
*
*  The above copyright notice and this permission notice shall be included in
*  all copies or substantial portions of the Software.
*
*  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
*  THE SOFTWARE.
*/
"use strict";

import "core-js/stable";
import "./../style/visual.less";

import powerbi from "powerbi-visuals-api";

import {IFilterTarget, IFilterColumnTarget, IBasicFilter, BasicFilter} from "powerbi-models";

import DataViewCategoricalColumn = powerbi.DataViewCategoricalColumn;
import DataView = powerbi.DataView;
import FilterAction = powerbi.FilterAction;

import IVisualHost = powerbi.extensibility.IVisualHost;


import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;

import { interactivityFilterService } from "powerbi-visuals-utils-interactivityutils";
import extractFilterColumnTarget = interactivityFilterService.extractFilterColumnTarget;


import { VisualSettings } from "./settings";
import * as Plotly from "plotly.js-dist";
/*
export interface IFilter {
    $schema: string;
    target: 'UK_DATE_TIME';
}


export interface IBasicFilter extends IFilter {
    operator: 'In';
    values: (string | number | boolean)[];
}
*/

export class Visual implements IVisual {
    private target: HTMLElement;
    private div: HTMLDivElement;
    private updateCount: number;
    private settings: VisualSettings;
	private textNode: Text;
	private host: powerbi.extensibility.visual.IVisualHost;
	private columnTarget: IFilterColumnTarget;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
		this.target = options.element;
		this.host = options.host;
        this.updateCount = 0;
        this.div = document.createElement("div");
        this.div.setAttribute("id", "myDiv");
        this.target.appendChild(this.div);
    }
	
	
    public update(options: VisualUpdateOptions) {
        this.settings = Visual.parseSettings(options && options.dataViews && options.dataViews[0]);
		console.log('Visual update', options);
		
		let dataview = options.dataViews[0];
		
		
		let xValues = [...(new Set(dataview.categorical.categories[0].values))]; //Use DataView Array the first position, and categories array first position.
        let yValues = dataview.categorical.values[0].values;
		let signalValues = dataview.categorical.categories[1].values;
		let processedReason = dataview.categorical.categories[2].values;
	
		/*
		let basicFilter = {
			target: {
				column: "UK_DATE_TIME"
			},
			operator: "In",
			values: xValues
		}
		*/

		
		let categories: DataViewCategoricalColumn = dataview.categorical.categories[0];
		this.columnTarget = extractFilterColumnTarget(dataview.categorical.categories[0]);
		

		/*
		let target: IFilterTarget = {
			table: categories.source.CALENDAR.substr(0, categories.source.CALENDAR.indexOf('.')), // Yourtable
			column: categories.source.UK_DATE_TIME  //Datetime
		};
		*/

		let values = x; //
	
		 
	var graphDiv: any = document.getElementById('myDiv');	
	var N = xValues.length
	var color1 = '#7b3294';
	var color1Light = '#c2a5cf';
	var colorX = '#ffa7b5';
	var colorY = '#fdae61';


		var x = xValues;
		var y = yValues;
			    



		var LineTrace = {
            x: 1,
            y: 2,
            mode: 'markers',
			marker: {size: 5},
            type: 'scatter',
			transforms: [{
				type: 'groupby',
				groups: signalValues
			}]
          };
		  
        var datag = [LineTrace];
		
		var selectorOptions = {
			buttons: [{
				step: 'month',
				stepmode: 'backward',
				count: 1,
				label: 'This Month'
			}, {
				step: 'day',
				stepmode: 'backward',
				count: 7,
				label: 'This Week'
			}, {
				step: 'day',
				stepmode: 'backward',
				count: 2,
				label: 'Yesterday'
			}, {
				step: 'all',
			}],
		};
		
		var layoutg = {
			autosize: true,
			margin: {
				l: 60,
				r: 50,
				b: 35,
				t: 5,
				pad: 4
				},
			xaxis: {
				rangeselector: selectorOptions,
				//rangeslider: {},
				//title: {
					//text: 'Date/Time',
					//},
			},
			yaxis: {
				title: {
					text: 'Flow (l/s)',
				},
				
			},
		};

	Plotly.newPlot('myDiv', datag, layoutg);
	
	Plotly.plot(graphDiv, [{
		type: 'scatter',
		mode: 'markers',
		x: x,
		y: y,
		
		hovertemplate: '<b>Time Stamp</b>: %{x}' +
						'<br><b>Flow</b>: %{y}<br>',
		showlegend: false,
		//name: signalValues,
		//marker: {color: color1, size: 10},
		transforms: [{
			type: 'groupby',
			groups: signalValues,
			name: 'Signal',
			},{ 
			type: 'groupby',
			groups: processedReason,
			styles: [
				{target: 'CONSTANT', value: {marker: {color: 'red', size: 7, line:{color: 'black', width: 0.9}}}},
				{target: 'MISSING', value: {marker: {color: 'rgb(255,20,147)', size: 7, line:{color: 'black', width: 0.9}}}},
				{target: 'OUTWITH ENVELOPE', value: {marker: {color: 'rgb(139,0,0)', size: 7, line:{color: 'black', width: 0.9}}}},
				{target: 'VALID', value: {marker: {color: 'rgb(78,288,78)', size: 5, line:{color: 'black', width: 0.9}}}},
				{target: 'ZERO', value: {marker: {color: 'red', size: 7, line:{color: 'black', width: 0.9}}}},
			],
			
			}
		]		
	},{
			
		x: x,
		y: y,
		name: 'Signal',
		type: 'scatter',
		mode: 'lines',
		showlegend: false,
		line: {width: 1.4, dash: 'dash', color: 'black'},
		transforms: [{
			type: 'groupby',
			groups: signalValues,
			name: 'Signal',
		}]
	  
  }]);

	graphDiv.on('plotly_selected', (eventData) => {
		var x = [];
		var y = [];
  
		var colors = [];
		console.log(colors);
		//for(var i = 0; i < N; i++) colors.push(color1Light);
  
		console.log(eventData.points)
  
		eventData.points.forEach(function(pt) {
			x.push(pt.x);
			y.push(pt.y);
			colors[pt.pointNumber] = color1;
		});
  
		//Plotly.restyle(graphDiv, {
			//x: [x, y],
			//xbins: {}
		//}, //[1, 2]
		//);
		console.log('After select'+x.length);
		console.log('After select'+y.length);
		console.log(x);
		console.log(y);
		console.log("This is the processed reason"+processedReason);
		
  
		Plotly.restyle(graphDiv, 'marker.color', [colors], [0]);
		

		this.filterValues(eventData.points);
		});
	}

		

	private filterValues(datapoints: any) {
			debugger;

			let selected = datapoints[0].data.selectedpoints.map(index => datapoints[0].data.x[index])


			console.log("selected dates are", selected);
			
			let filter: IBasicFilter = {
				$schema: "http://powerbi.com/product/schema#basic",
				...(new BasicFilter(
					this.columnTarget, 
					"In",
					selected
				))
			};


			this.host.applyJsonFilter(filter, "general", "filter", FilterAction.merge);
		}

	
	
    private static parseSettings(dataView: DataView): VisualSettings {
        return <VisualSettings>VisualSettings.parse(dataView);
    }

    /**
     * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
     * objects and properties you want to expose to the users in the property pane.
     *
     */
    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
        return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
    }
}

