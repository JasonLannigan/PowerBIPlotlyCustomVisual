# PowerBIPlotlyCustomVisual
A work in progress - PowerBI Plotly.js Custom Visual
This is really just an attempt to try to get a plotly.js visual working in PowerBI.

The heatmap folder, is alomost identical to the code provided here.https://github.com/mohaali/PowerBIExamples/tree/master/plotly
The code compiles but currently will only display a blank tile when imported.

The ScatterPlot.pbiviz, is a working plotly (I assume js) working visual. It is from the same GitHub as above.

The other files show an attempt to try to migrate heatmap per this page. https://microsoft.github.io/PowerBI-visuals/docs/how-to-guide/migrating-to-powerbi-visuals-tools-3-0/
I was not able to upload the whole filesystem due to size of file however all of the code can be found here.
To replicate what I have already, simply create a new custom visual, using pbiviz command. 

I cannot compile this attempt to update. 2 errors - 

Cannot find name - DataViewTableRow
Cannot find name - DataViewMetadataColumn

It may be that a package is missing in the src/visual.ts file and this is why these errors appear but this is just a guess. My reasoning fr this is because the error does not occur in the original heatmap visual, perhaps the removal of the module to the addition of imports is the issue (in the visual.ts file).

