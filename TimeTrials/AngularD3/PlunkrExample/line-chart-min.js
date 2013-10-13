/*! line-chart - v1.0.0-beta - 2013-10-11
* https://github.com/n3-charts/line-chart
* Copyright (c) 2013 n3-charts  Licensed ,  */
angular.module("n3-charts.linechart",["n3charts.utils"]).directive("linechart",["n3utils","$window","$timeout",function(a,b,c){var d=function(d,e,f){var g=a.getDefaultMargins();d.updateDimensions=function(b){var c=a.getPixelCssProp(e[0].parentElement,"padding-top"),d=a.getPixelCssProp(e[0].parentElement,"padding-bottom"),f=a.getPixelCssProp(e[0].parentElement,"padding-left"),g=a.getPixelCssProp(e[0].parentElement,"padding-right");b.width=(e[0].parentElement.offsetWidth||900)-f-g,b.height=(e[0].parentElement.offsetHeight||500)-c-d},d.update=function(){d.updateDimensions(g),d.redraw(g)},d.redraw=function(b){var c=a.sanitizeOptions(d.options),g=d.data,h=c.series,i=a.getDataPerSeries(g,c),j="thumbnail"===f.mode;a.clean(e[0]);var k=a.bootstrap(e[0],b),l=a.createAxes(k,b,c.axes).andAddThem();i.length>0&&a.setScalesDomain(l,g,c.series,k,c.axes),j?a.adjustMarginsForThumbnail(b,l):a.adjustMargins(b,c,g),a.createContent(k),a.createClippingPath(k,b),j||a.drawLegend(k,h,b);var m=c.lineMode;if(i.length>0){var n=a.getBestColumnWidth(b,i);a.drawArea(k,l,i,m).drawColumns(k,l,i,n).drawLines(k,l,i,m).drawDots(k,l,i)}a.addTooltips(k,b,c.axes)};var h,i=function(){c.cancel(h),h=c(d.update,1)};b.addEventListener("resize",i),d.$watch("data",d.update),d.$watch("options",d.update,!0)};return{replace:!0,restrict:"E",scope:{data:"=",options:"="},template:"<div></div>",link:d}}]),angular.module("n3charts.utils",[]).factory("n3utils",["$window",function(a){return{drawArea:function(a,b,c,d){var e={y:this.createLeftAreaDrawer(b,d),y2:this.createRightAreaDrawer(b,d)};return a.select(".content").selectAll(".areaGroup").data(c.filter(function(a){return"area"===a.type})).enter().append("g").style("fill",function(a){return a.color}).attr("class",function(a){return"areaGroup series_"+a.index}).append("path").attr("class","area").style("opacity","0.3").attr("d",function(a){return e[a.axis](a.values)}),this},updateAreas:function(a,b,c){var d={y:this.createLeftAreaDrawer(b,c),y2:this.createRightAreaDrawer(b,c)};return a.select(".content").selectAll(".areaGroup").selectAll("path").attr("d",function(a){return d[a.axis](a.values)}),this},createLeftAreaDrawer:function(a,b){return d3.svg.area().x(function(b){return a.xScale(b.x)}).y0(function(){return a.yScale(0)}).y1(function(b){return a.yScale(b.value)}).interpolate(b)},createRightAreaDrawer:function(a,b){return d3.svg.area().x(function(b){return a.xScale(b.x)}).y0(function(){return a.y2Scale(0)}).y1(function(b){return a.y2Scale(b.value)}).interpolate(b)},getBestColumnWidth:function(a,b){if(!b||0===b.length)return 10;var c=b[0].values.length+2,d=b.length,e=0,f=a.width-a.left-a.right;return parseInt(Math.max((f-(c-1)*e)/(c*d),5))},drawColumns:function(a,b,c,d){c=c.filter(function(a){return"column"===a.type});var e=d3.scale.ordinal().domain(c.map(function(a){return a.name})).rangeRoundBands([0,c.length*d],.05),f=this,g=a.select(".content").selectAll(".columnGroup").data(c).enter().append("g").attr("class",function(a){return"columnGroup series_"+a.index}).style("fill",function(a){return a.color}).style("fill-opacity",.8).attr("transform",function(a){return"translate("+(e(a.name)-c.length*d/2)+",0)"}).on("mouseover",function(c){var d=d3.select(d3.event.target);f.onMouseOver(a,{series:c,x:d.attr("x"),y:b[c.axis+"Scale"](d.datum().value),datum:d.datum()})}).on("mouseout",function(){d3.select(d3.event.target).attr("r",2),f.onMouseOut(a)});return g.selectAll("rect").data(function(a){return a.values}).enter().append("rect").style("fill-opacity",function(a){return 0==a.value?0:1}).attr({width:d,x:function(a){return b.xScale(a.x)},height:function(a){return 0===a.value?b[a.axis+"Scale"].range()[0]:Math.abs(b[a.axis+"Scale"](a.value)-b[a.axis+"Scale"](0))},y:function(a){return 0===a.value?0:b[a.axis+"Scale"](Math.max(0,a.value))}}),this},updateColumns:function(a,b,c){return a.select(".content").selectAll(".columnGroup").selectAll("rect").attr("width",c).attr("x",function(a){return b.xScale(a.x)}).attr("y",function(a){return b[a.axis+"Scale"](Math.max(0,a.value))}).attr("height",function(a){return Math.abs(b[a.axis+"Scale"](a.value)-b[a.axis+"Scale"](0))}),this},drawDots:function(a,b,c){var d=this;return a.select(".content").selectAll(".dotGroup").data(c.filter(function(a){return"line"===a.type||"area"===a.type})).enter().append("g").attr("class",function(a){return"dotGroup series_"+a.index}).attr("fill",function(a){return a.color}).on("mouseover",function(b){var c=d3.select(d3.event.target);c.attr("r",4),d.onMouseOver(a,{series:b,x:c.attr("cx"),y:c.attr("cy"),datum:c.datum()})}).on("mouseout",function(){d3.select(d3.event.target).attr("r",2),d.onMouseOut(a)}).selectAll(".dot").data(function(a){return a.values}).enter().append("circle").attr({"class":"dot",r:2,cx:function(a){return b.xScale(a.x)},cy:function(a){return b[a.axis+"Scale"](a.value)}}).style({stroke:"white","stroke-width":"2px"}),this},updateDots:function(a,b){return a.select(".content").selectAll(".dotGroup").selectAll(".dot").attr({cx:function(a){return b.xScale(a.x)},cy:function(a){return b[a.axis+"Scale"](a.value)}}),this},drawLegend:function(a,b,c){for(var d=[0],e=1;e<b.length;e++){var f=b[e-1].label||b[e-1].y;d.push(this.getTextWidth(f)+d[e-1]+30)}var g=this,h=a.append("g").attr("class","legend"),i=h.selectAll(".legendItem").data(b).enter().append("g").attr({"class":"legendItem",transform:function(a,b){return"translate("+d[b]+","+(c.height-35)+")"}});return i.append("circle").attr({fill:function(a){return a.color},r:4,stroke:function(a){return a.color},"stroke-width":"2px"}).on("click",function(b,c){d3.select(this).attr("fill-opacity",g.toggleSeries(a,c)?"1":"0.2")}),i.append("text").attr({"font-family":"monospace","font-size":10,transform:"translate(10, 3)","text-rendering":"geometric-precision"}).text(function(a){return a.label||a.y}),this},toggleSeries:function(a,b){var c=!1;return a.select(".content").selectAll(".series_"+b).attr("opacity",function(){return"0"===d3.select(this).attr("opacity")?(c=!0,"1"):(c=!1,"0")}),c},drawLines:function(a,b,c,d){var e={y:this.createLeftLineDrawer(b,d),y2:this.createRightLineDrawer(b,d)};return a.select(".content").selectAll(".lineGroup").data(c.filter(function(a){return"line"===a.type||"area"===a.type})).enter().append("g").style("stroke",function(a){return a.color}).attr("class",function(a){return"lineGroup series_"+a.index}).append("path").attr("class","line").attr("d",function(a){return e[a.axis](a.values)}).style({fill:"none","stroke-width":"1px"}),this},updateLines:function(a,b,c){var d={y:this.createLeftLineDrawer(b,c),y2:this.createRightLineDrawer(b,c)};return a.select(".content").selectAll(".lineGroup").selectAll("path").attr("d",function(a){return d[a.axis](a.values)}),this},createLeftLineDrawer:function(a,b){return d3.svg.line().x(function(b){return a.xScale(b.x)}).y(function(b){return a.yScale(b.value)}).interpolate(b)},createRightLineDrawer:function(a,b){return d3.svg.line().x(function(b){return a.xScale(b.x)}).y(function(b){return a.y2Scale(b.value)}).interpolate(b)},getPixelCssProp:function(b,c){var d=a.getComputedStyle(b,null).getPropertyValue(c);return+d.replace(/px$/,"")},getDefaultMargins:function(){return{top:20,right:50,bottom:60,left:50}},clean:function(a){d3.select(a).on("keydown",null).on("keyup",null).select("svg").remove()},bootstrap:function(a,b){d3.select(a).classed("chart",!0);var c=b.width,d=b.height,e=d3.select(a).append("svg").attr("width",c).attr("height",d).append("g").attr("transform","translate("+b.left+","+b.top+")");return e},createContent:function(a){a.append("g").attr("class","content").attr("clip-path","url(#clip)")},createClippingPath:function(a,b){a.append("svg:clipPath").attr("id","clip").append("svg:rect").attr("width",b.width-b.left-b.right).attr("height",b.height-b.top-b.bottom)},getDataPerSeries:function(a,b){var c=b.series,d=b.axes;if(!(c&&c.length&&a&&a.length))return[];var e=[];return c.forEach(function(c){var f={xFormatter:d.x.tooltipFormatter,index:e.length,name:c.y,values:[],color:c.color,axis:c.axis||"y",type:c.type||"line"};a.forEach(function(a){f.values.push({x:a[b.axes.x.key],value:a[c.y],axis:c.axis||"y"})}),e.push(f)}),e},resetMargins:function(a){var b=this.getDefaultMargins();a.left=b.left,a.right=b.right,a.top=b.top,a.bottom=b.bottom},adjustMargins:function(a,b,c){if(this.resetMargins(a),c&&0!==c.length){var d=b.series,e=d.filter(function(a){return"y2"!==a.axis}),f=this.getWidestOrdinate(c,e);a.left=this.getTextWidth(""+f)+20;var g=d.filter(function(a){return"y2"===a.axis});if(0!==g.length){var h=this.getWidestOrdinate(c,g);a.right=this.getTextWidth(""+h)+20}}},adjustMarginsForThumbnail:function(a){a.top=10,a.bottom=30},getTextWidth:function(a){return parseInt(5*a.length)+10},getWidestOrdinate:function(a,b){var c="";return a.forEach(function(a){b.forEach(function(b){(""+a[b.y]).length>(""+c).length&&(c=a[b.y])})}),c},getDefaultOptions:function(){return{tooltipMode:"default",lineMode:"linear",axes:{x:{type:"linear",key:"x"},y:{type:"linear"}},series:[]}},sanitizeOptions:function(a){return null===a||void 0===a?this.getDefaultOptions():(a.series=this.sanitizeSeriesOptions(a.series),a.axes=this.sanitizeAxes(a.axes,this.haveSecondYAxis(a.series)),a.lineMode=a.lineMode?a.lineMode:"linear",a.tooltipMode=a.tooltipMode?a.tooltipMode:"default",a)},sanitizeSeriesOptions:function(a){if(!a)return[];var b=d3.scale.category10();return a.forEach(function(a,c){a.color=a.color?a.color:b(c)}),a},sanitizeAxes:function(a,b){return a||(a={}),a.x=this.sanitizeAxisOptions(a.x),a.x.key||(a.x.key="x"),a.y=this.sanitizeAxisOptions(a.y),b&&(a.y2=this.sanitizeAxisOptions(a.y2)),a},sanitizeAxisOptions:function(a){return a?(a.type||(a.type="linear"),a):{type:"linear"}},createAxes:function(a,b,c){var d=void 0!==c.y2,e=b.width,f=b.height;e=e-b.left-b.right,f=f-b.top-b.bottom;var g="date"===c.x.type?d3.time.scale().rangeRound([0,e]):d3.scale.linear().rangeRound([0,e]),h="log"===c.y.type?d3.scale.log().clamp(!0).rangeRound([f,0]):d3.scale.linear().rangeRound([f,0]),i=d&&"log"===c.y2.type?d3.scale.log().clamp(!0).rangeRound([f,0]):d3.scale.linear().rangeRound([f,0]),j=d3.svg.axis().scale(g).orient("bottom").tickFormat(c.x.labelFunction),k=d3.svg.axis().scale(h).orient("left"),l=d3.svg.axis().scale(i).orient("right"),m=function(a){a.style({font:"10px monospace","shape-rendering":"crispEdges"}),a.selectAll("path").style({fill:"none",stroke:"#000"})};return{xScale:g,yScale:h,y2Scale:i,xAxis:j,yAxis:k,y2Axis:l,andAddThem:function(){return m(a.append("g").attr("class","x axis").attr("transform","translate(0,"+f+")").call(j)),m(a.append("g").attr("class","y axis").call(k)),d&&m(a.append("g").attr("class","y2 axis").attr("transform","translate("+e+", 0)").call(l)),{xScale:g,yScale:h,y2Scale:i,xAxis:j,yAxis:k,y2Axis:l}}}},setScalesDomain:function(a,b,c,d,e){this.setXScale(a.xScale,b,c,e);var f=c.filter(function(a){return"y2"!==a.axis}),g=c.filter(function(a){return"y2"===a.axis}),h=this.yExtent(f,b);"log"===e.y.type&&(h[0]=0===h[0]?.001:h[0]);var i=this.yExtent(g,b);e.y2&&"log"===e.y2.type&&(i[0]=0===i[0]?.001:i[0]),a.yScale.domain(h).nice(),a.y2Scale.domain(i).nice(),d.selectAll(".x.axis").call(a.xAxis),d.selectAll(".y.axis").call(a.yAxis),d.selectAll(".y2.axis").call(a.y2Axis)},yExtent:function(a,b){var c=Number.POSITIVE_INFINITY,d=Number.NEGATIVE_INFINITY;return a.forEach(function(a){c=Math.min(c,d3.min(b,function(b){return b[a.y]})),d=Math.max(d,d3.max(b,function(b){return b[a.y]}))}),[c,d]},setXScale:function(a,b,c,d){a.domain(d3.extent(b,function(a){return a[d.x.key]})),c.filter(function(a){return"column"===a.type}).length&&this.adjustXScaleForColumns(a,b)},adjustXScaleForColumns:function(a,b){var c=this.getAverageStep(b,"x"),d=a.domain();angular.isDate(d[0])?a.domain([new Date(d[0].getTime()-c),new Date(d[1].getTime()+c)]):a.domain([d[0]-c,d[1]+c])},getAverageStep:function(a,b){for(var c=0,d=a.length-1,e=0;d>e;e++)c+=a[e+1][b]-a[e][b];return c/d},haveSecondYAxis:function(a){var b=!1;return angular.forEach(a,function(a){b=b||"y2"===a.axis}),b},addTooltips:function(a,b,c){var d=b.width,e=b.height;d=d-b.left-b.right,e=e-b.top-b.bottom;var f=24,g=18,h=a.append("g").attr({id:"xTooltip",opacity:0});h.append("path").attr({transform:"translate(0,"+(e+1)+")"}),h.append("text").style({"text-anchor":"middle"}).attr({width:f,height:g,"font-family":"monospace","font-size":10,transform:"translate(0,"+(e+19)+")",fill:"white","text-rendering":"geometric-precision"});var i=a.append("g").attr({id:"yTooltip",opacity:0});if(i.append("path"),i.append("text").attr({width:g,height:f,"font-family":"monospace","font-size":10,fill:"white","text-rendering":"geometric-precision"}),void 0!==c.y2){var j=a.append("g").attr({id:"y2Tooltip",opacity:0,transform:"translate("+d+",0)"});j.append("path"),j.append("text").attr({width:g,height:f,"font-family":"monospace","font-size":10,fill:"white","text-rendering":"geometric-precision"})}},onMouseOver:function(a,b){this.updateXTooltip(a,b),"y2"===b.series.axis?this.updateY2Tooltip(a,b):this.updateYTooltip(a,b)},onMouseOut:function(a){this.hideTooltips(a)},updateXTooltip:function(a,b){var c,d=a.select("#xTooltip").transition().attr({opacity:1,transform:"translate("+b.x+",0)"});c=b.series.xFormatter?""+b.series.xFormatter(b.datum.x):""+b.datum.x,d.select("text").text(c),d.select("path").attr("fill",b.series.color).attr("d",this.getXTooltipPath(c))},getXTooltipPath:function(a){var b=this.getTextWidth(a),c=18,d=5;return"m-"+b/2+" "+d+" "+"l0 "+c+" "+"l"+b+" 0 "+"l0 "+"-"+c+"l-"+(b/2-d)+" 0 "+"l-"+d+" -"+c/4+" "+"l-"+d+" "+c/4+" "+"l-"+(b/2-d)+" 0z"},updateYTooltip:function(a,b){var c=a.select("#yTooltip").transition().attr({opacity:1,transform:"translate(0, "+b.y+")"}),d=""+b.datum.value,e=this.getTextWidth(d),f=c.select("text").text(d);f.attr({transform:"translate("+(-e-2)+",3)",width:e}),c.select("path").attr("fill",b.series.color).attr("d",this.getYTooltipPath(e))},getYTooltipPath:function(a){var b=18,c=5;return"m0 0l-"+c+" -"+c+" "+"l0 -"+(b/2-c)+" "+"l-"+a+" 0 "+"l0 "+b+" "+"l"+a+" 0 "+"l0 -"+(b/2-c)+"l-"+c+" "+c+"z"},updateY2Tooltip:function(a,b){var c=a.select("#y2Tooltip").transition().attr({opacity:1}),d=""+b.datum.value,e=this.getTextWidth(d),f=c.select("text").text(d);f.attr({transform:"translate(7, "+(parseFloat(b.y)+3)+")",w:e}),c.select("path").attr({fill:b.series.color,d:this.getY2TooltipPath(e),transform:"translate(0, "+b.y+")"})},getY2TooltipPath:function(a){var b=18,c=5;return"m0 0l"+c+" "+c+" "+"l0 "+(b/2-c)+" "+"l"+a+" 0 "+"l0 -"+b+" "+"l-"+a+" 0 "+"l0 "+(b/2-c)+" "+"l-"+c+" "+c+"z"},hideTooltips:function(a){a.select("#xTooltip").transition().attr({opacity:0}),a.select("#yTooltip").transition().attr({opacity:0}),a.select("#y2Tooltip").transition().attr({opacity:0})},activateZoom:function(a,b,c,d,e){var f=c.y2Scale,g=f?f.copy():void 0,h=this,i=function(){var a=j;f&&(g.domain(f.range().map(function(b){return(b-a.translate()[1])/a.scale()}).map(f.invert)),b.select(".y2.axis").call(c.y2Axis.scale(g))),b.select(".x.axis").call(c.xAxis),b.select(".y.axis").call(c.yAxis),h.updateAreas(b,{xScale:a.x(),yScale:a.y(),y2Scale:g}).updateColumns(b,{xScale:a.x(),yScale:a.y(),y2Scale:g},a.scale()*e).updateLines(b,{xScale:a.x(),yScale:a.y(),y2Scale:g}).updateDots(b,{xScale:a.x(),yScale:a.y(),y2Scale:g})},j=d3.behavior.zoom().x(c.xScale).y(c.yScale).on("zoom",i);d3.select(a).attr("tabindex","0").style("outline","0px solid transparent").on("keydown",function(){d3.event.shiftKey&&b.append("svg:rect").attr({id:"zoomPane","class":"pane",width:d.width,height:d.height}).call(j)}).on("keyup",function(){b.selectAll("#zoomPane").remove()})}}}]);
