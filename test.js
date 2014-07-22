/*Author: Brian Harris Project: Pathology Information Analyst Submission Date: July 2014 Intent:This file is meant to provide javascript funuctions using jQuery and D3.js to transform 
sample data from https://apps.mathbiol.org/sdata/ to answer a series of programming tasks.
Begin test.js*/	



$(document).ready(function ()

 {

    var medalArray = [];
    var countryArray=[];
    var bronzeArray=[];
    var twentyArray = [];
    var twentyArrayRowNum = 0;
    var thisd3pie=0;
    
    window.addEventListener('resize', function(event)
    		{ 
    	        d3.select('#bargraph').remove();
    	        drawBarGraphV2(bronzeArray);
    	        thisd3pie.destroy();
    	    	//console.log('pie desstroyed');
    	        //thisd3pie.redraw();
    	    	//console.log('pie redrawn');
    	        drawd3pie(countryArray);
    	        d3.select('#header').remove();
    	        drawHeader();
    		
    		});
    

function bronzeMedalBySport(sport , numbronze)
{
 	this.sport = sport;
 	this.numbronze = numbronze;
}


function countryObject(country,goldmedals,silvermedals,bronzemedals,totalmedals)
    {
    	this.country = country;
    	this.goldmedals = goldmedals;
    	this.silverMedals = silvermedals;
    	this.bronzeMedals = bronzemedals;
    	this.totalmedals = totalmedals;
    }

function medalObject( athlete, age, country, year, sport, gold, silver , bronze )
 {  
    // Establishes a constructor method for our medalObject so we can use it for populating arrays
    this.athlete = athlete;  
    this.age = age;  
    this.year = year;  
	this.sport = sport;
	this.gold = gold;
	this.silver = silver;
	this.bronze = bronze;
	this.totalMedals = parseInt(gold) + parseInt(silver) + parseInt(bronze);
} 

function printCountryArray()
{
	for (var i = 0; i < countryArray.length; i++)
		{
		var thisCountry = countryArray[i];
        //  get a reference to the current country object
		var countryResString ="<li>"+" Country " + thisCountry.country  + " Gold: " + parseInt(thisCountry.goldmedals) + " Silver: " + parseInt(thisCountry.silvermedals) + " Bronze: " + parseInt(thisCountry.bronzemedals) + " Total: " + parseInt(thisCountry.totalmedals) + "</li>";
		 $( "#results" ).append( countryResString);
		}
}

function printBronzeArray()
{
	console.log('Starting to print bronze array , the size is ' + bronzeArray.length);
	for (var i = 0; i < bronzeArray.length; i++)
		{
		//console.log('Printing bronze medal : ' + i);
		var thisBronze = bronzeArray[i];
        //  get a reference to the current bronze medal object
		  var countryResString ="<li>"+ " Sport: " + thisBronze.sport + " Total: " + parseInt(thisBronze.numbronze) + "</li>";
		//var countryResString ="<li>"+" Athlete " + thisBronze.athlete  + " Age: " + parseInt(thisBronze.age) + " Country: " + thisBronze.country + " Sport: " + thisBronze.sport + " Total: " + parseInt(thisBronze.numbronze) + "</li>";
		 $( "#results" ).append( countryResString);
		}
	console.log('Finished printing bronze medals');
}

function printTwentyArray()
{
	console.log('Starting to print the twenty array , the size is ' + twentyArray.length);
	for (var i = 0; i < twentyArray.length; i++)
		{
		console.log('Printing twenty medal : ' + i);
		var thisTwenty = twentyArray[i];
        //  get a reference to the current bronze medal object
		  var twentyResString ="<li>"+ " Sport: " + thisTwenty.sport + " Gold: " + parseInt(thisTwenty.gold) + " Silver: " + parseInt(thisTwenty.silver) + " Bronze: " + parseInt(thisTwenty.bronze)+ " Total: " + parseInt(thisTwenty.total) + "</li>";
			 $( "#results" ).append( twentyResString);
		}
	console.log('Finished printing twenty medals');
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function reverseSortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
function tableOutput()
{
        var counter = 1;

	    var tbl_body = "";
	    $.each(twentyArray, function() {
	        var tbl_row = "";
	        $.each(this, function(k , v) {
	            tbl_row += "<td>"+v+"</td>";
	        })
	        tbl_body += "<tr>"+tbl_row+"</tr>";                 
	    })
	  
 $( "#q3data" ).append(tbl_body);
	
}

function countryTableOutput(inputArray)
{
         var tbl_body = "";
	    $.each(inputArray, function() {
	        var tbl_row = "";
	        $.each(this, function(k , v) {
	            tbl_row += "<td>"+v+"</td>";
	        })
	        tbl_body += "<tr>"+tbl_row+"</tr>";                 
	    })
	  
 $( "#countrydata" ).append(tbl_body);
	
}


function AddTwentyMedals(sport, goldmedals, silvermedals, bronzemedals,twentyMedalsTotal)
{
   	var totalThisPass = 0; 
	var tempSport =  sport;
	var tempgold = parseInt(goldmedals);
	var tempsilver = parseInt(silvermedals);
	var tempbronze = parseInt(bronzemedals);
	var twentymedalstemp = twentyMedalsTotal;
	// first determine if this is a sport we have already seen , if yes increment the total number of medals 
	var resultIndex = -1;
	
	 
	if (twentyArray.length > 0)
	{
		for ( var i in twentyArray) 
		{
			if (twentyArray[i].sport == sport)
			{
				resultIndex = i;
				break;
			}

			else {   	continue;		}
			

		} //end for loop
	} // end if statement
		
		else 
		{
			// we have not seen any sport before , so we need to create an entry to hold it
			var twentyMedalBySportObject = {"sport":tempSport,"gold":tempgold,"silver":tempsilver,"bronze":tempbronze,"total":twentymedalstemp};
			twentyArray.push(twentyMedalBySportObject);
			twentyArrayRowNum = twentyArrayRowNum+1;
			return;
		}

	if ( resultIndex > -1 )
	{
	    // the sport we are looking for is already in the array, update the total number of medals to reflect the new medals
		 	twentyArray[resultIndex].gold = parseInt(twentyArray[resultIndex].gold) + parseInt(tempgold);
			twentyArray[resultIndex].silver = parseInt(twentyArray[resultIndex].silver) + parseInt(tempsilver);
			twentyArray[resultIndex].bronze = parseInt(twentyArray[resultIndex].bronze) + parseInt(tempbronze);
			twentyArray[resultIndex].total = parseInt(twentyArray[resultIndex].total) + parseInt(twentymedalstemp);
	    return;
	}
	
	else
	{  //we have not seen this sport before , so we need to create an entry to hold it
		var twentyMedalBySportToAdd = {"sport":tempSport , "gold":tempgold, "silver":tempsilver, "bronze":tempbronze, "total":twentymedalstemp};
		twentyArray.push(twentyMedalBySportToAdd);
		return;
	   	
	} //end else statement 
	} //end function AddTwentyMedals



function addBronzeMedalsBySport(sport, numbronze)
{
   	var totalThisPass = 0; 
	var tempbronzemedals = parseInt(numbronze);
	var tempSport =  sport;
	// first determine if this is a sport we have already seen , if yes increment the total number of medals 
	// otherwise create a new bronzeMedalBySport object and append it to the list of bronze medals we know about
	var resultIndex = -1;
	var totalThisPass = numbronze;
	 
	if (bronzeArray.length > 0)
	{
		for ( var i in bronzeArray) 
		{
			if (bronzeArray[i].sport == sport)
			{
				resultIndex = i;
				break;
			}

			else {   	continue;		}
			

		} //end for loop
	} // end if statement
		
		else 
		{	// we have not seen any sport before , so we need to create an entry to hold it
			var bronzeMedalBySportObject = {"sport":tempSport,"numbronze":tempbronzemedals};
			bronzeArray.push(bronzeMedalBySportObject);
			return;
		}

	if ( resultIndex > -1 )
	{      // the sport we are looking for is already in the array, update the total number of medals to reflect the new medals
			bronzeArray[resultIndex].numbronze = parseInt(bronzeArray[resultIndex].numbronze) + parseInt(tempbronzemedals);
	    return;
	}
	
	else
	{  //we have not seen this sport before , so we need to create an entry to hold it
		var bronzeMedalBySportToAdd = {"sport":tempSport , "numbronze":tempbronzemedals};
		bronzeArray.push(bronzeMedalBySportToAdd);
		return;
	   	
	} //end else statement 
	} // end method addBronzeMedalsBySport


function addMedalsToCountry(country,gold,silver,bronze)
{
	var totalThisPass = 0; 
	var tempmedalcountry = country;
	var tempgoldmedals = parseInt(gold);
	var tempsilvermedals = parseInt(silver);
	var tempbronzemedals = parseInt(bronze);
	// first determine if this is a country we have already seen , if yes increment the total number of medals 
	// otherwise create a new county object and append it to the list of countries we know about
	var countryWeAreLookingFor = country;
	var resultIndex = -1;
	var totalThisPass = gold + silver + bronze;
	 
	if (countryArray.length > 0)
	{
		for ( var i in countryArray) 
		{
			resultIndex = countryArray[i].country.indexOf(countryWeAreLookingFor);
				if (countryArray[i].country == country) {
				resultIndex = i;
				break;
			}

			else 
			     {   
				//the country we are looking for was not found at this iteration so continue on
			       continue;
			     }
			

		} //end for loop
	} // end if statement
		
		else 
		{
			//we have not seen this country before , so we need to create an entry to hold it
			var countryObject1 = new countryObject(tempmedalcountry,tempgoldmedals,tempsilvermedals,tempbronzemedals,totalThisPass);
			var countryToAdd = {"country":country , "goldmedals":tempgoldmedals, "silvermedals": tempsilvermedals, "bronzemedals":tempbronzemedals, "totalmedals": totalThisPass};
			countryArray.push(countryToAdd);
			return;
						
			
			
		}
	

	if ( resultIndex > -1 )
	{
	    // the country we are looking for is already in the array, update the total number of medals to reflect the new medals
		countryArray[resultIndex].totalmedals = parseInt(countryArray[resultIndex].totalmedals + totalThisPass);
		countryArray[resultIndex].goldmedals = parseInt(countryArray[resultIndex].goldmedals + gold);
		countryArray[resultIndex].silvermedals = parseInt(countryArray[resultIndex].silvermedals + silver);
		countryArray[resultIndex].bronzemedals = parseInt(countryArray[resultIndex].bronzemedals + bronze);
		var totalGold = countryArray[resultIndex].goldmedals;
		var totalSilver = countryArray[resultIndex].silvermedals;
		var totalBronze = countryArray[resultIndex].bronzemedals;
		var totalForThisCountry = countryArray[resultIndex].totalmedals;
	    return;
		
	}
	  else
	{  //we have not seen this country before , so we need to create an entry to hold it
		totalThisPass = gold + silver + bronze;
		var countryToAdd = {"country":country , "goldmedals":tempgoldmedals, "silvermedals": tempsilvermedals, "bronzemedals":tempbronzemedals, "totalmedals": totalThisPass};
		countryArray.push(countryToAdd);
		return;
	   	
	} //end else statement 

	
}// end function addMedalsToCountry


function drawHeader()  {

	var frontRingArray = 
		[		
			{"name":"blueringfront", "color":"#2476ab","radius":"100","backcircle":"0"},
			{"name":"yellowringfront", "color":"#FF9900","radius":"100","backcircle":"0"},
			{"name":"blackringfront", "color":"#000000","radius":"100","backcircle":"0"},
			{"name":"greenringfront", "color":"#58891e","radius":"100","backcircle":"0"},
	    	{"name":"redringfront", "color":"#df0024","radius":"100","backcircle":"0"}
		];


	//  var width = parseInt(d3.select('#canvas2').style('width'), 10);
	//var w=600;
	  var w = parseInt(d3.select('#olg-graphic').style('width'), 10);
	  
	//var h=250;
	  var h = w /2;
	var timer=4500;

	var dsvg = d3.select("#olg-graphic")
	.append("svg")
	.attr("id", "header")
	.attr("width", w)
	.attr("height", h)
	;
	

	var radius = w /6; //radius of the rings
	
	//var xoffset = radius+(radius/2); //calculate x offset for each circle
	var xoffset = radius - radius /3;
	var frontcircles = dsvg.selectAll("circle")
			.data(frontRingArray)
			.enter()
			.append("circle")
				.transition().duration(1500)
    .attr('r', function(d){ return radius  * 2;})
			;
			
	frontcircles.attr("cx", function(d,i) {
				var offsetter = (i+1)*xoffset;
				return offsetter+((w/2)-(3*xoffset)); //Centers the circles to the SVG container
				})
			.attr("cy", function(d,i) {
				var hRadius = radius/2;
				return (i%2===0) ? h/2-hRadius : (h/2)+xoffset-hRadius; //Drop alternate circles lower
				})
			.attr("r", 55)
			.style("stroke", function(d) {
	            return d.color;
				})
			.style("fill", "none")
			.style("stroke-width", radius/10);
		};





function drawd3pie(inputArray)
{
// d3pie requires data in the form "label": "JavaScript", "value": 264131, "color": "#2484c1"
	var piewidth = parseInt(d3.select('#canvas').style('width'), 10) - 20;
	var padValue = 100;
	var canvasWidth = piewidth;
	var canvasHeight = piewidth;
	var pieOuterRadius = piewidth / 2 - padValue;
	var pieArray = [];
	var pieString = "[";
	var pieEnd = "]";
	// now use a for loop to populate pie.data.content with the vallues from our input array
	
	var thislabel =  inputArray[0].country;
	var thisvalue = inputArray[0].totalmedals;
	var tempdata = {"label": thislabel, "value": thisvalue};
	pieString = pieString + '{ "label": ' + thislabel + ' , "value" :' +  thisvalue + ' }';
	pieArray[0]= tempdata;
	
	
	
	for (var i = 1; i < inputArray.length; i++)
		{   
		var thislabel =  inputArray[i].country;
		var thisvalue = inputArray[i].totalmedals;
	//	console.log ('pushing ' + thislabel + ' + ' + thisvalue);
		var tempdata = {"label": thislabel, "value": thisvalue};
		pieString = pieString + ',{ "label": ' + thislabel + ' , "value" : ' + thisvalue + ' }';
		pieArray[i]= tempdata;
		//console.log ( 'The length of the pie array is now ' + pieArray.length);
		
		}
	
	pieString = pieString + pieEnd;
	//console.log(pieString);
	 
	
	
	var pie = new d3pie("#canvas", {
		"header": {
			"title": {
				
				"fontSize": 24,
				"font": "open sans"
			},
			"subtitle": {
				
				"color": "#999999",
				"font": "open sans"
			},
			"titleSubtitlePadding": 2
		},
		"footer": {
			"color": "#999999",
			"fontSize": 10,
			"font": "open sans",
			"location": "bottom-left"
		},
		"size": {"canvasWidth":canvasWidth,"canvasHeight":canvasHeight,"pieOuterRadius":pieOuterRadius},
		"data": {
			"sortOrder": "value-desc",
			"smallSegmentGrouping": {
				"enabled": true,
				"value": 22,
				"valueType": "value",
				"label": "Sum of Non-Listed Countries",
				"color":"#FF9900"
			},
			"content": pieArray	},
		"labels": {
			"outer": {
				"pieDistance": 15,
				"hideWhenLessThanPercentage": 1
			},
			"inner": {
				"format": "value",
				"hideWhenLessThanPercentage": 1
			},
			"mainLabel": {
				"fontSize": 11
			},
			"percentage": {
				"color": "#ffffff",
				"decimalPlaces": 0
			},
			"value": {
				"color": "#ffffff",
				"fontSize": 12
			},
			"lines": {
				"enabled": true
			}
		},
		"effects": {
			"pullOutSegmentOnClick": {
				"effect": "linear",
				"speed": 400,
				"size": 8
			}
		},
		"misc": {
			"colors": {
				"background": "#f8e494"
			},
			"gradient": {
				"enabled": true,
				"percentage": 100,
				"color": "#201212"
			}
		},
		"callbacks": {}
	});// end constructor


	
	console.log ('exit d3pie for loop');
	
	
	
	
	//pie.destroy();
	//console.log('pie desstroyed');
	//pie.redraw();
	//console.log('pie redrawn');
	thisd3pie = pie; // pass this back to the global variable so we can redraw on resize
 
	



}


   function drawBarGraphV2(inputArray)
   {
		//Width and height
		//var w = 800;
		
		
		  var margin = {top: 30, right: 20, bottom: 30, left: 20};
		  var width = parseInt(d3.select('#canvas2').style('width'), 10) - 20;
		  var width = width - margin.left - margin.right;
		  var height = 185; // placeholder
		var h = 400;
		var w =  width;
		var dataset = inputArray;
		var barPadding = 2;
		// establish scales for axises
		var x = d3.scale.ordinal().rangeRoundBands([0, w], .05);
		var y = d3.scale.linear().range([h, 0]);
		
		var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	    .tickFormat(function(d,i) { return dataset[i].country; });
	
		
		var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    .ticks(10);
		
		 x.domain(dataset.map(function(d, i) { return dataset[i].country; }));
		  y.domain([0, 100]);
		
					
		//Create SVG element
		var svg = d3.select("#canvas2")
					.append("svg")
					.attr("id", "bargraph")
					.attr("width", w)
					.attr("height", h);
		
		//select all of our rectangles and use the enter method to add them
		svg.selectAll("rect")
		   .data(d3.entries(dataset))
		   .enter()
		   .append("rect")
		   .attr("x", function(d, i) {
		   		return i * (w / inputArray.length);
		   })
		   .attr("y", function(d) {
		   		return h - (d.value.numbronze * 4);
		   })
		   .attr("width", w / inputArray.length - barPadding)
		   .attr("height", function(d) {
		   		return d.value.numbronze * 8;
		   })
		   .attr("fill", function(d) {
				return "rgb(" + (d.value.numbronze * 10) + ", 17, 34)";
		   })
		 ;
        // add text based labels to the graph
		svg.selectAll("text")
		   .data(d3.entries(dataset))
		   .enter()
		   .append("text")
		   .text(function(d) {
		   		return d.value.sport + " - " + d.value.numbronze;  })
		    .attr("x", function(d, i) {  		return h + (d.value.numbronze * 4.1)  ; })
		   	.attr("y", function(d , i) {	   			return  i * (w / inputArray.length);})
		   	 .attr("transform", function(d) {       return "translate(20,800)rotate(-90)" })
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "14px")
		   .attr("font-weight","bold")
		   .attr("fill", "black");
		
	//	add axises
		 svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + h + ")")
	      .call(xAxis)
	    .selectAll("text")
	      .style("text-anchor", "end")
	      .attr("dx", "-.8em")
	      .attr("dy", "-.55em")
	      .attr("transform", "rotate(-90)" );

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text(function(d,i) {  return dataset[i].country; });
		   
   }


function drawPieChartV2(inputArray)
{
    var canvasWidth = 550, //width
    canvasHeight = 550,   //height
    outerRadius = 200,   //radius
    color = d3.scale.category20(); //builtin range of colors

  var dataSet = inputArray;
  var labelLimit = 28; //this value will determine when we want to stop showing labels as they will overlap on our pie chart
  
  var vis = d3.select("#canvas")
    .append("svg:svg") //create the SVG element inside the <body>
      .data([dataSet]) //associate our data with the document
      .attr("width", canvasWidth) //set the width of the canvas
      .attr("height", canvasHeight) //set the height of the canvas
      .append("svg:g") //make a group to hold our pie chart
        .attr("transform", "translate(" + 1.25*outerRadius + "," + 1.25*outerRadius + ")") // relocate center of pie to 'outerRadius,outerRadius'

  // Create path elements for us using arc data...
  var arc = d3.svg.arc().outerRadius(outerRadius);
  var pie = d3.layout.pie() //this will create arc data for us given a list of values
    .value(function(d) { return d.totalmedals; }); 
    // Binding each value to the pie
    // Select all <g> elements with class slice (there aren't any yet)
  var arcs = vis.selectAll("g.slice")
    // Associate the generated pie data (an array of arcs, each having startAngle,
    // endAngle and value properties) 
    .data(pie)
    // This will create <g> elements for every "extra" data element that should be associated
    // with a selection. The result is creating a <g> for every object in the data array
    .enter()
    // Create a group to hold each slice (we will have a <path> and a <text>
    // element associated with each slice)
    .append("svg:g")
    .attr("class", "slice");    //allow us to style things in the slices (like text)

  arcs.append("svg:path")
    //set the color for each slice to be chosen from the color function defined above
    .attr("fill", function(d, i) { return color(i); } )
    //this creates the actual SVG path using the associated data (pie) with the arc drawing function
    .attr("d", arc);

  // Add a legendLabel to each arc slice...
  arcs.append("svg:text")
    .attr("transform", function(d) { //set the label's origin to the center of the arc
      //we have to make sure to set these before calling arc.centroid
      d.outerRadius = outerRadius + 50 ; // Set Outer Coordinate
      d.innerRadius = outerRadius + 45; // Set Inner Coordinate
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle") //center the text on it's origin
    .style("fill", "black")
    .style("font", "12px Arial")
    .text(function(d, i) { return dataSet[i].country;   })//get the label from our original data array
    .style("visibility", function(d,i) {  return (i >= labelLimit) ? "hidden" : "visible";   });
   
  // Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
  arcs.filter(function(d) { return d.endAngle - d.startAngle > .04; }).append("svg:text")
    .attr("dy", ".30em")
    .attr("text-anchor", "right")
    //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
    .attr("transform", function(d) { //set the label's origin to the center of the arc
      //we have to make sure to set these before calling arc.centroid
      d.outerRadius = outerRadius; // Set Outer Coordinate
      d.innerRadius = outerRadius/2; // Set Inner Coordinate
      return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
    })
    .style("fill", "White")
    .style("font", "bold 13px Arial")
    .text(function(d) { return d.data.totalmedals; });

  // Computes the angle of an arc, converting from radians to degrees.
  function angle(d) {
    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
    return a > 90 ? a - 180 : a;
  }}









    function getSampleData() {

        var q = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22https%3A%2F%2Fapps.mathbiol.org%2Fsdata%2F%22%20and%20xpath%3D%22%2F%2Fbody%22&diagnostics=true";

        console.log('ESCAPED URL thats used during the jQuery .ajax() and Yahoo Query Language method shown on the next line.');
        console.info(q);

        $.ajax({
            type: 'GET',
            url: q,
            dataType: 'xml',
            success: function (data, textStatus) {

                if(data) {

                                   
					var xmlText = new XMLSerializer().serializeToString(data);
                    var regExp = /\(([^)]+)\)/;
					var matches = regExp.exec(xmlText);
					var JSONPString = "";
					JSONPString = matches[1];
					// there are three entries in the input which do not have an age listed and instead have 
					// age:"" listed instead which then creates an error in the syntax of the JSON array string
					// so to sanitize that input condition I am going to replace any instances of age:""
					// with age:00 to maintain the consistent structure of the input. This will also serve as 
					// a flag for these records later
					JSONPString = JSONPString.split('age:\"\"').join('age:00');
					// Now prepare the JSON data to expected formatting
					JSONPString = JSONPString.split('athlete').join('\"athlete\"');
					JSONPString = JSONPString.split('age:').join('\"age\":\"');				
					JSONPString = JSONPString.split(',country').join('\",\"country\"');
					JSONPString = JSONPString.split('year:').join('\"year\":\"');
					JSONPString = JSONPString.split(',sport').join('\",\"sport\"');
					JSONPString = JSONPString.split('goldmedals:').join('\"goldmedals\":');
					JSONPString = JSONPString.split(',silvermedals:').join(',\"silvermedals\":');
					JSONPString = JSONPString.split(',bronzemedals:').join(',\"bronzemedals\":');
					var arrayAdd = '{\"medals\" :';
					var arrayEnd = '}';
                   var tempString = arrayAdd + JSONPString + arrayEnd;
				   JSONPString = tempString;
				   console.log('Attempting to parse JSON data from the string we harvested from the YQL XML object');
				   var theArray = [];
	        		 var jsonData = $.parseJSON(JSONPString);
				      console.log('Parse Complete');
 				      console.log('Begin iterating through harvested data');
                 for (var i = 0; i < jsonData.medals.length; i++)
			  {
                   var medal = jsonData.medals[i];
               	   var tempMedalObject = {"athlete":medal.athlete,"age":medal.age,"country":medal.country,"year":medal.year,"sport":medal.sport,"goldmedals":medal.gold,"silver":medal.silver,"bronze":medal.bronze};
				   theArray.push(tempMedalObject);
				   // for each pass of the array we need to populate our aray of country medals to serve
				   // as the foundation for the array used to create the SVG graphic for medals by country
				   addMedalsToCountry(medal.country, medal.goldmedals, medal.silvermedals,medal.bronzemedals);
				   
				   if (medal.bronzemedals > 0)
					   {  // capture this data to our array of bronze medals for question 2
					   	    addBronzeMedalsBySport(medal.sport, medal.bronzemedals)
					   }
				   
				   if ((medal.age >= 22) && (medal.age <= 29))
					   { //capture this data for the age ranges listed to track number of medals by sport
					   var twentyMedalsTotal = medal.goldmedals + medal.silvermedals + medal.bronzemedals;
					   AddTwentyMedals(medal.sport, medal.goldmedals, medal.silvermedals, medal.bronzemedals,twentyMedalsTotal);
					   }
				   
				   
                    }
				   
					  medalArray = theArray;
					  // sort the array of country medals according to biggest to smallest
                      countryArray = reverseSortByKey(countryArray, 'totalmedals');       countryTableOutput(countryArray);
                      // sort the bronze medal array by the total number of bronze medals
                      bronzeArray = reverseSortByKey(bronzeArray, 'numbronze');
                      //sort our twenty array for creating the html table
                      twentyArray = reverseSortByKey(twentyArray, 'total');
                      // create the pie chart and add it to our #canvas div
                  //    drawPieChartV2(countryArray);
                      //create the bar graph and add it to our #canvas2 div
                      drawBarGraphV2(bronzeArray);
                      //target the table body which already exists with our header row in the html and append the new rows
                      tableOutput();
                      drawHeader();
                      drawd3pie(countryArray);
               
                         return;
                      } 
				
				else {     console.log("JavaScript error has occured while retrieving sample data .");  return;   }                }
               });  
		
        
        
            } // end of get sample data function

   
                         getSampleData();
                
                

});// JavaScript Document